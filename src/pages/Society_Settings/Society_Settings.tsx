import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SocietyHeader from '@/Shared_Components/societies/SocietyHeader';

interface SocietySettings {
  general: {
    name: string;
    description: string;
    category: string;
    website: string;
    email: string;
    location: string;
    tags: string[];
  };
  privacy: {
    visibility: 'public' | 'private' | 'invite-only';
    joinApproval: boolean;
    memberListVisible: boolean;
    eventsVisible: boolean;
  };
  permissions: {
    whoCanPost: 'admins' | 'moderators' | 'all-members';
    whoCanCreateEvents: 'admins' | 'moderators' | 'all-members';
    whoCanInvite: 'admins' | 'moderators' | 'all-members';
  };
  notifications: {
    newMemberNotifications: boolean;
    eventReminders: boolean;
    weeklyDigest: boolean;
    emailNotifications: boolean;
  };
}

export default function Society_Settings() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SocietySettings>({
    general: {
      name: 'AI & Machine Learning Society',
      description: 'Exploring the frontiers of artificial intelligence and machine learning through workshops, discussions, and hands-on projects.',
      category: 'Technology',
      website: 'https://aiml-society.university.edu',
      email: 'contact@aiml-society.university.edu',
      location: 'Computer Science Building',
      tags: ['AI', 'Machine Learning', 'Technology', 'Programming']
    },
    privacy: {
      visibility: 'public',
      joinApproval: true,
      memberListVisible: true,
      eventsVisible: true
    },
    permissions: {
      whoCanPost: 'all-members',
      whoCanCreateEvents: 'moderators',
      whoCanInvite: 'all-members'
    },
    notifications: {
      newMemberNotifications: true,
      eventReminders: true,
      weeklyDigest: false,
      emailNotifications: true
    }
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleGeneralChange = (field: string, value: string | string[]) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value
      }
    }));
  };

  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  const handlePermissionChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !settings.general.tags.includes(tag)) {
      handleGeneralChange('tags', [...settings.general.tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleGeneralChange('tags', settings.general.tags.filter(tag => tag !== tagToRemove));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'permissions', label: 'Permissions', icon: '👥' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'danger', label: 'Danger Zone', icon: '⚠️' }
  ];

  return (
    <>
      <SocietyHeader societyId={id || '1'} />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="society-name" className="block text-sm font-medium text-gray-700 mb-2">
                          Society Name
                        </label>
                        <input
                          type="text"
                          id="society-name"
                          value={settings.general.name}
                          onChange={(e) => handleGeneralChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          id="description"
                          rows={4}
                          value={settings.general.description}
                          onChange={(e) => handleGeneralChange('description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <select
                            id="category"
                            value={settings.general.category}
                            onChange={(e) => handleGeneralChange('category', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Technology">Technology</option>
                            <option value="Science">Science</option>
                            <option value="Arts">Arts</option>
                            <option value="Sports">Sports</option>
                            <option value="Academic">Academic</option>
                            <option value="Social">Social</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            value={settings.general.location}
                            onChange={(e) => handleGeneralChange('location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                            Website
                          </label>
                          <input
                            type="url"
                            id="website"
                            value={settings.general.website}
                            onChange={(e) => handleGeneralChange('website', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={settings.general.email}
                            onChange={(e) => handleGeneralChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {settings.general.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Add a tag and press Enter"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addTag(e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Society Visibility
                        </label>
                        <div className="space-y-3">
                          {[
                            { value: 'public', label: 'Public', description: 'Anyone can find and view this society' },
                            { value: 'private', label: 'Private', description: 'Only members can view this society' },
                            { value: 'invite-only', label: 'Invite Only', description: 'Only invited users can join' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-start">
                              <input
                                type="radio"
                                name="visibility"
                                value={option.value}
                                checked={settings.privacy.visibility === option.value}
                                onChange={(e) => handlePrivacyChange('visibility', e.target.value)}
                                className="mt-1 mr-3"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{option.label}</div>
                                <div className="text-sm text-gray-600">{option.description}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Require approval for new members</h4>
                            <p className="text-sm text-gray-600">New join requests must be approved by admins</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.privacy.joinApproval}
                              onChange={(e) => handlePrivacyChange('joinApproval', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Show member list publicly</h4>
                            <p className="text-sm text-gray-600">Allow non-members to see the member list</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.privacy.memberListVisible}
                              onChange={(e) => handlePrivacyChange('memberListVisible', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Show events publicly</h4>
                            <p className="text-sm text-gray-600">Allow non-members to see society events</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.privacy.eventsVisible}
                              onChange={(e) => handlePrivacyChange('eventsVisible', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Permissions */}
                {activeTab === 'permissions' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Member Permissions</h3>
                    
                    <div className="space-y-6">
                      {[
                        { key: 'whoCanPost', label: 'Who can create posts?', description: 'Control who can share posts in the society timeline' },
                        { key: 'whoCanCreateEvents', label: 'Who can create events?', description: 'Control who can organize events for the society' },
                        { key: 'whoCanInvite', label: 'Who can invite new members?', description: 'Control who can send invitations to join the society' }
                      ].map((permission) => (
                        <div key={permission.key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {permission.label}
                          </label>
                          <p className="text-sm text-gray-600 mb-3">{permission.description}</p>
                          <select
                            value={settings.permissions[permission.key as keyof typeof settings.permissions]}
                            onChange={(e) => handlePermissionChange(permission.key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="admins">Admins only</option>
                            <option value="moderators">Admins and Moderators</option>
                            <option value="all-members">All Members</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
                    
                    <div className="space-y-6">
                      {[
                        { key: 'newMemberNotifications', label: 'New member notifications', description: 'Get notified when someone joins the society' },
                        { key: 'eventReminders', label: 'Event reminders', description: 'Send reminders about upcoming events' },
                        { key: 'weeklyDigest', label: 'Weekly digest', description: 'Send a weekly summary of society activity' },
                        { key: 'emailNotifications', label: 'Email notifications', description: 'Send notifications via email' }
                      ].map((notification) => (
                        <div key={notification.key} className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{notification.label}</h4>
                            <p className="text-sm text-gray-600">{notification.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications[notification.key as keyof typeof settings.notifications]}
                              onChange={(e) => handleNotificationChange(notification.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Danger Zone */}
                {activeTab === 'danger' && (
                  <div>
                    <h3 className="text-lg font-semibold text-red-600 mb-6">Danger Zone</h3>
                    
                    <div className="space-y-6">
                      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                        <h4 className="text-lg font-medium text-red-900 mb-2">Transfer Ownership</h4>
                        <p className="text-sm text-red-700 mb-4">
                          Transfer ownership of this society to another admin. This action cannot be undone.
                        </p>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                          Transfer Ownership
                        </button>
                      </div>

                      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                        <h4 className="text-lg font-medium text-red-900 mb-2">Archive Society</h4>
                        <p className="text-sm text-red-700 mb-4">
                          Archive this society. Members will no longer be able to post or create events, but all content will be preserved.
                        </p>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                          Archive Society
                        </button>
                      </div>

                      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                        <h4 className="text-lg font-medium text-red-900 mb-2">Delete Society</h4>
                        <p className="text-sm text-red-700 mb-4">
                          Permanently delete this society and all associated data. This action cannot be undone.
                        </p>
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Delete Society
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                {activeTab !== 'danger' && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex justify-end space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this society? This action cannot be undone and will permanently remove all data, members, and events.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete Forever
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
