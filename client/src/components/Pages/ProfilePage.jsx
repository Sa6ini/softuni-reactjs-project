import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data
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

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        setUploading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/upload-profile-picture', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUser(prevUser => ({
                ...prevUser,
                profilePicture: response.data.filePath
            }));
            alert('Profile picture updated successfully');
        } catch (err) {
            console.error('Error uploading file:', err);
            alert('Error uploading profile picture');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {user ? (
                <div className="profile-info">
                    <div className="profile-picture">
                        <img
                            src={user.profilePicture ? `http://localhost:3000/${user.profilePicture}` : 'default-profile.png'}
                            alt="Profile"
                            width="150"
                            height="150"
                        />
                    </div>
                    <p><strong>Name:</strong> {user.fname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <div className="upload-section">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                        <button onClick={handleUpload} disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Upload Profile Picture'}
                        </button>
                    </div>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default Profile;
