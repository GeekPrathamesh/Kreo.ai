import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ImageIcon,
  Monitor,
  Smartphone,
  Sparkles,
  Loader2,
  Globe,
  Cpu,
  Zap,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { UploadZone } from "@/components/UploadZone";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { assets } from "@/assets/assets.ts";

// --- Import Assets ---
// Assuming these imports exist as per your prompt


const SAMPLE_PRODUCTS = [
  assets.product1,
  assets.product2,
  assets.product3,
  assets.product4,
  assets.product5,
  assets.product6,
  assets.product7,
  assets.product8

];

const SAMPLE_MODELS = [
  assets.model1,
  assets.model2,
  assets.model3,
  assets.model4,
];


// --- Engaging Facts ---
const LOADING_FACTS = [
  { icon: <Globe className="w-4 h-4" />, text: "Your request just traveled 3,000 miles to our GPU clusters." },
  { icon: <Cpu className="w-4 h-4" />, text: "AI is currently 'denoising' millions of pixels for clarity." },
  { icon: <Zap className="w-4 h-4" />, text: "Fun fact: Generating one AI image uses as much power as charging a phone." },
  { icon: <Sparkles className="w-4 h-4" />, text: "Our neural network is analyzing your brand's unique lighting." },
  { icon: <ImageIcon className="w-4 h-4" />, text: "Blending your product seamlessly into the creative environment..." },
];

