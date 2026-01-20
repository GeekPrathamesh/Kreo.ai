import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Film, Image as ImageIcon, Share2, Download, PlayCircle, Loader2 } from "lucide-react";

import { toast } from "sonner";
import { Generation } from "@/utils";

interface Props {
  gen: Generation | null;
  onClose: () => void;
  onUpdate: (gen: Generation) => void;
  onDelete: () => void; 
    togglePublish: (val: boolean) => void; // 👈 add this
 
}

export default function GenerationDetailsModal({ gen, onClose, onUpdate,onDelete,togglePublish }: Props) {
  const [loadingAction, setLoadingAction] = useState(false);

  if (!gen) return null;

  const handleDownload = async (url: string, filename: string) => {
    toast.info("Starting download...");
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: gen.productName,
        text: gen.productDescription,
        url: gen.generatedVideo || gen.generatedImage,
      });
    } catch (err) {
      toast.error("Sharing not supported on this browser");
    }
  };

  const handleGenerateVideo = () => {
    setLoadingAction(true);
    toast.promise(new Promise((res) => setTimeout(res, 3000)), {
      loading: 'Initializing AI video engine...',
      success: () => {
        setLoadingAction(false);
        return 'Video generation started! Check back in a few minutes.';
      },
      error: 'Error starting generation',
    });
  };

  return (
    <Dialog open={!!gen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{gen.productName}</DialogTitle></DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {/* Media Player Area */}
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center border shadow-inner">
              {gen.generatedVideo ? (
                <video src={gen.generatedVideo} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <div className="relative w-full h-full group">
                  <img src={gen.generatedImage} className="w-full h-full object-contain opacity-60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <PlayCircle className="w-12 h-12 mb-2 opacity-80" />
                    <p className="text-sm font-medium">No Video Generated Yet</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="gap-2" onClick={() => handleDownload(gen.generatedImage, "image.png")}>
                <ImageIcon className="w-4 h-4" /> Download Image
              </Button>

              {/* Toggle Generate vs Download */}
              {gen.generatedVideo ? (
                <Button variant="default" className="gap-2" onClick={() => handleDownload(gen.generatedVideo!, "video.mp4")}>
                  <Download className="w-4 h-4" /> Download Video
                </Button>
              ) : (
                <Button variant="glow" disabled={loadingAction} onClick={handleGenerateVideo} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                  {loadingAction ? <Loader2 className="w-4 h-4 animate-spin" /> : <Film className="w-4 h-4" />}
                  Generate Video
                </Button>
              )}
            </div>
            <Button variant="secondary" className="w-full gap-2" onClick={handleShare}>
              <Share2 className="w-4 h-4" /> Share Generation
            </Button>
          </div>

          {/* Details Area */}
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-xl space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Prompt</Label>
                <p className="text-sm italic mt-1">"{gen.userPrompt}"</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Description</Label>
                <p className="text-sm mt-1">{gen.productDescription}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-xl">
              <div>
                <p className="font-medium text-sm">Publish to Community</p>
                <p className="text-xs text-muted-foreground">{gen.isPublished ? "Visible to everyone" : "Private to you"}</p>
              </div>
              <Switch
  checked={gen.isPublished}
  onCheckedChange={(val) => togglePublish(val)}
/>

            </div>

           <div>
  <Label className="text-xs text-muted-foreground mb-3 block">Uploaded Assets</Label>
  <div className="flex gap-3 flex-wrap">
    {gen.uploadedImages.map((img, i) => (
      <img
        key={i}
        src={img}
        className="w-14 h-14 rounded-lg object-cover border cursor-pointer hover:opacity-80 transition"
        onClick={() => window.open(img, "_blank")}   // 👈 open in new tab
        title="Click to view full size"
      />
    ))}
  </div>
</div>

{/* Delete Section */}
<div className="pt-4 border-t">
  <Button
    variant="destructive"
    className="w-full"
    onClick={onDelete}
  >
    Delete Project
  </Button>
</div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}