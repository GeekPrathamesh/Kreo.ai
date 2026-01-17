import { useState, useRef, useEffect } from "react";
import { 
  Heart, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  Calendar,
  Clock,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Helper for formatting dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef(null);

  // Handle Video Playback on Hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && !project.isGenerating) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, project.isGenerating]);

  // Dynamic Aspect Ratio Class
  const getAspectRatioClass = (ratio) => {
    switch (ratio) {
      case '9:16': return 'aspect-[9/16]';
      case '16:9': return 'aspect-[16/9]';
      case '1:1': return 'aspect-square';
      default: return 'aspect-video';
    }
  };

  return (
    <div 
      className="group relative rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg overflow-hidden flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- Media Section --- */}
      <div className={`relative w-full overflow-hidden bg-black/5 ${getAspectRatioClass(project.aspectRatio)}`}>
        
        {/* Loading State Overlay */}
        {project.isGenerating && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-2" />
            <span className="text-xs font-medium text-primary bg-background/80 px-2 py-1 rounded-full">
              Generating...
            </span>
          </div>
        )}

        {/* Video Layer (Hidden if generating) */}
        {!project.isGenerating && (
          <video
            ref={videoRef}
            src={project.generatedVideo}
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Thumbnail Image (Visible when not hovering or if video not loaded) */}
        <img
          src={project.generatedImage || project.uploadedImages[0]} // Fallback to upload if gen not ready
          alt={project.productName}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered && !project.isGenerating ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Style/Ratio Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="backdrop-blur-md bg-black/40 text-white border-0">
            {project.aspectRatio}
          </Badge>
        </div>

        {/* Play Icon Hint */}
        {!project.isGenerating && (
          <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* --- Details Section --- */}
      <div className="p-4 flex flex-col gap-3 bg-card z-10 relative">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground">{project.productName}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{project.productDescription}</p>
          </div>
          {project.isPublished && <Heart className="w-4 h-4 text-red-500 fill-red-500" />}
        </div>

        {/* Mini Assets Preview */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground mr-1">Assets:</span>
          {project.uploadedImages.map((img, idx) => (
            <div key={idx} className="w-8 h-8 rounded-md overflow-hidden border border-border">
              <img src={img} alt="asset" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Expandable Dropdown Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-between mt-1 h-8 text-xs hover:bg-secondary/50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Details" : "View Project Details"}
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </Button>
      </div>

      {/* --- Expanded Info --- */}
      <div className={`
        bg-secondary/20 border-t border-border overflow-hidden transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-[500px] opacity-100 p-4' : 'max-h-0 opacity-0 p-0'}
      `}>
        <div className="space-y-4 text-sm">
          {/* Prompt */}
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1 mb-1">
              <Layers className="w-3 h-3" /> User Prompt
            </span>
            <p className="text-foreground/90 italic bg-background/50 p-2 rounded-md border border-border/50">
              "{project.userPrompt}"
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Created
              </span>
              <span>{formatDate(project.createdAt)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> Target Length
              </span>
              <span>{project.targetLength} seconds</span>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground">
            <span>ID: {project.id}</span>
            <span className={project.isPublished ? "text-green-500" : "text-yellow-500"}>
              {project.isPublished ? "Published" : "Draft"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};