import { useState } from 'react';
import { Comment } from '../types';
import { ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    user: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
    },
    text: 'This is an amazing video! Really helped me understand the concepts better.',
    likes: 1234,
    timestamp: '2 days ago',
    replies: [
      {
        id: '1-1',
        user: {
          name: 'Sarah Wilson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
        },
        text: 'Totally agree! The explanations were super clear.',
        likes: 89,
        timestamp: '1 day ago',
        replies: []
      }
    ]
  },
  {
    id: '2',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100'
    },
    text: 'Great content as always! Looking forward to more videos like this.',
    likes: 857,
    timestamp: '3 days ago',
    replies: []
  }
];

interface CommentsProps {
  comments?: Comment[];
}

export default function Comments({ comments = MOCK_COMMENTS }: CommentsProps) {
  const [newComment, setNewComment] = useState('');

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Comments</h2>
      
      <div className="flex space-x-4 mb-6">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
          alt="Your avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 bg-transparent border-b border-[#272727] focus:border-[#3ea6ff] outline-none text-white placeholder-[#aaa]"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button className="px-4 py-2 text-sm font-medium text-white hover:bg-[#272727] rounded-full">
              Cancel
            </button>
            <button
              disabled={!newComment}
              className="px-4 py-2 text-sm font-medium bg-[#3ea6ff] text-black rounded-full disabled:bg-[#272727] disabled:text-[#717171]"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-white">{comment.user.name}</span>
                <span className="text-sm text-[#aaa]">{comment.timestamp}</span>
              </div>
              <p className="mt-1 text-white">{comment.text}</p>
              <div className="flex items-center space-x-4 mt-2">
                <button className="flex items-center space-x-1 text-sm text-[#aaa] hover:text-white">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-[#aaa] hover:text-white">
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button className="text-sm font-medium text-[#aaa] hover:text-white">Reply</button>
                <button className="p-1 hover:bg-[#272727] rounded-full text-[#aaa]">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              
              {comment.replies.length > 0 && (
                <div className="mt-4 ml-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-4">
                      <img
                        src={reply.user.avatar}
                        alt={reply.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{reply.user.name}</span>
                          <span className="text-sm text-[#aaa]">{reply.timestamp}</span>
                        </div>
                        <p className="mt-1 text-white">{reply.text}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="flex items-center space-x-1 text-sm text-[#aaa] hover:text-white">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{reply.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-[#aaa] hover:text-white">
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                          <button className="text-sm font-medium text-[#aaa] hover:text-white">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}