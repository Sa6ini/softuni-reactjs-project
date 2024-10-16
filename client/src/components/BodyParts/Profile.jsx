import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Profile(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newBio, setNewBio] = useState(props.bio);
    const [isEditingUsername, setIsEditingUsername] = useState(false); // State for editing username
    const [newUsername, setNewUsername] = useState(props.username); // State for new username
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
            navigate('/login');
        } catch (err) {
            console.error('Error logging out:', err);
            alert('Error logging out');
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        setUploading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/uploads/profile-picture', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            props.setUser((prevUser) => ({
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

    const handleEditBio = () => {
        setIsEditing(true);
    };

    const handleSaveBio = async () => {
        try {
            const response = await axios.put('http://localhost:3000/api/users/me/bio', { bio: newBio }, { withCredentials: true });
            console.log(response.data);
            props.setUser((prevUser) => ({
                ...prevUser,
                bio: newBio
            }));
            alert('Bio updated successfully');
            setIsEditing(false);
        } catch (err) {
            console.error('Error saving bio:', err);
            alert('Error saving bio');
        }
    };

    const handleEditUsername = () => {
        setIsEditingUsername(true);
    };

    const handleSaveUsername = async () => {
        try {
            const response = await axios.put('http://localhost:3000/api/users/me/username', { username: newUsername }, { withCredentials: true });
            console.log(response.data);
            props.setUser((prevUser) => ({
                ...prevUser,
                username: newUsername
            }));
            alert('Username updated successfully');
            setIsEditingUsername(false);
        } catch (err) {
            console.error('Error saving username:', err);
            alert('Error saving username');
        }
    };
    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            alert('New password and confirmation do not match');
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:3000/api/users/me/password',
                { oldPassword, newPassword },
                { withCredentials: true }
            );
            console.log(response.data);
            alert('Password changed successfully');
            setShowChangePassword(false);
        } catch (err) {
            console.error('Error changing password:', err);
            alert('Error changing password');
        }
    };

    const handleOpenChangePassword = () => {
        setShowChangePassword(true);
    };

    const handleCloseChangePassword = () => {
        setShowChangePassword(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <>
            <div className="container-fluid p-5">
                <div className="row gx-5">
                    <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: 500 }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute w-100 h-80 rounded"
                                src={props.image}
                                style={{ objectFit: "cover" }}
                            />
                            <div className="upload-section">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    disabled={uploading}
                                    style={{ display: 'none' }}
                                    id="file-input"
                                />
                                <ul className="choose-file nav nav-pills justify-content-between mb-3">
                                    <li>
                                        <label
                                            htmlFor="file-input"
                                            className="mb-4 bg-dark nav-link text-uppercase text-center w-100 active rounded"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Choose Image
                                        </label>
                                    </li>
                                    <li>
                                        <button
                                            className="mb-4 nav-link text-uppercase text-center w-100 active rounded"
                                            onClick={handleUpload}
                                            disabled={uploading}
                                        >
                                            {uploading ? 'Uploading...' : 'Upload Profile Picture'}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="mb-4">
                            <h5 className="text-primary text-uppercase">Welcome</h5>
                            <h1 className="display-3 text-uppercase mb-0">{props.name}</h1>
                        </div>
                        <ul className="nav nav-pills justify-content-between">
                            <li>
                                <h4 className="text-body mb-4">
                                    <b>Username:</b> {isEditingUsername ? (
                                        <input
                                            type="text"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="form-control mb-3"
                                        />
                                    ) : (
                                        props.username
                                    )}
                                </h4>
                            </li>
                            <li>
                                <button 
                                    className="mb-4 nav-link text-uppercase text-center w-100 active rounded"
                                    onClick={isEditingUsername ? handleSaveUsername : handleEditUsername}
                                >
                                    {isEditingUsername ? 'Save Username' : 'Change Username'}
                                </button>
                            </li>
                        </ul>
                        <p className="mb-4">
                            <b>Role:</b> {props.role}
                        </p>
                        <p className="mb-4">
                            <b>Email:</b> {props.email}
                        </p>
                        <ul className="nav nav-pills justify-content-between mb-3">
                            <li>
                            <button
                                    className="mb-4 nav-link text-uppercase text-center w-100 active rounded"
                                    onClick={handleOpenChangePassword}
                                >
                                    Change Password
                                </button>
                            </li>
                        </ul>
                        <div className="rounded bg-dark p-5">
                            <ul className="nav nav-pills justify-content-between mb-3">
                                <li className="nav-item w-50">
                                    <button
                                        onClick={handleEditBio}
                                        className="nav-link text-uppercase text-center w-100 active"
                                    >
                                        Edit Bio
                                    </button>
                                </li>
                                <li className="nav-item w-50">
                                    <button
                                        onClick={handleSaveBio}
                                        className="nav-link text-uppercase text-center w-100"
                                        disabled={!isEditing}
                                    >
                                        Save Bio
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="pills-1">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={newBio}
                                            onChange={(e) => setNewBio(e.target.value)}
                                            className="form-control mb-3"
                                        />
                                    ) : (
                                        <p className="text-secondary mb-0">{props.bio || "No bio available."}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="profile-logout">
                            <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
            {showChangePassword && (
                <div className="change-password-modal">
                    <div className="modal-content">
                        <h3>Change Password</h3>
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="form-control mb-3"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control mb-3"
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="form-control mb-3"
                        />
                        <div className="modal-actions">
                            <button
                                className="btn btn-primary"
                                onClick={handleChangePassword}
                            >
                                Change Password
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={handleCloseChangePassword}
                            >
                                Cancel
                            </button>
                        </div>
                        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
                    </div>
                </div>
            )}
        </>
    );
}
