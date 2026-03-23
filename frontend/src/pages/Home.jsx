import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Users, ShieldCheck, Instagram, Play } from 'lucide-react';

import img1 from '../assets/ig-reels/DWKzwDzD9is.jpg';
import vid1 from '../assets/ig-reels/DWKzwDzD9is.mp4';

import img2 from '../assets/ig-reels/DTRSiSlkrYI.jpg';
import vid2 from '../assets/ig-reels/DTRSiSlkrYI.mp4';

import img3 from '../assets/ig-reels/DVNekFej4Yp.jpg';
import vid3 from '../assets/ig-reels/DVNekFej4Yp.mp4';

import img4 from '../assets/ig-reels/DTHCv9PgTRs.jpg';
import vid4 from '../assets/ig-reels/DTHCv9PgTRs.mp4';

const ReelCard = ({ url, videoSrc, thumbnail }) => {
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.volume = 0.5; // Moderate volume
            videoRef.current.play().catch(err => console.log("Autoplay blocked or error:", err));
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div 
            className="relative bg-black rounded-xl border border-gray-800 overflow-hidden text-center w-full max-w-[280px] mx-auto aspect-[9/16] cursor-pointer group hover:border-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => window.open(url, '_blank')}
        >
            <video 
                ref={videoRef}
                src={videoSrc}
                poster={thumbnail}
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Simple subtle Instagram Icon to indicate it's a reel */}
            <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity">
                <Instagram className="text-white h-5 w-5" />
            </div>

            {/* Play Button Indicator (hides on hover) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <div className="h-16 w-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <Play className="text-white h-8 w-8 ml-1" fill="currentColor" />
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const reels = [
        { 
            url: "https://www.instagram.com/reel/DWKzwDzD9is/", 
            video: vid1,
            thumbnail: img1
        },
        { 
            url: "https://www.instagram.com/reel/DTRSiSlkrYI/", 
            video: vid2,
            thumbnail: img2
        },
        { 
            url: "https://www.instagram.com/reel/DVNekFej4Yp/", 
            video: vid3,
            thumbnail: img3
        },
        { 
            url: "https://www.instagram.com/reel/DT33qXBj1mk/", 
            video: vid1, // Fallback due to Instagram block
            thumbnail: img1 // Fallback
        },
        { 
            url: "https://www.instagram.com/p/DTH-afFD-2r/", 
            video: vid2, // Fallback due to Instagram block
            thumbnail: img2 // Fallback
        },
        { 
            url: "https://www.instagram.com/reel/DTHCv9PgTRs/", 
            video: vid4,
            thumbnail: img4
        }
    ]; // Reels array end

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="relative bg-black border-b border-gray-800">
                 <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
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
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                          {reels.map((reel, index) => (
                             <ReelCard key={index} url={reel.url} videoSrc={reel.video} index={index} />
                          ))}
                     </div>
                  </div>
             </div>
        </div>
    );
};

export default Home;
