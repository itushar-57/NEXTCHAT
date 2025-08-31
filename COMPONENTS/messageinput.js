import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Plus } from 'lucide-react';

export default function MessageInput({ onSendMessage, channelName }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-discord-dark border-t border-discord-darker">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mb-2 text-gray-400 hover:text-white hover:bg-discord-darker"
        >
          <Plus className="w-5 h-5" />
        </Button>

        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channelName}`}
            className="bg-discord-darker border-discord-dark text-white placeholder-gray-500 resize-none min-h-[44px] max-h-32 pr-12"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim()}
            className="absolute right-2 bottom-2 w-8 h-8 bg-transparent hover:bg-discord-blurple disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}