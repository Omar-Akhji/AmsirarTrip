"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { m } from "motion/react";
import { useTranslation } from "@/lib/hooks/useTranslation";

const VideoSection = () => {
  const { t } = useTranslation();
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Use a web-safe filename (renamed in public/videos)
  const videoSrc = "/videos/Morocco-Video.mp4";

  useEffect(() => {
    if (videoRef.current) videoRef.current.load();
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };
  const handleVideoLoad = () => {
    setIsLoading(false);
    setVideoLoaded(true);
  };
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section
      id="video"
      className="relative w-full overflow-hidden py-4 text-white sm:py-6 lg:py-8"
    >
      <div className="container">
        <div className="relative mx-auto w-full">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative h-[55vh] w-full overflow-hidden rounded-[34px] bg-slate-900 p-3 shadow-2xl sm:h-[65vh] lg:h-[75vh] xl:h-[85vh]"
          >
            {videoError ? (
              <div className="flex h-full items-center justify-center rounded-[26px] bg-[url(/images/header-1.webp)] bg-cover bg-center px-8 py-12 text-center">
                <div className="rounded-3xl bg-black/60 p-8">
                  <h3 className="text-2xl font-semibold">
                    {t("video.fallback.title")}
                  </h3>
                  <p className="mt-3 text-sm text-white/80">
                    {t("video.fallback.subtitle")}
                  </p>
                  <p className="mt-4 text-xs tracking-[0.35em] text-orange-300 uppercase">
                    {t("video.fallback.cta")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full">
                {isLoading && !videoLoaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[26px] bg-slate-950/60">
                    <div className="space-y-3 text-center">
                      <p className="text-sm tracking-[0.4em] text-orange-200 uppercase">
                        {t("video.loading")}
                      </p>
                      <div className="mx-auto size-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    </div>
                  </div>
                )}
                <video
                  ref={videoRef}
                  loop
                  muted
                  playsInline
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                  onEnded={handleVideoEnd}
                  onClick={() => {
                    if (videoRef.current) {
                      if (videoRef.current.paused) {
                        videoRef.current.play();
                        setIsPlaying(true);
                      } else {
                        videoRef.current.pause();
                        setIsPlaying(false);
                      }
                    }
                  }}
                  preload="metadata"
                  className={`h-full w-full cursor-pointer rounded-[26px] object-cover ${
                    videoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <source src={videoSrc} type="video/mp4" />
                  {t("video.unsupported")}
                </video>
                {videoLoaded && !isPlaying && (
                  <button
                    type="button"
                    className="absolute inset-0 z-10 flex items-center justify-center rounded-[26px] bg-black/40 text-white transition hover:bg-black/50"
                    onClick={handlePlay}
                  >
                    <span className="inline-flex size-20 items-center justify-center rounded-full border border-white/60 bg-white/90 text-slate-900 shadow-lg">
                      <Image
                        src="/icons/play-video_icon.svg"
                        alt="Play Video"
                        width={32}
                        height={32}
                        className="size-8"
                      />
                    </span>
                  </button>
                )}
              </div>
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
