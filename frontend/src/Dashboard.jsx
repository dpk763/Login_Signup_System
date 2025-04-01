import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Fetch user data after the component mounts
    useEffect(() => {
        const token = localStorage.getItem("token");

        // If no token is found, redirect to login page
        if (!token) {
            navigate("/login");
            return;
        }

        // Fetch user information from backend
        fetch("http://localhost:5000/api/auth/me", {
            headers: { "Authorization": `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => {
            // If there's an error, clear the token and redirect to login
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem("token");
        // Redirect to the login page
        navigate("/login");
    };

    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome, {user.username}!</h1>
                    <p>Email: {user.email}</p>
                    {/* Logout Button */}
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
