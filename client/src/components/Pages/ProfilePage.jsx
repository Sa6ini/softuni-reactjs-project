import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Hero from '../BodyParts/Hero';
import Profile from '../BodyParts/Profile';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user', {
                    withCredentials: true
                });
                setUser(response.data.user);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching user data');
                setLoading(false);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchUser();
    }, [navigate]);

    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="profile-container">
            <Hero name="Profile" />

            <Profile
                name={user.fname}
                username={user.username}
                email={user.email}
                role={user.role}
                bio={user.bio}
                image={user.profilePicture ? `http://localhost:3000${user.profilePicture}` : './img/default-profile.png'}
                setUser={setUser}
            />

            
        </div>
    );
};

export default ProfilePage;
