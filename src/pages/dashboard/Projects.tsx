import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";

const projectSchema = z.object({
  title: z.string().min(1, "Judul project wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  technologies: z.string().min(1, "Technologies wajib diisi"),
  demo_url: z.string().url("URL demo harus valid").optional().or(z.literal("")),
  github_url: z.string().url("URL GitHub harus valid").optional().or(z.literal("")),
  image_url: z.string().url("URL gambar harus valid").optional().or(z.literal("")),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface Project {
  id: string;
  title: string;
  description: string | null;
  technologies: string[] | null;
  demo_url?: string | null;
  github_url?: string | null;
  image_url?: string | null;
  created_at: string;
  user_id: string;
}

const ProjectsManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: "",
      demo_url: "",
      github_url: "",
      image_url: "",
    },
  });

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat data projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const projectData = {
        title: data.title,
        description: data.description,
        technologies: data.technologies ? data.technologies.split(",").map(t => t.trim()) : null,
        demo_url: data.demo_url || null,
        github_url: data.github_url || null,
        image_url: data.image_url || null,
        user_id: user.id,
      };

      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingProject.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Project berhasil diupdate!",
        });
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([projectData]);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Project berhasil ditambahkan!",
        });
      }

      setIsDialogOpen(false);
      setEditingProject(null);
      form.reset();
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan project",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      description: project.description || "",
      technologies: project.technologies ? project.technologies.join(", ") : "",
      demo_url: project.demo_url || "",
      github_url: project.github_url || "",
      image_url: project.image_url || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus project ini?")) return;

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Project berhasil dihapus!",
      });
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus project",
        variant: "destructive",
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    form.reset();
  };

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
          <h1 className="text-3xl font-bold gradient-text">Projects Management</h1>
          <p className="text-muted-foreground">Kelola project portfolio Anda</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 glow-soft">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Project
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Tambah Project Baru"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Project</FormLabel>
                      <FormControl>
                        <Input placeholder="E-commerce Website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Deskripsi lengkap tentang project..."
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
                  name="technologies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies</FormLabel>
                      <FormControl>
                        <Input placeholder="React, Node.js, MongoDB" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="demo_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://demo.example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="github_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/username/repo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingProject ? "Update Project" : "Tambah Project"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Batal
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="glass-effect border-primary/20 hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                <div className="flex gap-1 ml-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(project)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(project.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {project.image_url && (
                <div className="aspect-video bg-muted rounded-md overflow-hidden">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <p className="text-sm text-muted-foreground line-clamp-3">
                {project.description}
              </p>
              
              <div className="text-xs text-primary font-medium">
                {project.technologies?.join(", ")}
              </div>
              
              <div className="flex gap-2 pt-2">
                {project.demo_url && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Demo
                    </a>
                  </Button>
                )}
                {project.github_url && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="p-12 text-center glass-effect border-primary/20">
          <div className="space-y-4">
            <div className="h-12 w-12 text-muted-foreground mx-auto flex items-center justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1v6h8V1" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Belum ada project</h3>
              <p className="text-muted-foreground">
                Tambah project pertama Anda untuk mulai membangun portfolio
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProjectsManagement;