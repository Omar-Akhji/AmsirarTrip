import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const VideoSection = () => {
    const { t } = useTranslation();
    const [videoError, setVideoError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    // Use a smaller video or poster for development
    const videoSrc = "/videos/Video-Web.webm"; // Enable video in both dev and prod

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, []);

    const handleVideoError = () => {
        console.error('Video failed to load');
        setVideoError(true);
        setIsLoading(false);
    };

    const handleVideoLoad = () => {
        console.log('Video loaded successfully');
        setIsLoading(false);
        setVideoLoaded(true);
    };

    const handleVideoLoadStart = () => {
        console.log('Video load started');
    };

    const handleVideoProgress = () => {
        console.log('Video loading progress');
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
        <section id="video">
            <div className="video-wrapper flex" style={{
                backgroundImage: 'url(/images/header-1.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh' // or appropriate height
            }}>
                {videoError ? (
                    <div
                        className="video-fallback"
                        style={{
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff' }}>
                            <h3>{t('video.fallback.title')}</h3>
                            <p>{t('video.fallback.subtitle')}</p>
                            <p>{t('video.fallback.cta')}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {isLoading && !videoLoaded && (
                            <div className="video-loading">
                                <div style={{ textAlign: 'center' }}>
                                    <p>{t('video.loading')}</p>
                                    <div className="loading-spinner"></div>
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
                            onLoadStart={handleVideoLoadStart}
                            onProgress={handleVideoProgress}
                            onEnded={handleVideoEnd}
                            preload="metadata"
                            style={{ display: videoLoaded ? 'block' : 'none' }}
                        >
                            <source src={videoSrc} type="video/webm" />
                            {t('video.unsupported')}
                        </video>
                        {videoLoaded && !isPlaying && (
                            <div
                                className="video-play-overlay"
                                onClick={handlePlay}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <button
                                    className="play-button"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        border: '3px solid #e54a1f',
                                        borderRadius: '50%',
                                        width: '80px',
                                        height: '80px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <img src="/icons/play-video_icon.svg" alt="Play Video" style={{ width: '40px', height: '40px' }} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default VideoSection;