import { useDispatch } from 'react-redux';
import Comment_List from './Comment_List';
import { useState } from 'react';

interface PostCardProps {
  post: {
    ID: string;
    Content: string;
    Image: string
    Likes: string;
    Comments: string,
    User: string,
    User_Name: string,
    User_Image: string
  };
}

export default function Post_Card({ post }: PostCardProps) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    console.log()
    // dispatch(likePost(post.ID));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentText('');
    setShowComments(true); // Show comments after adding a new one
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6 max-w-2xl mx-auto">
      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.User_Image || 'https://cdn-icons-png.flaticon.com/512/4537/4537019.png'}
            alt={post.User_Name}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <div>
            <h3 className="font-medium text-gray-800">{post.User_Name}</h3>
            {/* Add timestamp if needed */}
            {/* <span className="text-xs text-gray-500">2 hours ago</span> */}
          </div>
        </div>

        {/* Post Content */}
        <p className="text-gray-800 text-sm mb-4 leading-relaxed">{post.Content}</p>

        {/* Post Image */}
        {post.Image && (
          <div className="rounded-md overflow-hidden mb-4">
            <img
              src={post.Image}
              alt="Post image"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
          <div className="flex items-center">
            <button
              onClick={handleLike}
              className="flex items-center hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              {post.Likes} Likes
            </button>
            <span className="mx-2">•</span>
            <button
              onClick={toggleComments}
              className="flex items-center hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {post.Comments.length} Comments
            </button>
          </div>
          {/* <span>{new Date(post.).toLocaleDateString()}</span> */}
        </div>

        <div className={`border-t pt-4 ${showComments ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
          <div className="overflow-hidden transition-all duration-300 ease-in-out">
            <Comment_List comments={comments} postId={post.ID} />

            <form onSubmit={handleAddComment} className="mt-4 flex">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
