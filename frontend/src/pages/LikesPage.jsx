import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "../utils/functions";

function LikesPage() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
		const getLikes = async () => {
			try {
				const res = await fetch("/api/users/likes", { credentials: "include" });
				const data = await res.json();
				if (data.error) throw new Error(data.error);

				setLikes(data.likedBy);
			} catch (error) {
				toast.error(error.message);
			}
		};
		getLikes();
	}, []);

  return (
		<div>
			<table>
				<thead>
					<tr>
						<th scope='col'>
							<div>No</div>
						</th>
						<th scope='col'>
							Username
						</th>
						<th scope='col'>
							Date
						</th>
						<th scope='col'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{likes.map((user, idx) => (
						<tr key={user.username}>
							<td>
								<div>
									<span>{idx + 1}</span>
								</div>
							</td>
							<th scope='row'>
								<img src={user.avatarUrl} alt='User Avatar' />
								<div>
									<div>{user.username}</div>
								</div>
							</th>
							<td>{formatDate(user.likedDate)}</td>
							<td>
								<div>
									Liked your profile
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default LikesPage