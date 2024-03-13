import React from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Logout from "./Logout";

export default function Sidebar() {
  const { authUser } = useAuthContext();

  return (
    <aside>
        <nav>
            <Link to='/'>
                    Github
            </Link>

            <Link to='/'>
                    Home
            </Link>

            {authUser && (
                <Link to='/likes'>
                    Likes
                </Link>
            )}
            
            {!authUser && (
                <Link to='/login'>
                    Login
                </Link>
            )}

            {!authUser && (
                <Link to='/signup'>
                    Signup
                </Link>
            )}

            {authUser && (
                <div>
                    <Logout />
                </div>
            )}
        </nav>
    </aside>
  )
}
