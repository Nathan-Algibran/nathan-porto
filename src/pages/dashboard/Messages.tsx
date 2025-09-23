import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Trash2, ExternalLink, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean | null;
  subject: string | null;
}

const MessagesManagement = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat pesan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ read: true })
        .eq("id", id);

      if (error) throw error;

      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menandai sebagai dibaca",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;

    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setMessages(messages.filter(msg => msg.id !== id));
      toast({
        title: "Berhasil",
        description: "Pesan berhasil dihapus!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus pesan",
        variant: "destructive",
      });
    }
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Messages</h1>
          <p className="text-muted-foreground">
            Kelola pesan dari contact form
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {unreadCount} pesan belum dibaca
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card 
            key={message.id} 
            className={`glass-effect transition-all ${
              !message.read 
                ? "border-primary/40 bg-primary/5" 
                : "border-primary/20"
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    {!message.read && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                        Baru
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {message.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(message.created_at), { 
                        addSuffix: true,
                        locale: id 
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  {!message.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsRead(message.id)}
                      className="h-8"
                    >
                      Tandai Dibaca
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="h-8"
                  >
                    <a href={`mailto:${message.email}`}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Reply
                    </a>
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteMessage(message.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="bg-secondary/30 rounded-md p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <Card className="p-12 text-center glass-effect border-primary/20">
          <div className="space-y-4">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Belum ada pesan</h3>
              <p className="text-muted-foreground">
                Pesan dari contact form akan muncul di sini
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MessagesManagement;