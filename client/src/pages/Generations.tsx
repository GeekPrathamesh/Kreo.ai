import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Search, Plus, LayoutGrid, List, Sparkles, Loader2 } from "lucide-react";
import GenerationRow from "@/components/generations/GenerationRow";
import GenerationCard from "@/components/generations/GenerationCard";
import GenerationDetailsModal from "@/components/generations/GenerationDetailsModal";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function Generations() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [selectedGeneration, setSelectedGeneration] = useState<any | null>(null);
  const [generations, setGenerations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyGenerations = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await api.get("/api/user/projects", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGenerations(data.projects);
      console.log(generations);

    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        fetchMyGenerations();
        
      } else {
        setLoading(false);
      }
    }
  }, [user, isLoaded]);

  // 1. Wait for Clerk to load
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2. If Clerk is loaded but no user, show Auth state
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-20 px-6 text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Unlock Your Creative Gallery</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Sign in to view your AI-generated masterpieces and continue creating cinematic content.
          </p>
          <Button size="lg" onClick={() => navigate("/auth")} className="rounded-full px-8 shadow-lg shadow-primary/20">
            Sign In to Access
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const filtered = generations.filter((gen) =>
    gen.productName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteProject = async (id: string) => {
  try {
    const token = await getToken();
    await api.delete(`/api/project/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setGenerations(prev => prev.filter(g => g.id !== id));
    setSelectedGeneration(null);
    toast.success("Project deleted");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message);
  }
};

const togglePublish = async (id: string, isPublished: boolean) => {
  try {
    const token = await getToken();
    const { data } = await api.post(
      `/api/user/publish/${id}/`,
      { isPublished },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setGenerations(prev =>
      prev.map(g =>
        g.id === id ? { ...g, isPublished: data.isPublished } : g
      )
    );

    if (selectedGeneration?.id === id) {
      setSelectedGeneration(prev => prev ? { ...prev, isPublished: data.isPublished } : prev);
    }

    toast.success(isPublished ? "Published" : "Unpublished");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message);
  }
};



  return (
    <div className="min-h-screen bg-[#030303] text-slate-100">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
              My Generations
            </h1>
            <p className="text-slate-400 mt-2">Manage and export your AI-powered assets.</p>
          </div>
          <Button 
            onClick={() => navigate("/create")} 
            className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4 mr-2" /> Create New Project
          </Button>
        </div>

        {/* Action Bar */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-2 mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Search by product name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-transparent border-none focus-visible:ring-0 text-base" 
            />
          </div>
          <div className="flex gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-lg ${viewMode === "table" ? "bg-white/10 text-white" : "text-slate-500"}`}
              onClick={() => setViewMode("table")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-lg ${viewMode === "grid" ? "bg-white/10 text-white" : "text-slate-500"}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content State Handling */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="h-12 w-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            <p className="text-slate-500 animate-pulse tracking-widest text-xs uppercase">Accessing Secure Vault...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
            <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
               <LayoutGrid className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-medium text-slate-300">No generations found</h3>
            <p className="text-slate-500 mt-2">Start your first project to see it appear here.</p>
          </div>
        ) : viewMode === "table" ? (
          <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-slate-400">Preview</TableHead>
                  <TableHead className="text-slate-400">Product</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-right text-slate-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(gen => (
                  <GenerationRow 
                    key={ gen.id} 
                    gen={gen} 
                    onClick={() => setSelectedGeneration(gen)} 
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
<div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
  {filtered.map(gen => (
    <GenerationCard 
      key={ gen.id} 
      gen={gen} 
      onClick={() => setSelectedGeneration(gen)} 
    />
  ))}
</div>
        )}
      </main>

<GenerationDetailsModal 
  gen={selectedGeneration}
togglePublish={(val: boolean) =>
  selectedGeneration && togglePublish(selectedGeneration.id, val)
}
  onClose={() => setSelectedGeneration(null)} 
  onDelete={() => selectedGeneration && deleteProject(selectedGeneration.id)}
  onUpdate={(updated) =>
    setGenerations(prev =>
      prev.map(g => (g.id === updated.id ? updated : g))
    )
  }
/>

      <Footer />
    </div>
  );
}