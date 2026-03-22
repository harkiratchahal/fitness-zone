import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Dumbbell } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username.trim(), password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to login');
        }
    };

    return (
        <div className="min-h-[calc(100vh-130px)] flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-secondary p-10 rounded-xl shadow-2xl border border-gray-800">
                <div className="flex flex-col items-center">
                    <Dumbbell className="h-12 w-12 text-primary" />
                    <h2 className="mt-4 text-center text-4xl font-bebas text-white tracking-widest">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Enter your credentials to access your account
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-300 text-sm font-medium">Username</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-700 bg-background text-white mt-1 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-700 bg-background text-white mt-1 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-primary hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
                        >
                            Log In
                        </button>
                    </div>
                    <div className="text-sm text-center text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-accent hover:text-white transition-colors">
                            Sign up now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
