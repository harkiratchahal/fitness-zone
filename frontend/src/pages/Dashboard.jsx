import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { LogOut, Activity, Calendar, Trophy, ChevronRight } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [checkingIn, setCheckingIn] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/users/');
                setUserData(response.data);
                
                // Fetch attendance for today to see if marked
                const attRes = await api.get('/attendance/my-attendance');
                const today = new Date().toISOString().split('T')[0];
                const checkedIn = attRes.data.some(record => record.date === today);
                setHasCheckedIn(checkedIn);
                
            } catch (err) {
                console.error("Failed to fetch user data", err);
            }
        };
        fetchUserData();
    }, []);

    if (!userData) {
        return <div className="text-center py-20">Loading Dashboard...</div>;
    }

    // Isolate Admin Context
    if (userData.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    const handleCheckIn = async () => {
        setCheckingIn(true);
        const today = new Date().toISOString().split('T')[0];
        try {
            await api.post('/attendance/checkin', { date: today });
            setHasCheckedIn(true);
        } catch (err) {
            console.error(err);
            alert("Failed to mark attendance.");
        }
        setCheckingIn(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
             <div className="mb-8 border-b border-gray-800 pb-5 flex justify-between items-end">
                  <div>
                      <h1 className="text-4xl font-bebas tracking-wider text-white">Dashboard</h1>
                      <p className="text-gray-400 mt-1">Welcome back, {userData.first_name} {userData.last_name}</p>
                  </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                 {/* Membership Card */}
                 <div className="bg-secondary rounded-xl p-6 border border-gray-800 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                     <h3 className="text-lg font-medium text-gray-400 mb-1">Current Plan</h3>
                     <p className="text-3xl font-bebas text-white mb-2">{userData.membership}</p>
                     
                     <div className="mt-4 pt-4 border-t border-gray-800">
                         <div className="flex justify-between text-sm">
                             <span className="text-gray-400">Status:</span>
                             <span className={userData.is_active ? "text-green-500" : "text-red-500"}>
                                 {userData.is_active ? "Active" : "Inactive"}
                             </span>
                         </div>
                     </div>
                 </div>

                 {/* Quick Stats */}
                 <div className="bg-secondary rounded-xl p-6 border border-gray-800 flex items-center justify-between">
                     <div>
                         <h3 className="text-lg font-medium text-gray-400 mb-1">Workouts this week</h3>
                         <p className="text-4xl font-bebas text-white">4</p>
                     </div>
                     <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center">
                         <Activity className="h-6 w-6 text-primary" />
                     </div>
                 </div>

                 <div className="bg-secondary mb-10 rounded-xl p-6 border border-gray-800 flex items-center justify-between">
                     <div>
                         <h3 className="text-lg font-medium text-gray-400 mb-1">Daily Workout Status</h3>
                         <p className="text-2xl font-bebas text-white">
                             {hasCheckedIn ? "Great job today! 💪" : "Haven't trained yet?"}
                         </p>
                     </div>
                     <button 
                        onClick={handleCheckIn}
                        disabled={hasCheckedIn || checkingIn}
                        className={`px-6 py-3 rounded font-bold uppercase tracking-wide transition-all ${
                            hasCheckedIn ? 'bg-green-500/20 text-green-500 border border-green-500/50 cursor-not-allowed' : 
                            'bg-primary hover:bg-red-600 text-white shadow-lg shadow-primary/30 hover:scale-105'
                        }`}
                     >
                        {hasCheckedIn ? "Checked In" : checkingIn ? "Processing..." : "Mark Attendance"}
                     </button>
                 </div>
             </div>

             {/* Quick Actions */}
             <h2 className="text-2xl font-bebas tracking-wide text-white mb-4">Quick Actions</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <Link to="/profile" className="bg-secondary hover:bg-gray-800 p-4 rounded border border-gray-800 flex justify-between items-center transition-colors">
                     <span className="font-medium text-gray-300">Edit Profile</span>
                     <ChevronRight size={18} className="text-gray-500" />
                 </Link>
                 <Link to="/memberships" className="bg-secondary hover:bg-gray-800 p-4 rounded border border-gray-800 flex justify-between items-center transition-colors">
                     <span className="font-medium text-gray-300">Upgrade Plan</span>
                     <ChevronRight size={18} className="text-gray-500" />
                 </Link>
                 <Link to="/complaints" className="bg-secondary hover:bg-gray-800 p-4 rounded border border-gray-800 flex justify-between items-center transition-colors">
                     <span className="font-medium text-gray-300">Support / Complaints</span>
                     <ChevronRight size={18} className="text-gray-500" />
                 </Link>
                 <Link to="/" className="bg-secondary hover:bg-gray-800 p-4 rounded border border-gray-800 flex justify-between items-center transition-colors">
                     <span className="font-medium text-gray-300">Class Schedule</span>
                     <ChevronRight size={18} className="text-gray-500" />
                 </Link>
             </div>
        </div>
    );
};

export default Dashboard;
