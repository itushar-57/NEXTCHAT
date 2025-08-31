import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, Hash, Settings } from 'lucide-react';

export default function WelcomeCard({ user }) {
  return (
    <Card className="bg-discord-darker border-discord-dark overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-discord-blurple to-purple-600 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Welcome{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}!
              </h1>
              <p className="text-white/80 text-lg">Ready to chat with friends?</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-discord-blurple/20 flex items-center justify-center flex-shrink-0">
                <Hash className="w-4 h-4 text-discord-blurple" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Join Servers</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Find communities that match your interests
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Make Friends</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Connect with people who share your passions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Settings className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Create Servers</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Build your own community from scratch
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}