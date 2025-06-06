import React from 'react';
import { useDispatch } from 'react-redux';

export interface Comment {
  id: string;
  User_Photo: string,
  User_Name: string,
  Content: string;
  // likes: number;
  // timestamp: string;
}

interface CommentListProps {
  comments: Comment[];
  postId: string;
}

export default function Comment_List({ comments, postId }: CommentListProps) {
  // const dispatch = useDispatch();
  
  // const handleLikeComment = (commentId: string) => {
  //   dispatch(likeComment({ postId, commentId }));
  // };
  
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex">
          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
            {comment.User_Photo && (
              <img 
                src={comment.User_Name} 
                alt={comment.User_Name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="ml-2 bg-gray-100 rounded-lg p-3 flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-sm">{comment.User_Name}</h4>
              {/* <span className="text-xs text-gray-500">
                {new Date(comment.timestamp).toLocaleDateString()}
              </span> */}
            </div>
            <p className="text-sm mt-1 text-gray-900 font-medium">{comment.Content}</p>
            {/* <div className="mt-2 flex items-center">
              <button 
                onClick={() => handleLikeComment(comment.id)}
                className="text-xs text-gray-500 flex items-center hover:text-blue-500"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
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
                {comment.likes} {comment.likes === 1 ? 'Like' : 'Likes'}
              </button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
