import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Image as ImageIcon, 
  Monitor, 
  Smartphone, 
  X, 
  Sparkles,
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { UploadZone } from "@/components/UploadZone";

// --- Main Page Component ---
export default function CreateVideo() {
  const { user } = useAuth();
  
  // State
  const [productFile, setProductFile] = useState<File | null>(null);
  const [brandFile, setBrandFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("9:16");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!user) {
      toast.error("Please sign in to generate content");
      return;
    }
    if (!productFile || !projectName || !prompt) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    toast.success("Generation started!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Create Your <span className="text-gradient-glow">UGC Video</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Configure your campaign settings in one place
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* LEFT COLUMN: Uploads */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-glow-accent" />
                    Visual Assets
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Upload your raw product imagery and brand references.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Upload 1: Product */}
                  <UploadZone 
                    label="Product Image/Video" 
                    file={productFile} 
                    setFile={setProductFile} 
                  />

                  {/* Upload 2: Brand/Model */}
                  <UploadZone 
                    label="Brand Reference / Model Image" 
                    file={brandFile} 
                    setFile={setBrandFile} 
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Form Data */}
              <div className="lg:col-span-7 space-y-8">
                 <div className="space-y-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-glow-accent" />
                    Campaign Details
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Define the context and style for your generation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="projectName"
                      placeholder="e.g. Summer Launch 2024"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="h-11 bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      placeholder="e.g. Wireless Earbuds Pro"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="h-11 bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the key features, benefits, and usage context..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px] bg-background/50 resize-y"
                  />
                </div>

                {/* Aspect Ratio Selection */}
                <div className="space-y-3">
                  <Label>Video Aspect Ratio</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setAspectRatio("9:16")}
                      className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        aspectRatio === "9:16"
                          ? "border-glow-accent bg-glow-accent/10 text-foreground"
                          : "border-border bg-background/50 text-muted-foreground hover:border-glow-accent/30"
                      }`}
                    >
                      <Smartphone className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">9:16</div>
                        <div className="text-xs opacity-70">Reels / TikTok</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setAspectRatio("16:9")}
                      className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        aspectRatio === "16:9"
                          ? "border-glow-accent bg-glow-accent/10 text-foreground"
                          : "border-border bg-background/50 text-muted-foreground hover:border-glow-accent/30"
                      }`}
                    >
                      <Monitor className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">16:9</div>
                        <div className="text-xs opacity-70">YouTube</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt">AI Prompt / Creative Direction</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the visual style, mood, and action you want in the video..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[140px] bg-background/50 font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-end items-center gap-4">
               <div className="text-sm text-muted-foreground order-2 md:order-1">
                 Est. processing time: ~30 seconds
               </div>
               <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                variant="glow" 
                size="xl" 
                className="w-full md:w-auto min-w-[250px] order-1 md:order-2"
              >
                {isGenerating ? (
                   <>Processing Assets...</>
                ) : (
                   <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Image Preview
                   </>
                )}
               </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}