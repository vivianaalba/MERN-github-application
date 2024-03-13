import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LikesPage from './pages/LikesPage';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser, loading } = useAuthContext();
  if (loading) return null;

  return (
    <div>
      <Sidebar />

      <div>
        <Routes>
          <Route 
            path='/' 
            element={<Homepage />} 
          />

          <Route 
            path='/login' 
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} 
          />

          <Route 
            path='/signup' 
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} 
          />

          <Route 
            path='/likes' 
            element={authUser ? <LikesPage /> : <Navigate to={"/login"} />} 
          />
          
        </Routes>

        <Toaster />

      </div>
    </div>
  )
}

export default App
