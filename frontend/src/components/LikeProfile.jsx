import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function LikeProfile({userProfile}) {
    const {authUser} = useAuthContext();
    const isOwnProfile = authUser?.username = userProfile.login;
    
    const handleLikeProfile = async () => {
        try {
            const res = await fetch(`/api/users/like/${userProfile.login}`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    if(!authUser || isOwnProfile) return null;

    return (
        <button onClick={handleLikeProfile}>
            Like Profile
        </button>
    )
}

export default LikeProfile