import api from "@/lib/axios";
import { Project } from "@/utils";
import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Download,
  Sparkles,
  Video,
  Image as ImageIcon,
  ChevronLeft,
  Music,
  Waves,
} from "lucide-react";
import { Library } from "lucide-react";

const Results = () => {
  const { projectId } = useParams();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  const fetchProjectdata = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get(`/api/user/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjectData(data.project);
      setIsGenerating(data.project.isGenerating);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      toast.error("Download failed. Please try again.");
    }
  };

  const handleGeneratevideo = async () => {
    setIsGenerating(true);
    setTimeLeft(120); // reset timer

    try {
      const token = await getToken();
      const { data } = await api.post(
        "/api/project/video",
        { projectId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setProjectData((prev) =>
        prev
          ? { ...prev, generatedVideo: data.videoUrl, isGenerating: false }
          : prev,
      );

      toast.success("Your cinematic video is ready!");
      setIsGenerating(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (user && !projectData) fetchProjectdata();
    else if (isLoaded && !user) navigate("/");
  }, [user, isLoaded]);

  useEffect(() => {
    if (!isGenerating) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGenerating]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
        <p className="text-muted-foreground animate-pulse tracking-widest text-xs uppercase">
          Initializing Preview...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100">
      <div className="container mx-auto pt-24 pb-12 px-6">

        {/* Preview */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">

          <div className="flex items-center justify-center min-h-[500px] relative">
            {!projectData?.generatedVideo ? (
              <img
                src={projectData?.generatedImage}
                className={`w-full h-full max-h-[600px] object-contain transition-all duration-1000 ${
                  isGenerating ? "blur-md opacity-50 scale-95" : ""
                }`}
              />
            ) : (
              <video
                src={projectData.generatedVideo}
                autoPlay
                loop
                controls
                className="w-full h-full max-h-[600px] object-contain"
              />
            )}

            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                <Waves className="w-12 h-12 text-blue-400 animate-pulse mb-3" />
                <p className="text-lg font-semibold">Rendering Video</p>
                <p className="text-sm text-slate-300 mt-1">
                  Estimated time remaining
                </p>
                <p className="text-3xl font-mono mt-2 text-blue-400">
                  {formatTime(timeLeft)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button
            onClick={() =>
              handleDownload(projectData?.generatedImage!, `image-${projectId}.png`)
            }
          >
            Save Image
          </Button>

          <Button
            disabled={!projectData?.generatedVideo}
            onClick={() =>
              handleDownload(projectData?.generatedVideo!, `video-${projectId}.mp4`)
            }
          >
            Save Video
          </Button>
        </div>

        <Button
          onClick={handleGeneratevideo}
          disabled={isGenerating || !!projectData?.generatedVideo}
          className="w-full mt-6"
        >
          {isGenerating
            ? `Processing... (${formatTime(timeLeft)})`
            : projectData?.generatedVideo
            ? "Render Complete"
            : "Generate AI Video"}
        </Button>
      </div>
    </div>
  );
};

export default Results;
