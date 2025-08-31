import React from 'react';
import { format } from 'date-fns';

export default function MessageBubble({ message, showAvatar }) {
  return (
    <div className={`flex gap-3 group hover:bg-discord-darker/50 p-2 -m-2 rounded ${
      !showAvatar ? 'mt-1' : ''
    }`}>
      <div className="w-10 flex justify-center">
        {showAvatar ? (
          <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {message.author_name?.charAt(0) || 'U'}
            </span>
          </div>
        ) : (
          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
            {format(new Date(message.created_date), 'HH:mm')}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {showAvatar && (
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-semibold text-white hover:underline cursor-pointer">
              {message.author_name}
            </span>
            <span className="text-xs text-gray-500">
              {format(new Date(message.created_date), 'MMM d, yyyy HH:mm')}
            </span>
          </div>
        )}

        <div className="text-gray-100 break-words">
          {message.content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < message.content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        {message.edited && (
          <span className="text-xs text-gray-500 ml-1">(edited)</span>
        )}
      </div>
    </div>
  );
}