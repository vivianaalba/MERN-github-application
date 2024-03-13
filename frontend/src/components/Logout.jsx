import React from 'react';
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Logout() {
    const { authUser, setAuthUser } = useAuthContext();

    const handleLogout = async () => {
		try {
			const res = await fetch("/api/auth/logout", { credentials: "include" });
			const data = await res.json();
			console.log(data);
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		}
	};

    return (
    	<>
			<div onClick={handleLogout}>
				Logout
			</div>
		</>
  )
}