export default function CreateVideo() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  // State
  const [productFile, setProductFile] = useState<File | null>(null);
  const [brandFile, setBrandFile] = useState<File | null>(null);
  
  // Track which pre-selected asset is active (for UI highlighting)
  const [selectedProductAsset, setSelectedProductAsset] = useState<string | null>(null);
  const [selectedModelAsset, setSelectedModelAsset] = useState<string | null>(null);

  const [projectName, setProjectName] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("9:16");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  // Cycle facts while generating
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setFactIndex((prev) => (prev + 1) % LOADING_FACTS.length);
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // --- Helper to convert URL to File ---
  const handleAssetSelect = async (
    url: string, 
    type: 'product' | 'brand'
  ) => {
    try {
      // 1. Update visual selection state
      if (type === 'product') setSelectedProductAsset(url);
      else setSelectedModelAsset(url);

      // 2. Fetch the image and convert to blob
      const response = await fetch(url);
      const blob = await response.blob();
      
      // 3. Create a File object
      const filename = url.split('/').pop() || `sample-${type}.jpg`;
      const file = new File([blob], filename, { type: blob.type });

      // 4. Update the actual form state
      if (type === 'product') setProductFile(file);
      else setBrandFile(file);
      
      toast.success(`Selected sample ${type}`);
    } catch (error) {
      console.error("Error converting asset to file:", error);
      toast.error("Failed to load sample asset");
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast("Please sign in to generate content");
      return;
    }

    if (!productFile || !brandFile || !projectName || !productName) {
      toast("Please fill in all required fields");
      return;
    }

    try {
      setIsGenerating(true);
      const formData = new FormData();
      formData.append("name", projectName);
      formData.append("productName", productName);
      formData.append("productDescription", description);
      formData.append("userPrompt", prompt);
      formData.append("aspectRatio", aspectRatio);
      formData.append("images", productFile);
      formData.append("images", brandFile);

      const token = await getToken();
      const { data } = await api.post("/api/project/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(data.message);
      navigate("/result/" + data.projectId);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <form onSubmit={handleGenerate}>
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Create Your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Kreo Video</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload your assets and watch our AI transform them into high-converting video content.
              </p>
            </div>

            <div className="glass-strong rounded-3xl p-6 md:p-10 transition-all duration-700">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* LEFT COLUMN: Uploads */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-blue-500" />
                      Visual Assets
                    </h2>
                  </div>

                  {/* --- Product Image Section --- */}
                  <div className="space-y-4">
                    <UploadZone 
                        label="Product Image/Video" 
                        file={productFile} 
                        setFile={(f) => {
                            setProductFile(f);
                            setSelectedProductAsset(null); // Clear preset selection if user uploads manual
                        }} 
                    />
                    
                    {/* Asset Slider for Products */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Or choose a sample product</Label>
                        <AssetSelector 
                            assets={SAMPLE_PRODUCTS} 
                            selected={selectedProductAsset} 
                            onSelect={(url) => handleAssetSelect(url, 'product')} 
                        />
                    </div>
                  </div>

                  <div className="h-px bg-white/10 w-full" />

                  {/* --- Model Image Section --- */}
                  <div className="space-y-4">
                    <UploadZone 
                        label="Brand Reference / Model Image" 
                        file={brandFile} 
                        setFile={(f) => {
                            setBrandFile(f);
                            setSelectedModelAsset(null); // Clear preset selection if user uploads manual
                        }} 
                    />

                    {/* Asset Slider for Models */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Or choose a sample model</Label>
                        <AssetSelector 
                            assets={SAMPLE_MODELS} 
                            selected={selectedModelAsset} 
                            onSelect={(url) => handleAssetSelect(url, 'brand')} 
                        />
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: Form Data */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-500" />
                      Campaign Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name <span className="text-red-500">*</span></Label>
                      <Input id="projectName" placeholder="Summer Launch" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input id="productName" placeholder="Wireless Pro" value={productName} onChange={(e) => setProductName(e.target.value)} className="bg-white/5 border-white/10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea id="description" placeholder="Key features..." value={description} onChange={(e) => setDescription(e.target.value)} className="bg-white/5 border-white/10" />
                  </div>

                  <div className="space-y-3">
                    <Label>Video Aspect Ratio</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => setAspectRatio("9:16")} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${aspectRatio === "9:16" ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-white/5 opacity-60"}`}>
                        <Smartphone className="w-5 h-5" />
                        <div className="text-left font-semibold">9:16 <span className="block text-[10px] font-normal">Reels / TikTok</span></div>
                      </button>
                      <button type="button" onClick={() => setAspectRatio("16:9")} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${aspectRatio === "16:9" ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-white/5 opacity-60"}`}>
                        <Monitor className="w-5 h-5" />
                        <div className="text-left font-semibold">16:9 <span className="block text-[10px] font-normal">YouTube / TV</span></div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prompt">AI Prompt / Creative Direction</Label>
                    <Textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-[120px] bg-white/5 border-white/10 font-mono text-xs" />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Animated Loading Ticker */}
                <div className="min-h-[40px] flex items-center">
                  {isGenerating && (
                    <div className="flex items-center gap-3 text-sm text-blue-400 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="p-2 rounded-full bg-blue-500/20">
                        {LOADING_FACTS[factIndex].icon}
                      </div>
                      <p className="italic font-medium">{LOADING_FACTS[factIndex].text}</p>
                    </div>
                  )}
                  {!isGenerating && (
                    <p className="text-sm text-muted-foreground italic">Ready to transform your vision.</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isGenerating}
                  size="xl"
                  className={`
                    relative group overflow-hidden transition-all duration-300
                    ${isGenerating ? 'px-12 bg-zinc-800' : 'bg-white text-black hover:scale-105'}
                    rounded-full font-bold px-8 py-6
                  `}
                >
                  {/* Shimmer Effect */}
                  {!isGenerating && (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  )}

                  {isGenerating ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      <span className="text-white">Analyzing Pixels...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 fill-current" />
                      Generate Image Preview
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </form>
      <Footer />
    </div>
  );
}

// --- Internal Component: Asset Selector ---
interface AssetSelectorProps {
    assets: string[];
    selected: string | null;
    onSelect: (asset: string) => void;
}

function AssetSelector({ assets, selected, onSelect }: AssetSelectorProps) {
    return (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {assets.map((asset, idx) => (
                <button
                    key={idx}
                    type="button" // Important to prevent form submission
                    onClick={() => onSelect(asset)}
                    className={`
                        relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200
                        ${selected === asset 
                            ? 'border-blue-500 ring-2 ring-blue-500/30 scale-105' 
                            : 'border-white/5 hover:border-white/20 hover:scale-105 opacity-70 hover:opacity-100'}
                    `}
                >
                    <img 
                        src={asset} 
                        alt={`Asset ${idx}`} 
                        className="w-full h-full object-cover" 
                    />
                    {selected === asset && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center backdrop-blur-[1px]">
                           <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    )
}