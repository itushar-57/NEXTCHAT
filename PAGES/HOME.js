import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Server, ServerMember } from "@/entities/all";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";
import { MessageCircle, Users, Settings, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServerIcon from "../components/ServerIcon";
import WelcomeCard from "../components/WelcomeCard";

export default function Home() {
  const [user, setUser] = useState(null);
  const [userServers, setUserServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      // Get user's server memberships
      const memberships = await ServerMember.filter({ user_id: currentUser.id });
      const serverIds = memberships.map(m => m.server_id);

      if (serverIds.length > 0) {
        const servers = await Server.list();
        const filteredServers = servers.filter(s => serverIds.includes(s.id));
        setUserServers(filteredServers);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-discord-darker">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-discord-blurple"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex">
      {/* Friends/DM Sidebar */}
      <div className="w-60 bg-discord-darker flex flex-col">
        <div className="p-4 border-b border-discord-dark">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="font-semibold">Direct Messages</span>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-1">
          <Link
            to={createPageUrl("Servers")}
            className="flex items-center gap-3 p-2 rounded hover:bg-discord-dark transition-colors"
          >
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Find Servers</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-3 bg-discord-darkest flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold">
                {user?.full_name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{user?.full_name}</p>
              <p className="text-xs text-gray-400 truncate">Online</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button className="w-8 h-8 hover:bg-discord-dark rounded p-1.5 transition-colors">
              <Settings className="w-full h-full text-gray-400" />
            </button>
            <button
              onClick={() => User.logout()}
              className="w-8 h-8 hover:bg-discord-red rounded p-1.5 transition-colors"
            >
              <LogOut className="w-full h-full text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-discord-dark flex flex-col">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <WelcomeCard user={user} />

            {userServers.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Your Servers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userServers.map(server => (
                    <Link
                      key={server.id}
                      to={createPageUrl(`Server?id=${server.id}`)}
                      className="bg-discord-darker p-4 rounded-lg hover:bg-discord-dark transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <ServerIcon server={server} size="md" />
                        <div>
                          <h3 className="font-medium group-hover:text-white">{server.name}</h3>
                          <p className="text-sm text-gray-400 truncate">{server.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link to={createPageUrl("CreateServer")}>
                <Button className="bg-discord-blurple hover:bg-blue-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your Server
                </Button>
              </Link>
              <div className="mt-4">
                <Link
                  to={createPageUrl("Servers")}
                  className="text-discord-blurple hover:underline"
                >
                  Or browse public servers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}