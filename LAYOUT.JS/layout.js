import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MessageCircle, Settings, Plus, Hash } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <style>{`
        :root {
          --discord-blurple: #5865F2;
          --discord-dark: #36393f;
          --discord-darker: #2f3136;
          --discord-darkest: #202225;
          --discord-green: #57F287;
          --discord-red: #ED4245;
        }

        .bg-discord-dark { background-color: var(--discord-dark); }
        .bg-discord-darker { background-color: var(--discord-darker); }
        .bg-discord-darkest { background-color: var(--discord-darkest); }
        .text-discord-blurple { color: var(--discord-blurple); }
        .bg-discord-blurple { background-color: var(--discord-blurple); }
        .border-discord-dark { border-color: var(--discord-dark); }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: var(--discord-darker);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: var(--discord-dark);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #4a4d52;
        }
      `}</style>

      <div className="flex h-screen">
        {/* Server Navigation */}
        <div className="w-18 bg-discord-darkest flex flex-col items-center py-3 space-y-2">
          <Link
            to={createPageUrl("Home")}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:rounded-2xl ${
              currentPageName === "Home" ? "bg-discord-blurple rounded-2xl" : "bg-discord-dark hover:bg-discord-blurple"
            }`}
          >
            <MessageCircle className="w-6 h-6" />
          </Link>

          <div className="w-8 h-0.5 bg-discord-dark rounded-full"></div>

          <Link
            to={createPageUrl("Servers")}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:rounded-2xl ${
              currentPageName === "Servers" ? "bg-discord-blurple rounded-2xl" : "bg-discord-dark hover:bg-discord-blurple"
            }`}
          >
            <Hash className="w-6 h-6" />
          </Link>

          <Link
            to={createPageUrl("CreateServer")}
            className="w-12 h-12 rounded-full bg-discord-dark hover:bg-discord-green hover:rounded-2xl flex items-center justify-center transition-all duration-200 group"
          >
            <Plus className="w-6 h-6 group-hover:text-white" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {children}
        </div>
      </div>
    </div>
  );
}