import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  Grid3X3,
  LayoutGrid,
  RefreshCw,
  Loader2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectCard } from "../components/ProjectCard"; // Import the component we made above
import {  dummyGenerationsInfo } from "@/assets/assets";
import { Generation } from "@/utils";

export default function Community() {
const [projects, setProjects] = useState<Generation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRatio, setSelectedRatio] = useState("all");
  const [viewMode, setViewMode] = useState("masonry");

  // Function to fetch projects (Simulating API)
  const fetchProjects = async () => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    


    const dummyGenerations =dummyGenerationsInfo;

    setProjects(dummyGenerations);
    setIsLoading(false);
  };

  // Fetch on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Filtering Logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.productDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRatio = selectedRatio === "all" || project.aspectRatio === selectedRatio;
    return matchesSearch && matchesRatio;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Project <span className="text-gradient-glow">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your generated videos and explore your creative history.
            </p>
          </div>

          {/* Filters & Controls */}
          <div className="glass-strong rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search projects by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 w-full"
                />
              </div>
              
              <div className="flex flex-wrap gap-4 items-center w-full lg:w-auto">
                <Select value={selectedRatio} onValueChange={setSelectedRatio}>
                  <SelectTrigger className="w-full lg:w-40 h-12">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratios</SelectItem>
                    <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
                    <SelectItem value="16:9">16:9 (Wide)</SelectItem>
                    <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-1 p-1 bg-secondary/50 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "masonry" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("masonry")}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={fetchProjects}
                    className="h-12 w-12"
                    disabled={isLoading}
                >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <p className="text-muted-foreground mb-6">
                Showing {filteredProjects.length} projects
              </p>

              {/* Projects Grid */}
              <div className={`
                ${viewMode === "masonry" 
                  ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6" 
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                }
              `}>
                {filteredProjects.map((project, index) => (
                  <div key={project.id} className={viewMode === "masonry" ? "break-inside-avoid" : ""}>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-20 border border-dashed border-border rounded-2xl">
                  <p className="text-muted-foreground text-lg">No projects found matching your filters</p>
                  <Button variant="link" onClick={() => {setSearchQuery(""); setSelectedRatio("all");}}>
                    Clear filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}