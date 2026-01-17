import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Search, Plus, LayoutGrid, List } from "lucide-react";
import { dummyGenerationsInfo } from "@/assets/assets";
import GenerationRow from "@/components/generations/GenerationRow";
import GenerationCard from "@/components/generations/GenerationCard";
import GenerationDetailsModal from "@/components/generations/GenerationDetailsModal";


export type Generation = typeof dummyGenerationsInfo[0];

export default function Generations() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [generations, setGenerations] = useState<Generation[]>(dummyGenerationsInfo);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 text-center">
          <h1 className="text-4xl font-bold mb-4">My Generations</h1>
          <Button onClick={() => navigate("/auth")}>Sign In</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const filtered = generations.filter((gen) =>
    gen.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Generations</h1>
          <Button onClick={() => navigate("/create")} className="gap-2">
            <Plus className="w-5 h-5" /> Create New
          </Button>
        </div>

        {/* Toolbar */}
        <div className="bg-card border rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12" 
            />
          </div>
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            <Button variant={viewMode === "table" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("table")}><List className="w-4 h-4" /></Button>
            <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")}><LayoutGrid className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === "table" ? (
          <div className="border rounded-2xl bg-card">
            <Table>
              <TableHeader><TableRow><TableHead>Preview</TableHead><TableHead>Product</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {filtered.map(gen => <GenerationRow key={gen.id} gen={gen} onClick={() => setSelectedGeneration(gen)} />)}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(gen => <GenerationCard key={gen.id} gen={gen} onClick={() => setSelectedGeneration(gen)} />)}
          </div>
        )}
      </main>

      <GenerationDetailsModal 
        gen={selectedGeneration} 
        onClose={() => setSelectedGeneration(null)} 
        onUpdate={(updated) => setGenerations(prev => prev.map(g => g.id === updated.id ? updated : g))}
      />
      <Footer />
    </div>
  );
}