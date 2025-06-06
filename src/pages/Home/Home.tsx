import React from 'react';
import { Link } from 'react-router-dom';
import HomeContainer from './Components/HomeContainer';
import { useAuth } from '@/context/Auth_Context';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  const get_active_societies = () => {
    console.log()
  };

  const get_total_members = () => {
    console.log()
  };

  const get_upcoming_events = () => {
    console.log()
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Posts Feed */}
            <div className="lg:col-span-2">
              {isAuthenticated ? (
                <>
                  {/* Welcome Back Section */}
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Welcome back, {user?.firstName}! 👋
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Here's what's happening in your communities today.
                    </p>
                    <div className="flex space-x-4">
                      <Link
                        to="/my-societies"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        My Societies
                      </Link>
                      <Link
                        to="/events"
                        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                      >
                        Upcoming Events
                      </Link>
                    </div>
                  </div>

                  {/* Posts Feed */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Posts</h3>
                    <HomeContainer />
                  </div>
                </>
              ) : (
                <>

                  {/* Public Posts Preview */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <div className="text-6xl mb-4">📱</div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">Join to See Posts</h4>
                      <p className="text-gray-600 mb-6">
                        Sign up to see posts, comments, and discussions from our vibrant community of societies and members.
                      </p>
                      <Link
                        to="/signup"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Sign Up to See More
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Societies</span>
                    <span className="font-semibold text-blue-600">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Members</span>
                    <span className="font-semibold text-green-600">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upcoming Events</span>
                    <span className="font-semibold text-purple-600">23</span>
                  </div>
                </div>
              </div>


              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {isAuthenticated ? (
                    <Link
                      to="/societies/new"
                      className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="text-blue-800 font-medium">Create Society</span>
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-blue-800 font-medium">Login to Create Society</span>
                    </Link>
                  )}

                  <Link
                    to="/events"
                    className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-green-800 font-medium">Browse Events</span>
                  </Link>

                  <Link
                    to="/support"
                    className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-purple-800 font-medium">Get Help</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 