import React, { useState, useEffect } from "react";
import { Server, ServerMember, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Plus, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ServerIcon from "../components/ServerIcon";
import JoinServerButton from "../components/JoinServerButton";

type ServerType = {
  id: string;
  name: string;
  description?: string;
  // ...other server fields...
};

type UserType = {
  id: string;
  // ...other user fields...
};

export default function Servers() {
  const [servers, setServers] = useState<ServerType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<UserType | null>(null);
  const [userMemberships, setUserMemberships] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [serverMemberCounts, setServerMemberCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setError(null);
    setLoading(true);
    try {
      const [currentUser, allServers] = await Promise.all([
        User.me(),
        Server.list("-created_date"),
      ]);

      if (!currentUser) {
        setError("Failed to load user.");
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setServers(allServers);

      // Get user memberships
      const memberships = await ServerMember.filter({ user_id: currentUser.id });
      setUserMemberships(memberships.map((m: { server_id: string }) => m.server_id));

      // Get member counts for all servers
      const allServerIds = allServers.map((s: ServerType) => s.id);
      const allMembers = await ServerMember.filter({ server_id: allServerIds });
      const counts: Record<string, number> = {};
      allMembers.forEach((m: { server_id: string }) => {
        counts[m.server_id] = (counts[m.server_id] || 0) + 1;
      });
      setServerMemberCounts(counts);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load servers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinServer = (serverId: string) => {
    setUserMemberships(prev => [...prev, serverId]);
    setServerMemberCounts(prev => ({
      ...prev,
      [serverId]: (prev[serverId] || 0) + 1,
    }));
  };

  const filteredServers = servers.filter(server =>
    (server.name && server.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (server.description && server.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-discord-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-discord-blurple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-discord-dark text-red-400">
        <p className="mb-4">{error}</p>
        <Button onClick={loadData} className="bg-discord-blurple hover:bg-blue-600">Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-discord-dark">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search servers..."
            className="bg-discord-darker text-white"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServers.map(server => {
            const isMember = userMemberships.includes(server.id);
            const memberCount = serverMemberCounts[server.id] || 0;

            return (
              <div
                key={server.id}
                className="bg-discord-darker rounded-lg p-6 hover:bg-discord-dark transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <ServerIcon server={server} size="lg" />
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{memberCount}</span>
                  </div>
                </div>
                <div className="mb-2">
                  <h2 className="text-lg font-semibold text-white">{server.name}</h2>
                  {server.description && (
                    <p className="text-sm text-gray-400">{server.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {isMember ? (
                    <Link
                      to={createPageUrl(`Server?id=${server.id}`)}
                      className="flex-1"
                    >
                      <Button className="w-full bg-discord-green hover:bg-green-600">
                        Open Server
                      </Button>
                    </Link>
                  ) : (
                    <JoinServerButton
                      server={server}
                      user={user}
                      onJoin={() => handleJoinServer(server.id)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* ...existing code... */}
      </div>
    </div>
  );
}
