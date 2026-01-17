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
interface UploadZoneProps {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
  accept?: string;
}

export const UploadZone = ({ label, file, setFile, accept = "image/*,video/*" }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrl = file ? URL.createObjectURL(file) : "";

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      toast.success(`${label} uploaded!`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">{label}</Label>
      
      {file ? (
        // Preview State
        <div className="relative group rounded-xl overflow-hidden border border-border bg-secondary/10">
          <div className="aspect-video w-full flex items-center justify-center bg-black/50">
             {file.type.startsWith('video') ? (
                <video src={previewUrl} className="max-h-64 w-full object-contain" />
             ) : (
                <img src={previewUrl} alt="Preview" className="max-h-64 w-full object-contain" />
             )}
          </div>
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <p className="text-white text-sm font-medium truncate max-w-[80%] px-2">
              {file.name}
            </p>
            <Button variant="destructive" size="sm" onClick={handleRemove} className="gap-2">
              <Trash2 className="w-4 h-4" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        // Upload State
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
            flex flex-col items-center justify-center min-h-[200px]
            ${isDragging 
              ? "border-glow-accent bg-glow-accent/10 scale-[1.02]" 
              : "border-border hover:border-glow-accent/50 hover:bg-secondary/20"
            }
          `}
        >
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Upload className={`w-6 h-6 ${isDragging ? "text-glow-accent" : "text-muted-foreground"}`} />
          </div>
          <p className="font-medium text-foreground">Click to upload or drag & drop</p>
          <p className="text-sm text-muted-foreground mt-1">SVG, PNG, JPG or MP4</p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileSelect}
          />
        </div>
      )}
    </div>
  );
};
