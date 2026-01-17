import { Badge } from "@/components/ui/badge";
import { Generation } from "@/utils";
import { Clock, CheckCircle } from "lucide-react";

export default function GenerationCard({ gen, onClick }: { gen: Generation; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all bg-card">
      <div className="relative aspect-square">
        <img src={gen.generatedImage} className="w-full h-full object-cover" alt={gen.productName} />
        <div className="absolute top-2 right-2">
          {gen.isGenerating ? (
            <Badge variant="secondary" className="animate-pulse"><Clock className="w-3 h-3 mr-1"/> Processing</Badge>
          ) : (
            <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1"/> Ready</Badge>
          )}
        </div>
      </div>
      <div className="p-4 border-t">
        <h3 className="font-bold text-sm truncate">{gen.productName}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{gen.productDescription}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">{gen.aspectRatio}</span>
          <span className="text-[10px] text-muted-foreground">{new Date(gen.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}