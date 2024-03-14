import { formatDate } from "../utils/functions";
import { PROGRAMMING_LANGUAGES } from "../utils/constants";
import toast from "react-hot-toast";

function Repo({repo}) {
    const formattedDate = formatDate(repo.created_at);

    const handleCloneClick = async (repo) => {
		try {
			await navigator.clipboard.writeText(repo.clone_url);
			toast.success("Repo URL cloned to clipboard");
		} catch (error) {
			toast.error("Clipboard write failed. ");
		}
	};

    return (
    <li>
        <span>
            Branch Icon
        </span>
        <div>
            <a
                href={repo.html_url}
                target='_blank'
                rel='noreferrer'
            >
                {repo.name}
            </a>
            <span>
                Stars: {repo.stargazers_count}
            </span>
            <span>
                Forks: {repo.forks_count}
            </span>
            <span
                onClick={() => handleCloneClick(repo)}>
                Click to Clone
            </span>
        </div>
        <time>
            Released on {formattedDate}
        </time>
        <p>
            {repo.description ? repo.description.slice(0, 500) : "No description provided"}
        </p>
        {PROGRAMMING_LANGUAGES[repo.language] ? (
            <img src={PROGRAMMING_LANGUAGES[repo.language]} alt='Programming language icon'/>
        ) : null}
    </li>
    )
}

export default Repo;