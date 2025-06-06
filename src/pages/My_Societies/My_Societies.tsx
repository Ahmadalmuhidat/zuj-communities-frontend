import { Link } from 'react-router-dom';
import SocietyCard from '@/Shared_Components/societies/SocietyCard';
import { useAuth } from '@/context/Auth_Context';

const userSocieties = [
  {
    id: '1',
    name: 'Photography Club',
    description: 'Capture the world through your lens. Join our community of passionate photographers.',
    memberCount: 245,
    image: '/images/societies/photography.jpg'
  },
  {
    id: '5',
    name: 'Coding Club',
    description: 'Learn programming, build projects, and collaborate with fellow developers.',
    memberCount: 428,
    image: '/images/societies/coding.jpg'
  }
];

const managedSocieties = [
  {
    id: '3',
    name: 'Environmental Club',
    description: 'Work together to create a more sustainable and eco-friendly campus.',
    memberCount: 312,
    image: '/images/societies/environment.jpg'
  }
];

const recentActivity = [
  {
    id: '1',
    type: 'event',
    title: 'Photography Workshop',
    society: 'Photography Club',
    date: '2 days ago',
    description: 'New workshop on portrait photography techniques'
  },
  {
    id: '2',
    type: 'post',
    title: 'New Project Showcase',
    society: 'Coding Club',
    date: '1 week ago',
    description: 'Members shared their latest coding projects'
  },
  {
    id: '3',
    type: 'member',
    title: 'New Member Joined',
    society: 'Environmental Club',
    date: '3 days ago',
    description: '5 new members joined this week'
  }
];

export default function My_Societies() {
  const { user } = useAuth();

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Societies</h1>
            <Link 
              to="/societies"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Discover More
            </Link>
          </div>

          {/* Welcome Message */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome back, {user?.firstName}!
            </h2>
            <p className="text-gray-600">
              Here's what's happening in your societies and communities.
            </p>
          </div>

          {/* Societies I Manage */}
          {managedSocieties.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Societies I Manage</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Admin
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {managedSocieties.map((society) => (
                  <div key={society.id} className="relative">
                    <SocietyCard {...society} />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Manager
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Societies I'm a Member Of */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Memberships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSocieties.map((society) => (
                <div key={society.id} className="relative">
                  <SocietyCard {...society} />
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Member
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className={`p-6 ${index !== recentActivity.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-4 ${
                      activity.type === 'event' ? 'bg-purple-100' :
                      activity.type === 'post' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {activity.type === 'event' && (
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {activity.type === 'post' && (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      )}
                      {activity.type === 'member' && (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                          <p className="text-sm text-gray-600 mb-1">{activity.society}</p>
                          <p className="text-gray-600">{activity.description}</p>
                        </div>
                        <span className="text-sm text-gray-500">{activity.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">{userSocieties.length + managedSocieties.length}</div>
                <div className="text-gray-600">Societies Joined</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{managedSocieties.length}</div>
                <div className="text-gray-600">Societies Managed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">12</div>
                <div className="text-gray-600">Events Attended</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
