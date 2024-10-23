import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', bio: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile(token);
                setProfile(data);
            } catch (err) {
                setError('Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', profile.name);
        formData.append('bio', profile.bio);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
        await sendProfileData(formData);
    };

    const sendProfileData = async (data) => {
        try {
            const updatedProfile = await updateProfile(data, token);
            setProfile(updatedProfile);
            alert('Profile updated successfully');
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>User Profile</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={profile.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Bio:</label>
                    <input type="text" name="bio" value={profile.bio} onChange={handleChange} />
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input type="file" name="profilePicture" accept="image/*" onChange={handleImageChange} />
                    {profile.profilePicture && (
                        <img src={`http://localhost:5000/images/${profile.profilePicture}`} alt="Profile" />
                    )}
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
