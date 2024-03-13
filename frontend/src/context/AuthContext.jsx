import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

// Provider is required for context to effectively become available across components, which in itself may resemble a component
export const AuthContextProvider = ({ children }) => {
    // handling auth -- two pieces of state: 
    // authUser, which will store who the authenticated user is 
    // loading, which will be the state determining when the user has been authenticated or not
    const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

    // check if user is logged in, useEffect to prevent re-redindering or additional fetch requests / queries
    useEffect(() => {
		const checkUserLoggedIn = async () => {
			setLoading(true);
            // if successful, the data received will be stored and our authorized user is stored, to then be used in our AuthContext
			try {
				const res = await fetch("/api/auth/check", { credentials: "include" });
				const data = await res.json();
				setAuthUser(data.user); // null or authenticated user object
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
        // function will be called, and because we’re using an empty dependency array, useEffect will only run once
		checkUserLoggedIn();
	}, []);

    // delivers AuthContext to our main.jsx
    // determines the values our AuthContext.Provider will pass down to its child components
    return <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>{children}</AuthContext.Provider>;
};