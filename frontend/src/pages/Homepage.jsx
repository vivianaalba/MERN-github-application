import React from 'react';
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

function Homepage() {
  const [userProfile, setUserProfile] = useState(null); // user is null until sought for
	const [repos, setRepos] = useState([]); // repos is an array so that we can loop over and render
	const [loading, setLoading] = useState(false); // loading is false initially, until a new user is requested
	const [sortType, setSortType] = useState("recent"); // this is the first category the repos will sorted into
  
  const getUserProfileAndRepos = useCallback(
    async (username = "vivianaalba") => {
		  setLoading(true);
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const { repos, userProfile } = await res.json();

        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first

        setRepos(repos);
        setUserProfile(userProfile);

        return { userProfile, repos };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
	  }, 
  []);

  useEffect(() => {
		getUserProfileAndRepos();
	}, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {
		e.preventDefault();

		setLoading(true);
		setRepos([]);
		setUserProfile(null);

		const { userProfile, repos } = await getUserProfileAndRepos(username);

		setUserProfile(userProfile);
		setRepos(repos);
		setLoading(false);
		setSortType("recent");
	};

  const onSort = (sortType) => {
		if (sortType === "recent") {
			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
		} else if (sortType === "stars") {
			repos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending, most stars first
		} else if (sortType === "forks") {
			repos.sort((a, b) => b.forks_count - a.forks_count); //descending, most forks first
		}
		setSortType(sortType);
		setRepos([...repos]);
	};

  return (
		<div>
			<Search onSearch={onSearch} />
			{repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
			<div>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
				{!loading && <Repos repos={repos} />}
				{loading && <Spinner />}
			</div>
		</div>
	);
}

export default Homepage;