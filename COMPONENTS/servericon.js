import React from 'react';
import { Hash } from 'lucide-react';

export default function ServerIcon({ server, size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  if (server.icon_url) {
    return (
      <img
        src={server.icon_url}
        alt={server.name}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-discord-blurple flex items-center justify-center ${className}`}>
      {server.name ? (
        <span className={`font-semibold text-white ${size === 'lg' || size === 'xl' ? 'text-lg' : 'text-sm'}`}>
          {server.name.charAt(0).toUpperCase()}
        </span>
      ) : (
        <Hash className={`${iconSizeClasses[size]} text-white`} />
      )}
    </div>
  );
}