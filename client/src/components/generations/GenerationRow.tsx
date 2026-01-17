import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Clock, CheckCircle } from "lucide-react";

interface GenerationRowProps {
  gen: Generation;
  onClick: () => void;
}

export default function GenerationRow({ gen, onClick }: GenerationRowProps) {
  return (
    <TableRow 
      key={gen.id} 
      className="cursor-pointer hover:bg-muted/50 transition-colors" 
      onClick={onClick}
    >
      <TableCell className="w-[100px]">
        <div className="w-16 h-10 rounded bg-muted overflow-hidden border">
          <img 
            src={gen.generatedImage} 
            alt={gen.productName} 
            className="w-full h-full object-cover" 
          />
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex flex-col">
          <span className="font-bold text-sm">{gen.productName}</span>
          <span className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
            {gen.productDescription}
          </span>
        </div>
      </TableCell>
      
      <TableCell>
        {gen.isGenerating ? (
          <Badge variant="outline" className="animate-pulse flex w-fit gap-1 items-center">
            <Clock className="w-3 h-3" />
            <span className="text-[10px]">Processing</span>
          </Badge>
        ) : (
          <Badge variant="secondary" className="flex w-fit gap-1 items-center bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="w-3 h-3" />
            <span className="text-[10px]">Ready</span>
          </Badge>
        )}
      </TableCell>
      
      <TableCell className="hidden md:table-cell">
        <span className="text-xs text-muted-foreground">
          {new Date(gen.createdAt).toLocaleDateString()}
        </span>
      </TableCell>

      <TableCell className="text-right">
        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
          <Eye className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

// Helper for the TableRow import (if you are using shadcn/ui)
import { TableRow, TableCell } from "@/components/ui/table";
import { Generation } from "@/utils";
