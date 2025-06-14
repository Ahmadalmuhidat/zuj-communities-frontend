import React, { useState } from 'react';

export interface Comment {
  id: string;
  User_Photo: string;
  User_Name: string;
  Content: string;
}

interface CommentListProps {
  comments: Comment[];
  postId: string;
}

export default function Comment_List({ comments, postId }: CommentListProps) {
  const [visibleCount, setVisibleCount] = useState(1);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const displayedComments = comments.slice(0, visibleCount);
  const hasMore = visibleCount < comments.length;

  return (
    <div className="space-y-4">
      {displayedComments.map((comment) => (
        <div key={comment.id} className="flex">
          <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
            <img
              src={comment.User_Photo || 'https://cdn-icons-png.flaticon.com/512/4537/4537019.png'}
              alt={comment.User_Name}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div className="ml-2 bg-gray-100 rounded-lg p-3 flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-sm">{comment.User_Name}</h4>
            </div>
            <p className="text-sm mt-1 text-gray-900 font-medium">{comment.Content}</p>
          </div>
        </div>
      ))}

      {hasMore && (
        <button
          onClick={handleViewMore}
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          View more comments
        </button>
      )}
    </div>
  );
}
