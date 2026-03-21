import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../context/AuthContext';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const { user } = useAuth();
  const dashboardRef = useRef(null);
  const spinningTextRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Initial animations
    gsap.from(dashboardRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: 'power3.out'
    });

    // Spinning text animation
    gsap.to(spinningTextRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    // Stats counter animation
    const stats = statsRef.current.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const value = parseInt(stat.textContent);
      gsap.to(stat, {
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        innerHTML: 0,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: 'power2.out',
        onUpdate: function() {
          stat.innerHTML = Math.floor(this.targets()[0].innerHTML);
        }
      });
    });

    // Card animations
    const cards = cardsRef.current.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: index * 0.2,
        ease: 'power2.out'
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" ref={dashboardRef}>
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Welcome to your</span>
              <span 
                ref={spinningTextRef}
                className="block text-primary mt-2"
              >
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Dashboard
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Manage your account and access all your features in one place
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-primary rounded-lg shadow-xl p-6 text-center">
              <h3 className="text-lg font-medium text-white">Total Projects</h3>
              <p className="mt-2 text-3xl font-bold text-white stat-number">12</p>
            </div>
            <div className="bg-secondary rounded-lg shadow-xl p-6 text-center">
              <h3 className="text-lg font-medium text-white">Active Tasks</h3>
              <p className="mt-2 text-3xl font-bold text-white stat-number">8</p>
            </div>
            <div className="bg-accent rounded-lg shadow-xl p-6 text-center">
              <h3 className="text-lg font-medium text-white">Completed</h3>
              <p className="mt-2 text-3xl font-bold text-white stat-number">24</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
              <h3 className="text-lg font-medium text-white">Team Members</h3>
              <p className="mt-2 text-3xl font-bold text-white stat-number">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="py-12" ref={cardsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="dashboard-card bg-white rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Task completed</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                {/* Add more activity items */}
              </div>
            </div>

            <div className="dashboard-card bg-white rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
              <div className="mt-4 space-y-3">
                <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                  Create New Project
                </button>
                <button className="w-full bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition-colors">
                  Invite Team Member
                </button>
              </div>
            </div>

            <div className="dashboard-card bg-white rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-white">📅</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Team Meeting</p>
                    <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
                  </div>
                </div>
                {/* Add more event items */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 