import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Hash } from 'lucide-react';
import MessageBubble from './MessageBubble';

export default function ChatArea({ messages, loading, selectedChannel }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-discord-blurple"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <div className="w-16 h-16 rounded-full bg-discord-darker flex items-center justify-center mb-4">
            <Hash className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to #{selectedChannel?.name}!
          </h2>
          <p className="text-gray-400 max-w-md">
            This is the start of the #{selectedChannel?.name} channel.
            {selectedChannel?.description && (
              <><br /><br />{selectedChannel.description}</>
            )}
          </p>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const showAvatar = !prevMessage ||
              prevMessage.author_id !== message.author_id ||
              new Date(message.created_date) - new Date(prevMessage.created_date) > 300000; // 5 minutes

            return (
              <MessageBubble
                key={message.id}
                message={message}
                showAvatar={showAvatar}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}