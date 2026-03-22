import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Users, ShieldCheck } from 'lucide-react';

const Home = () => {
    // Dummy reels structure

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="relative bg-black border-b border-gray-800">
                 <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
                 {/* Provide a real gym image for the background, hosted on unsplash */}
                 <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                      alt="Gym Background" className="w-full h-[600px] object-cover opacity-50" />
                 
                 <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                     <h1 className="text-6xl md:text-8xl font-bebas text-white uppercase tracking-wider max-w-2xl leading-none shadow-sm">
                         Forged <span className="text-primary">In Iron</span>
                     </h1>
                     <p className="mt-6 text-xl text-gray-300 max-w-xl font-light">
                         Welcome to Bal Fitness Zone. We provide world-class equipment, elite trainers, and an atmosphere designed to push you beyond your limits.
                     </p>
                     <div className="mt-10 flex gap-4">
                         <Link to="/register" className="bg-primary hover:bg-red-600 text-white px-8 py-4 rounded font-bold uppercase tracking-wide flex items-center gap-2 transition-transform transform hover:scale-105">
                             Join The Zone <ArrowRight size={20} />
                         </Link>
                         <Link to="/memberships" className="bg-transparent border-2 border-white hover:border-accent hover:text-accent text-white px-8 py-4 rounded font-bold uppercase tracking-wide transition-colors">
                             View Plans
                         </Link>
                     </div>
                 </div>
            </div>

             {/* Features Section */}
             <div className="py-24 bg-background">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
                         <h2 className="text-4xl font-bebas text-white tracking-wider">Unleash Your Potential</h2>
                         <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded"></div>
                     </div>
                     
                     <div className="grid md:grid-cols-3 gap-12">
                         <div className="bg-secondary p-8 rounded-xl border border-gray-800 hover:border-primary transition-colors text-center">
                             <div className="h-16 w-16 bg-primary/20 flex items-center justify-center rounded-full mx-auto mb-6">
                                 <Activity className="text-primary h-8 w-8" />
                             </div>
                             <h3 className="text-2xl font-bebas mb-3">Premium Equipment</h3>
                             <p className="text-gray-400">Experience our state-of-the-art weights, machines, and cardio floors designed for maximum performance.</p>
                         </div>
                         <div className="bg-secondary p-8 rounded-xl border border-gray-800 hover:border-accent transition-colors text-center">
                             <div className="h-16 w-16 bg-accent/20 flex items-center justify-center rounded-full mx-auto mb-6">
                                 <Users className="text-accent h-8 w-8" />
                             </div>
                             <h3 className="text-2xl font-bebas mb-3">Community</h3>
                             <p className="text-gray-400">Join a vibrant community of athletes that support and push each other toward greatness every single day.</p>
                         </div>
                         <div className="bg-secondary p-8 rounded-xl border border-gray-800 hover:border-white transition-colors text-center">
                             <div className="h-16 w-16 bg-gray-700 flex items-center justify-center rounded-full mx-auto mb-6">
                                 <ShieldCheck className="text-white h-8 w-8" />
                             </div>
                             <h3 className="text-2xl font-bebas mb-3">Expert Trainers</h3>
                             <p className="text-gray-400">Get access to certified professionals who will guide your form, nutrition, and programming.</p>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Instagram Reels Section */}
             <div className="py-24 bg-secondary border-y border-gray-800">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="flex justify-between items-end mb-12">
                         <div>
                             <h2 className="text-4xl font-bebas text-white tracking-wider">The Zone In Action</h2>
                             <p className="text-gray-400 mt-2">Follow us on Instagram @balfitnesszone</p>
                         </div>
                     </div>
                     
                     <div className="grid md:grid-cols-3 gap-8">
                          {/* Placeholder embedding for Instagram style frames */}
                          {[1,2,3].map((item) => (
                             <div key={item} className="bg-background rounded-xl border border-gray-800 overflow-hidden text-center aspect-[9/16] flex flex-col items-center justify-center p-4">
                                <Activity className="text-gray-700 h-16 w-16 mb-4" />
                                <p className="text-gray-500 font-bebas text-xl">Instagram Reel Placeholder</p>
                                <p className="text-gray-600 text-sm mt-2">Replace with iframe/embed script</p>
                             </div>
                          ))}
                     </div>
                  </div>
             </div>
        </div>
    );
};

export default Home;
