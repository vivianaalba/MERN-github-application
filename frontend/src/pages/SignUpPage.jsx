import { Link } from "react-router-dom";
import { handleLoginWithGithub } from "../lib/function";

function SignUpPage() {
	return (
		<div>
			<div>
				<div>
					<h1>Create Account</h1>

					<button
						type='button'
						onClick={handleLoginWithGithub}
					>
						Sign up with Github
					</button>

					<p>
						By signing up, you will unlock all the features of the app.
					</p>
					<p>
						Already have an account?{" "}
						<Link to='/login'>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignUpPage;