import { useEffect, useState } from 'react';
import { useAuth } from '@/context/Auth_Context';
import Axios_Client from '@/config/axios';

interface User_Info {
  ID: string,
  Name: string,
  Email: string,
  Bio: string,
  Phone_Number: string,
  Create_Date: string,
  Society_Count: number,
  Event_Count: number,
  Post_Count: number,
}

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<User_Info | null>(null);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    societyUpdates: true,
    eventReminders: true,
    weeklyDigest: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  const get_user_profile_info = async () => {
    const res = await Axios_Client.get("/users/get_user_profile_info", {
      params: {
        token: localStorage.getItem("token")
      }
    });

    if (res.status == 201) {
      setProfileData(res.data.data);
    }
  };

  const handleProfileSave = () => {
    // In real app, make API call to update profile
    setIsEditing(false);
    console.log('Profile updated:', profileData);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    get_user_profile_info();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="relative px-6 pb-6">
              <div className="flex items-end -mt-16 mb-4">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    {/* <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg> */}
                    <img
                      src={'https://cdn-icons-png.flaticon.com/512/4537/4537019.png'}
                      alt={''}
                      className="w-16 h-16 text-gray-600"
                    />
                  </div>
                </div>
                <div className="ml-6 pb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profileData?.Name}
                  </h1>
                  <p className="text-gray-600">{profileData?.Email}</p>
                  {/* <p className="text-sm text-gray-500 mt-1">
                    Member since {new Date(profileData?.Create_Date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p> */}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{profileData?.Society_Count}</div>
                  <div className="text-sm text-gray-600">Societies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{profileData?.Event_Count}</div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{profileData?.Post_Count}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'profile', label: 'Profile', icon: '👤' },
                  { id: 'notifications', label: 'Notifications', icon: '🔔' },
                  { id: 'privacy', label: 'Privacy', icon: '🔒' },
                  { id: 'security', label: 'Security', icon: '🛡️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                    <button
                      onClick={() => isEditing ? handleProfileSave() : setIsEditing(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={profileData?.Name}
                        // onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileData?.Email}
                        // onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profileData?.Phone_Number}
                        // onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={profileData?.Bio}
                      // onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>

                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications in your browser' },
                      { key: 'societyUpdates', label: 'Society Updates', description: 'Get notified about society activities and announcements' },
                      { key: 'eventReminders', label: 'Event Reminders', description: 'Receive reminders about upcoming events' },
                      { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Get a weekly summary of platform activity' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-800">{item.label}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Privacy Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="public">Public - Anyone can see your profile</option>
                        <option value="members">Members Only - Only society members can see your profile</option>
                        <option value="private">Private - Only you can see your profile</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      {[
                        { key: 'showEmail', label: 'Show Email Address', description: 'Allow others to see your email address' },
                        { key: 'showPhone', label: 'Show Phone Number', description: 'Allow others to see your phone number' },
                        { key: 'allowMessages', label: 'Allow Direct Messages', description: 'Allow other users to send you direct messages' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-800">{item.label}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacy[item.key as keyof typeof privacy] as boolean}
                              onChange={(e) => handlePrivacyChange(item.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">Change Password</h3>
                      <p className="text-sm text-gray-600 mb-4">Update your password to keep your account secure</p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Change Password
                      </button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">Active Sessions</h3>
                      <p className="text-sm text-gray-600 mb-4">Manage your active login sessions</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-white rounded border">
                          <div>
                            <p className="text-sm font-medium">Current Session</p>
                            <p className="text-xs text-gray-500">Chrome on macOS • New York, NY</p>
                          </div>
                          <span className="text-xs text-green-600 font-medium">Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h3 className="font-medium text-red-800 mb-2">Danger Zone</h3>
                      <p className="text-sm text-red-700 mb-4">Permanently delete your account and all associated data</p>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 