import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SocietyHeader from '@/Shared_Components/societies/SocietyHeader';
import Post_Card from '@/Shared_Components/post/Post_Card';
import EventCard from '@/pages/Events/Components/EventCard';
import AxiosClient from '@/config/axios';
import { SocietyMembership } from '@/context/Membership_Context';

interface Post {
  ID: string;
  Content: string;
  Image: string,
  Likes: string;
  Comments: string,
  User: string,
  User_Name: string,
  User_Image: string,
  Is_Liked: boolean
};

type Event = {
  ID: string;
  Title: string;
  Date: string;
  Time: string,
  Description: string
  Category: string,
  Location: string,
  Image: string
};

export default function Society_Detail() {
  const { id } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const { isMember } = SocietyMembership();

  const get_posts = async () => {
    try {
      const res = await AxiosClient.get("/posts/get_posts_by_society", {
        params: {
          token: localStorage.getItem("token"),
          society_id: id
        }
      });

      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

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

  useEffect(() => {
    get_posts();
    get_events_by_society();
  }, [id]);

  return (
    <>
      <SocietyHeader
        societyId={id || '1'}
        showJoinButton={!isMember}
        actionButton={
          isMember ? (
            <Link
              to={`/societies/${id}/events/new`}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Event
            </Link>
          ) : undefined
        }
      />
      <main className="min-h-screen bg-gray-50">

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="w-full px-4 py-8 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Recent Activity</h2>

                  {posts.map((post) => (
                    <Post_Card key={post.ID} post={post} />
                  ))}

                  {posts.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <p className="text-gray-500">No recent activity. Be the first to post!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Events */}
              {events.length > 0 ? (
                <div className="mt-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Upcoming Events</h2>
                    <Link
                      to={`/societies/${id}/events`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View All Events
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => (
                      <EventCard key={event.ID} {...event} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                  No upcoming events.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
