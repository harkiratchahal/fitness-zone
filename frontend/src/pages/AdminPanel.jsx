import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Users, MessageSquare, Trash2, CheckCircle, Shield, CalendarDays } from 'lucide-react';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const [usersRes, complaintsRes, attRes] = await Promise.all([
                api.get('/admin/user'),
                api.get('/admin/complaints'),
                api.get('/attendance/admin')
            ]);
            setUsers(usersRes.data);
            setComplaints(complaintsRes.data);
            setAttendance(attRes.data);
        } catch (err) {
            console.error("Admin fetch error", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        // eslint-disable-next-line
        fetchAdminData();
    }, [refresh]);

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                await api.delete(`/admin/user/${id}`);
                setRefresh(r => r + 1);
            } catch (err) {
                console.error(err);
                alert("Failed to delete user");
            }
        }
    };

    const handleUpdateMembership = async (userId) => {
        const type = prompt("Enter new membership type (e.g. Basic, Pro, Elite):", "Pro");
        if (type) {
            const today = new Date().toISOString().split('T')[0];
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            
            try {
                await api.put('/admin/membership', {
                    user_id: userId,
                    membership_type: type,
                    start_date: today,
                    last_date: nextMonth.toISOString().split('T')[0]
                });
                setRefresh(r => r + 1);
            } catch (err) {
                console.error(err);
                alert("Failed to update membership");
            }
        }
    };

    const handleResolveComplaint = async (complaintId) => {
        const note = prompt("Enter resolution notes for the user:");
        if (note !== null) {
            try {
                await api.put('/admin/complaints/', {
                    id: complaintId,
                    admin_note: note
                });
                setRefresh(r => r + 1);
            } catch (err) {
                console.error(err);
                alert("Failed to resolve complaint");
            }
        }
    };

    const handleDeleteComplaint = async (id) => {
         if (window.confirm("Delete this complaint log?")) {
            try {
                await api.delete(`/admin/complaints/${id}`);
                setRefresh(r => r + 1);
            } catch (err) {
                console.error(err);
                alert("Failed to delete complaint");
            }
        }
    };

    // Group attendance by date
    const attendanceByDate = attendance.reduce((acc, record) => {
        if (!acc[record.date]) {
            acc[record.date] = [];
        }
        acc[record.date].push(record);
        return acc;
    }, {});
    
    // Sort dates descending
    const sortedDates = Object.keys(attendanceByDate).sort((a, b) => new Date(b) - new Date(a));

    if (loading) return <div className="text-center py-20">Loading Admin Dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center space-x-3 mb-8 border-b border-gray-800 pb-4">
                <Shield className="h-10 w-10 text-accent" />
                <h1 className="text-4xl font-bebas tracking-wider text-white">Admin Command Center</h1>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
                <button 
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center space-x-2 px-6 py-3 rounded font-medium transition-colors ${activeTab === 'users' ? 'bg-primary text-white' : 'bg-secondary text-gray-400 hover:text-white border border-gray-800'}`}
                >
                    <Users size={20} />
                    <span>Manage Users</span>
                </button>
                <button 
                    onClick={() => setActiveTab('complaints')}
                    className={`flex items-center space-x-2 px-6 py-3 rounded font-medium transition-colors ${activeTab === 'complaints' ? 'bg-primary text-white' : 'bg-secondary text-gray-400 hover:text-white border border-gray-800'}`}
                >
                    <MessageSquare size={20} />
                    <span>Support Queue</span>
                    {complaints.filter(c => !c.is_resolved).length > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                            {complaints.filter(c => !c.is_resolved).length}
                        </span>
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab('attendance')}
                    className={`flex items-center space-x-2 px-6 py-3 rounded font-medium transition-colors ${activeTab === 'attendance' ? 'bg-primary text-white' : 'bg-secondary text-gray-400 hover:text-white border border-gray-800'}`}
                >
                    <CalendarDays size={20} />
                    <span>Gym Calendar</span>
                </button>
            </div>

            {/* Content Area */}
            {activeTab === 'users' && (
                <div className="bg-secondary rounded-xl border border-gray-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="text-xs uppercase bg-gray-900 text-gray-400 border-b border-gray-800">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Membership</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                        <td className="px-6 py-4">{u.id}</td>
                                        <td className="px-6 py-4 font-medium text-white">{u.first_name} {u.last_name} <br/><span className="text-xs text-gray-500">@{u.username}</span></td>
                                        <td className="px-6 py-4">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-bold">{u.membership}</span>
                                        </td>
                                        <td className="px-6 py-4">{u.role}</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleUpdateMembership(u.id)} className="text-accent hover:text-white transition-colors">Upgrade Plan</button>
                                            {u.role !== 'admin' && (
                                                <button onClick={() => handleDeleteUser(u.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                                    <Trash2 size={18} className="inline" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'complaints' && (
                <div className="grid gap-4">
                    {complaints.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 bg-secondary rounded-xl border border-gray-800">No support tickets found.</div>
                    ) : (
                        complaints.map(c => (
                            <div key={c.id} className="bg-secondary p-6 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4 justify-between">
                                <div className="flex-1">
                                     <div className="flex items-center space-x-3 mb-2">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${c.is_resolved ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                            {c.is_resolved ? 'RESOLVED' : 'PENDING ACTION'}
                                        </span>
                                        <h3 className="text-xl font-bold text-white">#{c.id} - {c.title}</h3>
                                        <span className="text-gray-500 text-sm">User ID: {c.owner_id}</span>
                                    </div>
                                    <p className="text-gray-300 mb-4">{c.description}</p>
                                    
                                    {c.admin_note && (
                                        <div className="bg-background p-4 rounded border-l-4 border-gray-600">
                                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Your Note:</p>
                                            <p className="text-gray-300 text-sm">{c.admin_note}</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex md:flex-col items-center justify-start md:items-end gap-2 md:w-32">
                                    {!c.is_resolved && (
                                        <button 
                                            onClick={() => handleResolveComplaint(c.id)}
                                            className="flex items-center space-x-1 text-green-500 hover:text-green-400 transition-colors p-2"
                                        >
                                            <CheckCircle size={18} /> <span className="text-sm">Resolve</span>
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDeleteComplaint(c.id)}
                                        className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={18} /> <span className="text-sm">Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'attendance' && (
                <div className="space-y-8">
                    {sortedDates.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 bg-secondary rounded-xl border border-gray-800">
                            No attendance records found yet.
                        </div>
                    ) : (
                        sortedDates.map(date => (
                            <div key={date} className="bg-secondary rounded-xl border border-gray-800 overflow-hidden">
                                <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center space-x-3">
                                    <CalendarDays className="text-accent h-6 w-6" />
                                    <h3 className="text-xl font-bebas text-white tracking-wide">
                                        {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </h3>
                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full ml-auto">
                                        {attendanceByDate[date].length} Member{attendanceByDate[date].length !== 1 ? 's' : ''} Checked In
                                    </span>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {attendanceByDate[date].map(record => (
                                        <div key={record.id} className="bg-background border border-gray-800 p-4 rounded-lg flex items-center space-x-4 hover:border-gray-700 transition-colors">
                                            <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="text-primary h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{record.first_name} {record.last_name}</p>
                                                <p className="text-xs text-gray-500">@{record.username}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
