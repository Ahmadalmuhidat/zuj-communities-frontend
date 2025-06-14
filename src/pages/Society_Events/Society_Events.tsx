import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SocietyHeader from '@/Shared_Components/societies/SocietyHeader';
import AxiosClient from '@/config/axios';
import { SocietyMembership } from '@/context/Membership_Context';
import { useAuth } from '@/context/Auth_Context';

interface Event {
  ID: string;
  Image: string;
  Title: string;
  Description: string;
  Location: string;
  Date: string;
  Time: string;
  Organizer: string;
}

export default function Society_Events() {
  const { id } = useParams();
  const [filter, setFilter] = useState<string>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const { isMember } = SocietyMembership();
  const { isAuthenticated } = useAuth();

  const get_events_by_society = async () => {
    const res = await AxiosClient.get("/events/get_events_by_society", {
      params: {
        society_id: id
      }
    })

    if (res.status == 201) {
      console.log(res.data.data)
      setEvents(res.data.data);
    }
  }

  const isEventCompleted = (event: Event) => {
    const eventDateTime = new Date(`${event.Date}T${event.Time}`);
    if (new Date() > eventDateTime) {
      return 'completed';
    } else {
      return 'upcoming'
    }
  };

  const filteredEvents = events
    .filter(event => {
      const matchesFilter = filter === 'all' || isEventCompleted(event) === filter;
      const matchesSearch = event.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.Description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (filter === 'upcoming') {
        return new Date(a.Date).getTime() - new Date(b.Date).getTime();
      }
      return new Date(b.Date).getTime() - new Date(a.Date).getTime();
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    get_events_by_society();
  }, []);

  return (
    <>
      <SocietyHeader
        societyId={id || '1'}
        actionButton={
          isMember ? (<Link
            to={`/societies/${id}/events/new`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Event
          </Link>) : null
        }
      />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">

          {/* Event Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-semibold text-gray-900">{events.filter(e => isEventCompleted(e) === 'upcoming').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Events</p>
                  <p className="text-2xl font-semibold text-gray-900">{events.filter(e => isEventCompleted(e) === 'completed').length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Events
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by title, description, or tags..."
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
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Events</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div key={event.ID} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={event.Image}
                      alt={event.Title}
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x300/3B82F6/ffffff?text=${encodeURIComponent(event.Title)}`;
                      }}
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.Title}</h3>
                        <p className="text-gray-600 mb-3">{event.Description}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadge(isEventCompleted(event))}`}>
                        {isEventCompleted(event)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.Date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatTime(event.Time)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.Location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Organizer: {event.Organizer}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                        Edit Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria.' : 'No events match the selected filter.'}
              </p>
              {
                isAuthenticated && isMember ? (<div className="mt-6">
                  <Link
                    to={`/societies/${id}/events/new`}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Create New Event
                  </Link>
                </div>) : null
              }

            </div>
          )}
        </div>
      </main>
    </>
  );
}
