import Comment_List from './Comment_List';
import { useEffect, useState } from 'react';
import AxiosClient from '@/config/axios';

interface PostCardProps {
  post: {
    ID: string;
    Content: string;
    Image: string;
    Likes: string;
    Comments: string;
    User: string;
    User_Name: string;
    User_Image: string;
    Is_Liked: boolean
  };
}

export interface Comment {
  id: string;
  User_Photo: string;
  User_Name: string;
  Content: string;
}

export default function Post_Card({ post }: PostCardProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const [isLiked, setIsLiked] = useState(post.Is_Liked);
  const [likesCount, setLikesCount] = useState(parseInt(post.Likes));

  const handleLike = async () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      await AxiosClient.post('posts/like_post', {
        token: localStorage.getItem('token'),
        post_id: post.ID
      });
    } catch (error) {
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
      console.error('Failed to like post:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    const tempId = Date.now().toString();

    const optimisticComment = {
      id: tempId,
      Content: commentText,
      User_Name: 'You',
      User_Photo: 'https://cdn-icons-png.flaticon.com/512/4537/4537019.png',
    };

    setComments((prev) => [...prev, optimisticComment]);
    setCommentText('');
    setShowComments(true);

    try {
      const res = await AxiosClient.post('/comment/create_comment', {
        token: localStorage.getItem("token"),
        content: commentText,
        post_id: post.ID,
      });

      if (res.status !== 200) {
        throw new Error('Failed to add comment');
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
      setComments((prev) => prev.filter((c) => c.id !== tempId));
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const getComments = async () => {
    const res = await AxiosClient.get('/comment/get_comments_by_post', {
      params: {
         token: localStorage.getItem("token"),
        post_id: post.ID,
      },
    });

    if (res.status === 201) {
      setComments(res.data.data);
    }
  };

  const openReportModal = () => {
    setReportMessage('');
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
  };

  const submitReport = async () => {
    if (!reportMessage.trim()) {
      alert('Please enter a report message.');
      return;
    }

    try {
      const res = await AxiosClient.post('/report/report_post', {
        post_id: post.ID,
        user_id: localStorage.getItem('token'),
        message: reportMessage,
      });

      if (res.status === 200) {
        alert('Post reported successfully.');
      } else {
        alert('Failed to report the post.');
      }
    } catch (err) {
      console.error('Failed to report post:', err);
      alert('An error occurred while reporting the post.');
    }

    setShowReportModal(false);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Report Post</h2>
            <textarea
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
              className="w-full h-28 border rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Describe why you are reporting this post..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeReportModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Post Card */}
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
                objectFit: 'cover',
              }}
            />
            <div>
              <h3 className="font-medium text-gray-800">{post.User_Name}</h3>
            </div>
          </div>

          {/* Post Content */}
          <p className="text-gray-800 text-sm mb-4 leading-relaxed">{post.Content}</p>

          {/* Post Image */}
          {post.Image && (
            <div className="rounded-md overflow-hidden mb-4">
              <img
                src={post.Image}
                alt="Post"
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
            <div className="flex items-center">
              <button
                onClick={handleLike}
                className={`flex items-center hover:text-blue-500 ${isLiked ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <svg
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
                {likesCount} Likes
              </button>

              <span className="mx-2">•</span>

              <button
                onClick={toggleComments}
                className="flex items-center hover:text-blue-500"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {post.Comments.length} Comments
              </button>

              <span className="mx-2">•</span>

              <button
                onClick={openReportModal}
                className="flex items-center text-red-500 hover:text-red-600"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222l-1.414 1.414L10.828 12l-5.192 5.192 1.414 1.414L12 14.828l4.95 4.95 1.414-1.414L13.172 12z"
                  />
                </svg>
                Report
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className={`border-t pt-4 ${showComments ? 'block' : 'hidden'}`}>
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
    </>
  );
}
