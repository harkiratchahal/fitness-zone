import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        membership: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [passwords, setPasswords] = useState({ password: '', new_password: '' });

    const fetchUserData = async () => {
        try {
            const response = await api.get('/users/');
            setUserData({
                username: response.data.username || '',
                first_name: response.data.first_name || '',
                last_name: response.data.last_name || '',
                email: response.data.email || '',
                phone_number: response.data.phone_number || '',
                membership: response.data.membership || 'Monthly'
            });
            setLoading(false);
        } catch (err) {
            console.error("Error fetching user data", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line
        fetchUserData();
    }, []);

    const handleUpdateDetails = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        try {
            await api.put('/users/update', userData);
            setMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (err) {
            console.error(err);
            setMessage({ text: 'Failed to update profile.', type: 'error' });
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        try {
            await api.put('/users/password', passwords);
            setMessage({ text: 'Password changed successfully!', type: 'success' });
            setPasswords({ password: '', new_password: '' });
        } catch (err) {
            setMessage({ text: err.response?.data?.detail || 'Failed to change password', type: 'error' });
        }
    };

    if (loading) return <div className="text-center py-20">Loading Profile...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-4xl font-bebas tracking-wider text-white mb-8 border-b border-gray-800 pb-4">Account Profile</h1>

            {message.text && (
                <div className={`p-4 rounded mb-6 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500 text-green-500' : 'bg-red-500/10 border border-red-500 text-red-500'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Details Form */}
                <div className="bg-secondary p-6 rounded-xl border border-gray-800">
                    <h2 className="text-2xl font-bebas text-white mb-6">Personal Information</h2>
                    <form onSubmit={handleUpdateDetails} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-400 text-sm">First Name</label>
                                <input type="text" value={userData.first_name} onChange={(e) => setUserData({...userData, first_name: e.target.value})} className="w-full bg-background border border-gray-700 rounded p-2 text-white mt-1 focus:border-primary focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm">Last Name</label>
                                <input type="text" value={userData.last_name} onChange={(e) => setUserData({...userData, last_name: e.target.value})} className="w-full bg-background border border-gray-700 rounded p-2 text-white mt-1 focus:border-primary focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">Username</label>
                            <input type="text" value={userData.username} onChange={(e) => setUserData({...userData, username: e.target.value})} className="w-full bg-background border border-gray-700 rounded p-2 text-white mt-1 focus:border-primary focus:outline-none" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">Email Address</label>
                            <input type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} className="w-full bg-background border border-gray-700 rounded p-2 text-white mt-1 focus:border-primary focus:outline-none" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">Phone Number</label>
                            <input type="tel" value={userData.phone_number} onChange={(e) => setUserData({...userData, phone_number: e.target.value})} className="w-full bg-background border border-gray-700 rounded p-2 text-white mt-1 focus:border-primary focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-primary hover:bg-red-600 font-medium py-2 rounded text-white transition-colors mt-6">
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Password Form */}
                <div className="bg-secondary p-6 rounded-xl border border-gray-800 self-start">
                    <h2 className="text-2xl font-bebas text-white mb-6">Change Password</h2>
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div>
                            <label className="text-gray-400 text-sm">Current Password</label>
                            <input type="password" required value={passwords.password} onChange={(e) => setPasswords({...passwords, password: e.target.value})} className="w-full bg-background border border-gray-700 rounded p-2 text-white mt-1 focus:border-primary focus:outline-none" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">New Password (Min 6 chars)</label>
                            <input type="password" required minLength={6} value={passwords.new_password} onChange={(e) => setPasswords({...passwords, new_password: e.target.value})} className="w-full bg-background border border-gray-700 rounded p-2 text-white mt-1 focus:border-primary focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-transparent border border-gray-600 hover:border-white font-medium py-2 rounded text-white transition-colors mt-6">
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
