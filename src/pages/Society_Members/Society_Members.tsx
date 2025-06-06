import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SocietyHeader from '@/Shared_Components/societies/SocietyHeader';
import Axios_Client from '@/config/axios';

interface Member {
  ID: string;
  Name: string;
  Email: string;
  Photo: string;
  Role: string
}

export default function Society_Members() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [members, setMembers] = useState<Member[]>([]);

  const get_all_members = async () => {
    const res = await Axios_Client.get("/societies/get_all_members", {
      params: {
        society_id: id
      }
    })

    if (res.status == 201) {
      setMembers(res.data.data);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.Name.toLowerCase().includes(searchTerm.toLowerCase()) || member.Email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.Role === roleFilter;
    return matchesSearch && matchesRole;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.Name.localeCompare(b.Name);
      case 'role':
        return a.Role.localeCompare(b.Role);
      // case 'joined':
      //   return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
      default:
        return 0;
    }
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    get_all_members();
  }, []);

  return (
    <>
      <SocietyHeader societyId={id || '1'} />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">

          {/* Members Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.121M7 20v-2m5-8a3 3 0 110-6 3 3 0 010 6z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-2xl font-semibold text-gray-900">{members.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Admins</p>
                  <p className="text-2xl font-semibold text-gray-900">{members.filter(m => m.Role === 'admin').length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Members
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Role
                </label>
                <select
                  id="role-filter"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
              </div>

              <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="role">Role</option>
                  <option value="joined">Join Date</option>
                </select>
              </div>
            </div>
          </div>

          {/* Members List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Members ({filteredMembers.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <div key={member.ID} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={member.Photo || 'https://cdn-icons-png.flaticon.com/512/4537/4537019.png'}
                        alt={member.Name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.Name)}&background=3B82F6&color=fff`;
                        }}
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{member.Name}</h3>
                        <p className="text-sm text-gray-600">{member.Email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      {/* <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{formatDate(member.joinedDate)}</p>
                        <p className="text-xs text-gray-600">Joined</p>
                      </div> */}

                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(member.Role)}`}>
                        {member.Role}
                      </span>

                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Profile
                        </button>
                        {member.Role !== 'admin' && (
                          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.121M7 20v-2m5-8a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No members found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
