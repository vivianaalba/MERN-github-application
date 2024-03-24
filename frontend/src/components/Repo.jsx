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
<li className='mb-10 ms-7'>
        <span>
            Repositories
        </span>
        <div className='flex gap-2 items-center flex-wrap'>
            <a
                href={repo.html_url}
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-2 text-lg font-semibold'
            >
                {repo.name}
            </a>
            <span className='bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5
        py-0.5 rounded-full flex items-center gap-1'>
                Stars: {repo.stargazers_count}
            </span>
            <span className='bg-purple-100 text-purple-800 text-xs font-medium
         px-2.5 py-0.5 rounded-full flex items-center gap-1'>
                Forks: {repo.forks_count}
            </span>
            <span
                onClick={() => handleCloneClick(repo)}
                className='cursor-pointer bg-green-100 text-green-800 text-xs
        font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1'>
                Click to Clone
            </span>
        </div>
        <time className='block my-1 text-xs font-normal leading-none
     text-gray-400'>
            Released on {formattedDate}
        </time>
        <p className='mb-4 text-base font-normal text-gray-500'>
            {repo.description ? repo.description.slice(0, 500) : "No description provided"}
        </p>
        {PROGRAMMING_LANGUAGES[repo.language] ? (
            <img src={PROGRAMMING_LANGUAGES[repo.language]} alt='Programming language icon'/>
        ) : null}
    </li>
    )
}

export default Repo;