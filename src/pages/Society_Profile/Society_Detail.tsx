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
  const [showModal, setShowModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');

  const handleCreatePost = async () => {
    try {
      const res = await AxiosClient.post("/posts/create_post", {
        token: localStorage.getItem("token"),
        content: newPostContent,
        image: newPostImage || '', // now it's a link
        society_id: id
      });

      if (res.status === 201) {
        setShowModal(false);
        setNewPostContent('');
        setNewPostImage('');
        getPosts(); // refresh
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const getPosts = async () => {
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

  const getEventsBySociety = async () => {
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
    getPosts();
    getEventsBySociety();
  }, [id]);

  return (
    <>
      <SocietyHeader
        societyId={id || '1'}
        showJoinButton={!isMember}
        actionButton={
          isMember ? (
            <div className="flex gap-4">
              <Link
                to={`/societies/${id}/events/new`}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Event
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Post
              </button>
            </div>
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Post</h2>

            <div className="mb-4">
              <textarea
                placeholder="What's on your mind?"
                className="w-full bg-gray-100 p-3 rounded-xl resize-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Image URL (optional)"
                className="w-full bg-gray-100 p-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPostImage as string}
                onChange={(e) => setNewPostImage(e.target.value)}
              />
            </div>

            {newPostImage && (
              <div className="mb-4 relative">
                <img
                  src={newPostImage}
                  alt="Preview"
                  className="w-full rounded-lg max-h-64 object-cover"
                />
                <button
                  onClick={() => setNewPostImage('')}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
