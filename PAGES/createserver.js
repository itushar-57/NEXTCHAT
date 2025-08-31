import React, { useState } from "react";
import { Server, Channel, ServerMember, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Hash, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CreateServer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_public: true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      const user = await User.me();

      // Create server
      const server = await Server.create({
        ...formData,
        owner_id: user.id,
        invite_code: generateInviteCode()
      });

      // Add owner as member
      await ServerMember.create({
        server_id: server.id,
        user_id: user.id,
        user_name: user.full_name,
        user_email: user.email,
        role: "owner",
        joined_at: new Date().toISOString()
      });

      // Create default general channel
      await Channel.create({
        name: "general",
        description: "General discussion",
        server_id: server.id,
        position: 0
      });

      navigate(createPageUrl(`Server?id=${server.id}`));
    } catch (error) {
      console.error("Error creating server:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return (
    <div className="flex-1 bg-discord-dark flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-discord-darker border-discord-dark">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to={createPageUrl("Home")}>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-discord-dark">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold text-white">Create Your Server</CardTitle>
          </div>
          <p className="text-gray-400">
            Your server is where you and your friends hang out. Make yours and start talking.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Server Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter server name..."
                className="bg-discord-darkest border-discord-dark text-white placeholder-gray-500"
                maxLength={100}
              />
              <p className="text-xs text-gray-400">
                {formData.name.length}/100 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Server Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Tell people what your server is about..."
                className="bg-discord-darkest border-discord-dark text-white placeholder-gray-500 h-24 resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-400">
                {formData.description.length}/500 characters
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-discord-darkest rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="public" className="text-white font-medium">Make server discoverable</Label>
                <p className="text-sm text-gray-400">
                  Allow others to find and join your server
                </p>
              </div>
              <Switch
                id="public"
                checked={formData.is_public}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_public: checked }))}
              />
            </div>

            <div className="bg-discord-darkest p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Hash className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-white">What's included</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-discord-green rounded-full"></div>
                  A general text channel to get started
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-discord-green rounded-full"></div>
                  Invite friends with a unique server code
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-discord-green rounded-full"></div>
                  Create unlimited text channels
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Link to={createPageUrl("Home")} className="flex-1">
                <Button variant="outline" className="w-full border-discord-dark text-gray-300 hover:bg-discord-dark">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={loading || !formData.name.trim()}
                className="flex-1 bg-discord-blurple hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Server
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}