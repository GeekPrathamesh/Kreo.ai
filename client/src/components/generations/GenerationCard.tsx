import { Badge } from "@/components/ui/badge";
import { Generation } from "@/utils";
import { Clock, CheckCircle, PlayCircle, Image as ImageIcon } from "lucide-react";

export default function GenerationCard({ gen, onClick }: { gen: Generation; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative break-inside-avoid mb-6 flex flex-col rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden">
        {/* Type Indicator Overlay */}
        <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
            {gen.generatedVideo ? (
              <PlayCircle className="w-4 h-4 text-blue-400" />
            ) : (
              <ImageIcon className="w-4 h-4 text-purple-400" />
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {gen.isGenerating ? (
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/10 animate-pulse backdrop-blur-sm">
              <Clock className="w-3 h-3 mr-1" /> Processing
            </Badge>
          ) : (
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10 backdrop-blur-sm">
              <CheckCircle className="w-2 h-2 mr-1" /> Ready
            </Badge>
          )}
        </div>

        {/* The Image */}
        <img
          src={gen.generatedImage}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
          alt={gen.productName}
          loading="lazy"
        />

        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2 bg-gradient-to-b from-[#0A0A0A] to-black">
        <h3 className="font-semibold text-sm text-slate-100 truncate group-hover:text-blue-400 transition-colors">
          {gen.productName || "Untitled Generation"}
        </h3>
        
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {gen.productDescription}
        </p>

        <div className="pt-2 flex justify-between items-center border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
              {gen.aspectRatio.replace(":", " / ")}
            </span>
          </div>
          <span className="text-[10px] text-slate-600 font-medium">
            {new Date(gen.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
}