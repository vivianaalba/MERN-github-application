import React from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Logout from "./Logout";

export default function Sidebar() {
  const { authUser } = useAuthContext();

  return (
    <aside
    className='flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8
    overflow-y-auto border-r bg-glass'
    >
        <nav className='h-full flex flex-col gap-3'>
            <Link to='/' className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'>
                    Github
            </Link>

            <Link to='/'
            className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'>
                    Home
            </Link>

            {authUser && (
                <Link to='/likes'
                className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'>
                    Likes
                </Link>
            )}
            
            {!authUser && (
                <Link to='/login'
                className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'>
                    Login
                </Link>
            )}

            {!authUser && (
                <Link to='/signup'
                className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'>
                    Signup
                </Link>
            )}

            {authUser && (
                <div className='flex flex-col gap-2 mt-auto'>
                    <Logout />
                </div>
            )}
        </nav>
    </aside>
  )
}
