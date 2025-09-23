import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, User, Save } from "lucide-react";

const profileSchema = z.object({
  full_name: z.string().min(1, "Nama wajib diisi"),
  bio: z.string().optional(),
  avatar_url: z.string().url("URL avatar harus valid").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      bio: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUser(user);

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profile) {
          form.reset({
            full_name: profile.full_name || "",
            bio: profile.bio || "",
            avatar_url: profile.avatar_url || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadProfile();
  }, [form]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const profileData = {
        user_id: user.id,
        full_name: data.full_name,
        bio: data.bio || null,
        avatar_url: data.avatar_url || null,
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(profileData, { onConflict: "user_id" });

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Profile berhasil diupdate!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Settings</h1>
        <p className="text-muted-foreground">Kelola pengaturan dan profile Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama lengkap Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Ceritakan tentang diri Anda..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="avatar_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/avatar.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 glow-soft"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Account Info */}
        <div className="space-y-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Account Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-sm font-mono bg-secondary/50 p-2 rounded">
                  {user?.email || "Loading..."}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="text-xs font-mono bg-secondary/50 p-2 rounded break-all">
                  {user?.id || "Loading..."}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Sign In</label>
                <p className="text-sm text-muted-foreground">
                  {user?.last_sign_in_at 
                    ? new Date(user.last_sign_in_at).toLocaleDateString("id-ID")
                    : "N/A"
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle>System Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Dashboard Version: 1.0.0</p>
              <p>• Last Updated: {new Date().toLocaleDateString("id-ID")}</p>
              <p>• Status: Online</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;