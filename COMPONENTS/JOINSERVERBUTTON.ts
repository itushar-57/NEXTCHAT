import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ServerMember } from "@/entities/all";
import { Users } from 'lucide-react';

export default function JoinServerButton({ server, user, onJoin }) {
  const [loading, setLoading] = useState(false);

  const handleJoinServer = async () => {
    setLoading(true);
    try {
      await ServerMember.create({
        server_id: server.id,
        user_id: user.id,
        user_name: user.full_name,
        user_email: user.email,
        role: "member",
        joined_at: new Date().toISOString()
      });
      onJoin();
    } catch (error) {
      console.error("Error joining server:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleJoinServer}
      disabled={loading}
      className="w-full bg-discord-blurple hover:bg-blue-600 disabled:opacity-50"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Joining...
        </>
      ) : (
        <>
          <Users className="w-4 h-4 mr-2" />
          Join Server
        </>
      )}
    </Button>
  );
}