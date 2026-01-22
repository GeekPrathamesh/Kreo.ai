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
  Library,
} from "lucide-react";

const Results = () => {
  const { projectId } = useParams();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // New State for Timer
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  const fetchProjectdata = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get(`/api/user/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjectData(data.project);
      setIsGenerating(data.project.isGenerating);
      setLoading(false);
      
      // If generation finished remotely, reset timer
      if (!data.project.isGenerating) {
        setIsGenerating(false);
      }
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
    } catch (error) {
      toast.error("Download failed. Please try again.");
    }
  };

  const handleGeneratevideo = async () => {
    setIsGenerating(true);
    setTimeLeft(120); // Reset timer to 2 mins
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

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGenerating, timeLeft]);

  // Helper to format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (user && !projectData) fetchProjectdata();
    else if (isLoaded && !user) navigate("/");
  }, [user, isLoaded]);

  useEffect(() => {
    if (user && isGenerating) {
      const interval = setInterval(fetchProjectdata, 10000);
      return () => clearInterval(interval);
    }
  }, [user, isGenerating]);

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
    <div className="min-h-screen bg-[#030303] text-slate-100 selection:bg-blue-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto pt-24 pb-12 px-6 relative z-10">
        <div className="flex gap-3 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="hover:bg-white/5 text-slate-400"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate("/generations")}
            className="hover:bg-white/5 text-slate-400"
          >
            <Library className="w-4 h-4 mr-2" /> My Generations
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Preview Section */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl transition-all">
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  {projectData?.generatedVideo ? (
                    <>
                      <Video className="w-3 h-3 text-blue-400" /> AI Cinematic
                      Render
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3 text-purple-400" /> Master
                      Image
                    </>
                  )}
                </span>
                {projectData?.generatedVideo && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 backdrop-blur-md border border-blue-500/30 flex items-center gap-2">
                    <Music className="w-3 h-3" /> Audio Active
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center min-h-[500px] bg-neutral-900/50 relative">
                {!projectData?.generatedVideo ? (
                  <img
                    src={projectData?.generatedImage}
                    className={`w-full h-full max-h-[600px] object-contain transition-all duration-1000 ${isGenerating ? "blur-md opacity-50 scale-95" : "blur-0 opacity-100 scale-100"}`}
                    alt="Preview"
                  />
                ) : (
                  <video
                    key={projectData.generatedVideo}
                    src={projectData.generatedVideo}
                    autoPlay
                    loop
                    controls
                    className="w-full h-full max-h-[600px] object-contain shadow-2xl"
                  />
                )}

                {isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-4 bg-black/20 backdrop-blur-sm">
                    <div className="relative">
                      <Waves className="w-12 h-12 text-blue-400 animate-pulse" />
                      <Sparkles className="w-5 h-5 text-white absolute -top-1 -right-1 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-medium text-white italic">
                        Creating your masterpiece...
                      </h4>
                      <p className="text-slate-300 text-sm max-w-xs mx-auto leading-relaxed opacity-80">
                        Take a deep breath. Our AI is currently weaving motion
                        and light into your image. This usually takes about
                        30-60 seconds.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Action Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Project Assets
              </h1>
              <p className="text-slate-400 leading-relaxed">
                Your high-fidelity assets are ready for export. You can download
                the static image or generate a cinematic video sequence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() =>
                  handleDownload(
                    projectData?.generatedImage!,
                    `image-${projectId}.png`,
                  )
                }
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-12"
              >
                <ImageIcon className="w-4 h-4 mr-2 text-purple-400" />
                Save Image
              </Button>

              <Button
                disabled={!projectData?.generatedVideo}
                onClick={() =>
                  handleDownload(
                    projectData?.generatedVideo!,
                    `video-${projectId}.mp4`,
                  )
                }
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-12 disabled:opacity-30"
              >
                <Download className="w-4 h-4 mr-2 text-blue-400" />
                Save Video
              </Button>
            </div>

            <hr className="border-white/5" />

            {/* AI Call-to-Action Card */}
            <div
              className={`relative overflow-hidden rounded-2xl border transition-all duration-500 p-6 ${
                projectData?.generatedVideo
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-blue-500/20 bg-blue-500/5 shadow-[0_0_30px_rgba(37,99,235,0.05)]"
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-xl ${
                    projectData?.generatedVideo
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                    {projectData?.generatedVideo
                      ? "Video Generation Complete"
                      : "Animate with AI"}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {projectData?.generatedVideo
                      ? "Your cinematic video has been rendered successfully and is ready for use."
                      : "Turn this static image into a high-end commercial video with one click."}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleGeneratevideo}
                disabled={isGenerating || !!projectData?.generatedVideo}
                className={`w-full mt-6 h-12 text-sm font-bold transition-all duration-500 ${
                  !projectData?.generatedVideo
                    ? "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Almost {formatTime(timeLeft)} to generate
                  </span>
                ) : projectData?.generatedVideo ? (
                  "Render Successful"
                ) : (
                  "Generate AI Video"
                )}
              </Button>
            </div>

            <p className="text-[10px] text-center text-slate-600 uppercase tracking-[0.2em]">
              Enterprise Grade AI Rendering
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;