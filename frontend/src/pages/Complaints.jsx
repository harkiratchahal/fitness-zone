import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { PlusCircle, Edit3, Trash2 } from 'lucide-react';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const fetchComplaints = async () => {
        try {
            const response = await api.get('/complaints/');
            setComplaints(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line
        fetchComplaints();
    }, []);

    const handleOpenCreate = () => {
        setFormData({ title: '', description: '' });
        setEditingId(null);
        setIsFormOpen(true);
        setError('');
    };

    const handleOpenEdit = (complaint) => {
        setFormData({ title: complaint.title, description: complaint.description });
        setEditingId(complaint.id);
        setIsFormOpen(true);
        setError('');
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this complaint?")) {
            try {
                await api.delete(`/complaints/complaint/${id}`);
                fetchComplaints();
            } catch (err) {
                console.error("Failed to delete", err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editingId) {
                await api.put(`/complaints/complaint/${editingId}`, formData);
            } else {
                await api.post('/complaints/complaint', formData);
            }
            setIsFormOpen(false);
            fetchComplaints();
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to save complaint');
        }
    };

    if(loading) return <div className="text-center py-20 text-gray-400">Loading complaints...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                <div>
                     <h1 className="text-4xl font-bebas tracking-wider text-white">My Complaints & Support</h1>
                </div>
                <button 
                    onClick={handleOpenCreate}
                    className="flex items-center space-x-2 bg-primary hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                    <PlusCircle size={18} />
                    <span>New Ticket</span>
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-secondary p-6 rounded-xl border border-gray-800 mb-8">
                    <h2 className="text-2xl font-bebas text-white mb-4">{editingId ? 'Edit Ticket' : 'Create New Ticket'}</h2>
                     {error && <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 text-sm mb-4">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-gray-400 text-sm">Title</label>
                            <input 
                                type="text" required minLength={3}
                                value={formData.title} 
                                onChange={(e)=>setFormData({...formData, title: e.target.value})}
                                className="w-full bg-background border border-gray-700 rounded p-2 text-white mt-1 focus:border-primary focus:outline-none" 
                            />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">Description</label>
                            <textarea 
                                required minLength={3} maxLength={200} rows="4"
                                value={formData.description} 
                                onChange={(e)=>setFormData({...formData, description: e.target.value})}
                                className="w-full bg-background border border-gray-700 rounded p-2 text-white mt-1 focus:border-primary focus:outline-none" 
                            ></textarea>
                            <div className="text-xs text-gray-500 text-right">{formData.description.length}/200</div>
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="bg-primary hover:bg-red-600 text-white px-6 py-2 rounded font-medium transition-colors">
                                Save
                            </button>
                            <button type="button" onClick={() => setIsFormOpen(false)} className="bg-transparent border border-gray-600 hover:text-white hover:border-white text-gray-300 px-6 py-2 rounded font-medium transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {complaints.length === 0 ? (
                <div className="text-center bg-secondary p-12 rounded-xl border border-gray-800">
                    <p className="text-gray-400">You haven't submitted any complaints or support tickets.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {complaints.map(complaint => (
                        <div key={complaint.id} className="bg-secondary p-6 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4 justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-xl font-bold text-white">{complaint.title}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${complaint.is_resolved ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                        {complaint.is_resolved ? 'RESOLVED' : 'PENDING'}
                                    </span>
                                </div>
                                <p className="text-gray-300 mb-4">{complaint.description}</p>
                                
                                {complaint.admin_note && (
                                    <div className="bg-background p-4 rounded border-l-4 border-accent">
                                        <p className="text-xs text-accent font-bold uppercase mb-1">Admin Response:</p>
                                        <p className="text-gray-300 text-sm">{complaint.admin_note}</p>
                                    </div>
                                )}
                            </div>
                            
                            {!complaint.is_resolved && (
                                <div className="flex md:flex-col items-center justify-start md:items-end gap-2 md:w-32">
                                    <button 
                                        onClick={() => handleOpenEdit(complaint)}
                                        className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors p-2"
                                    >
                                        <Edit3 size={16} /> <span className="text-sm">Edit</span>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(complaint.id)}
                                        className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={16} />  <span className="text-sm">Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Complaints;
