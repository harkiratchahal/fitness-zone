import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Dumbbell, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to register account');
        }
    };

    return (
         <div className="min-h-[calc(100vh-130px)] flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-secondary p-10 rounded-xl shadow-2xl border border-gray-800">
                 <div className="flex flex-col items-center">
                    <Dumbbell className="h-12 w-12 text-primary" />
                    <h2 className="mt-4 text-center text-4xl font-bebas text-white tracking-widest">
                        Join The Zone
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Create an account to manage your fitness
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 text-sm text-center">
                            {error}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-300 text-sm font-medium">First Name</label>
                            <input
                                name="first_name" type="text" required onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 bg-background text-white mt-1 focus:outline-none focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 text-sm font-medium">Last Name</label>
                            <input
                                name="last_name" type="text" required onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 bg-background text-white mt-1 focus:outline-none focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                             <label className="text-gray-300 text-sm font-medium">Email</label>
                            <input
                                name="email" type="email" required onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 bg-background text-white mt-1 focus:outline-none focus:border-primary sm:text-sm"
                            />
                        </div>
                         <div className="col-span-2">
                             <label className="text-gray-300 text-sm font-medium">Phone</label>
                            <input
                                name="phone_number" type="tel" required onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 bg-background text-white mt-1 focus:outline-none focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                             <label className="text-gray-300 text-sm font-medium">Username</label>
                            <input
                                name="username" type="text" required onChange={handleChange}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 bg-background text-white mt-1 focus:outline-none focus:border-primary sm:text-sm"
                            />
                        </div>
                         <div className="col-span-2">
                             <label className="text-gray-300 text-sm font-medium">Password</label>
                             <div className="relative">
                                <input
                                    name="password" type={showPassword ? "text" : "password"} required onChange={handleChange}
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 bg-background text-white mt-1 focus:outline-none focus:border-primary sm:text-sm pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                             </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-primary hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
         </div>
    );
};

export default Register;
