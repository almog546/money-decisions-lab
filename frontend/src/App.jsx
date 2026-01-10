import './App.css';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home.jsx';
import Navbar from './Navbar/Navbar.jsx';
import Insights from './Insights/Insights.jsx';
import History from './History/History.jsx';
import Newbuy from './Newbuy/Newbuy.jsx';
import Logout from './Logout/Logout.jsx';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';

function App() {
    const [user, setUser] = useState(null);
    const [logout, setLogout] = useState(false);
    const location = useLocation();
    async function onLogout() {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );
            if (res.ok) {
                setUser(null);
                setLogout(true);
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/me`,
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                );
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            }
        }
        fetchUser();
    }, [location]);

    return (
        <>
            {user && <Navbar user={user} onLogout={onLogout} />}
            <Routes>
                <Route path="/login" element={<Login user={user} />} />
                <Route path="/signup" element={<Signup user={user} />} />

                <Route element={<ProtectedRoute user={user} />}>
                    <Route path="/" element={<Home user={user} />} />
                    <Route
                        path="/insights"
                        element={<Insights user={user} />}
                    />
                    <Route path="/history" element={<History user={user} />} />
                    <Route path="/newbuy" element={<Newbuy user={user} />} />
                    <Route path="/logout" element={<Logout user={user} />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
