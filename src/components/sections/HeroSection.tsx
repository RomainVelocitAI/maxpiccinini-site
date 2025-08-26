'use client'

import { Container } from '@/components/atoms/Container'
import { ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { trackConversion } from '@/lib/abTesting'
import { trackCTAClick } from '@/lib/analytics'
import { createPortal } from 'react-dom'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoEncartRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLIFrameElement>(null)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(392) // 6:32 in seconds
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  
  // Create portal root on mount
  useEffect(() => {
    setPortalRoot(document.body)
  }, [])
  
  // Update current time when video is playing
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, duration])
  
  // Track scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Video encart animations based on scroll
  // Phase 1 (0-30%): La vidéo grandit et se déplace vers le centre
  // Phase 2 (30-60%): La vidéo est en plein écran et reste fixe
  // Phase 3 (60-80%): La vidéo disparaît avec un fade out
  
  // Scale: de 1 à 5 pour remplir l'écran sans déborder
  const videoScale = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.6, 0.65], 
    [1, 2.5, 5, 5, 5]
  )
  
  // Position X: Centrage avec transform-origin center
  // On doit déplacer la vidéo du coin vers le centre de l'écran
  // Distance depuis right-8 jusqu'au centre: ~(window.width/2 - 320/2 - 32)
  const videoX = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.6], 
    ['0px', '-400px', '-800px', '-800px']
  )
  
  // Position Y: Centrage avec transform-origin center
  // Distance depuis bottom-8 jusqu'au centre: ~(window.height/2 - 192/2 - 32)
  const videoY = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.6], 
    ['0px', '-200px', '-400px', '-400px']
  )
  
  // Border radius: de arrondi à rectangulaire
  const videoBorderRadius = useTransform(scrollYProgress, [0, 0.2, 0.3], [8, 4, 0])
  
  // Opacity: reste visible jusqu'à 60% puis disparaît rapidement
  const videoOpacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [1, 1, 0])
  
  // Z-index: passe au-dessus de tout (y compris le header z-50) puis disparaît
  const videoZIndex = useTransform(scrollYProgress, [0, 0.1, 0.75, 0.8], [20, 9999, 9999, -1])
  
  // Label opacity for "PROCHAIN ÉVÉNEMENT"
  const labelOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  
  // Text animations
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const scrollToAudit = () => {
    // Track CTA click
    trackCTAClick('Découvrir comment', 'hero_section')
    trackConversion('hero_cta_v1', 'click')
    
    const element = document.getElementById('audit')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // Pause the video
        videoRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      } else {
        // Play the video
        videoRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*')
      } else {
        videoRef.current.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*')
      }
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = Math.floor(duration * percentage)
    
    setCurrentTime(newTime)
    
    if (videoRef.current) {
      // Seek to specific time in YouTube video
      videoRef.current.contentWindow?.postMessage(
        `{"event":"command","func":"seekTo","args":[${newTime}, true]}`,
        '*'
      )
    }
  }

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      {/* Text Content Section - Fixed during initial scroll */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background avec image de Max et overlay bleu comme Tony Robbins */}
        <div className="absolute inset-0">
          {/* Image de Max en plein écran */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/max-hero-bg.jpg')`,
              backgroundPosition: '60% center',
              backgroundSize: 'cover',
            }}
          />
          {/* Overlay très léger juste pour assurer la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        {/* Subtle animated background particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Hero Text Content */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 w-full"
        >
          <Container>
            <div className="h-screen flex items-end pb-20">
              <div className="max-w-2xl flex flex-col items-start justify-end space-y-8">
              {/* Headline avec mix de polices */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight"
              >
                <span className="text-white block">
                  Votre entreprise
                </span>
                <span className="text-white block">
                  a besoin de vous.
                </span>
                <span className="block mt-4 text-white/90 text-3xl md:text-4xl lg:text-5xl font-montserrat font-normal">
                  C'est le problème.
                </span>
              </motion.h1>

              {/* CTA Button avec équilibre parfait */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <button
                  onClick={scrollToAudit}
                  className="group relative px-8 py-4 bg-white text-[#0046FF] font-montserrat font-semibold text-base rounded-full hover:bg-white/90 transition-all duration-300 shadow-xl"
                >
                  <span className="flex items-center gap-2">
                    Découvrez la méthode
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="pt-12"
              >
                <div className="flex flex-col items-start gap-3">
                  <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
                    <div className="w-1 h-2 bg-white rounded-full animate-bounce mx-auto" />
                  </div>
                  <span className="text-sm text-white/70 font-montserrat tracking-wide">Voir la méthode</span>
                </div>
              </motion.div>
              </div>
            </div>
          </Container>
        </motion.div>
        
        {/* Video encart en bas à droite comme Tony Robbins */}
        {portalRoot && createPortal(
          <motion.div 
            ref={videoEncartRef}
            className="fixed bottom-8 right-8"
            style={{
              scale: videoScale,
              x: videoX,
              y: videoY,
              transformOrigin: 'center center',
              opacity: videoOpacity,
              zIndex: 99999,
              pointerEvents: scrollYProgress.get() > 0.7 ? 'none' : 'auto'
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative w-80 h-48 bg-black overflow-hidden shadow-2xl"
              style={{
                borderRadius: videoBorderRadius
              }}
            >
            {/* YouTube iframe */}
            <iframe
              ref={videoRef}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/5YtRgbCsy2M?enablejsapi=1&mute=${isMuted ? 1 : 0}&autoplay=0&controls=0&showinfo=0&rel=0&loop=1&playlist=5YtRgbCsy2M&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
              title="Max Piccinini - Méthode MAXIMIZER"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            
            {/* Custom overlay with controls */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
              >
                <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-colors">
                  <Play className="w-6 h-6 text-red-600 ml-1" />
                </div>
              </div>
            )}
            
            {/* Custom video controls bar */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex items-center px-3 gap-2">
              {/* Play/Pause button */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white ml-0.5" />
                )}
              </button>
              
              {/* Progress bar */}
              <div 
                className="flex-1 h-6 flex items-center cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div className="w-full h-1 bg-white/40 rounded-full overflow-hidden group-hover:h-1.5 transition-all">
                  <div 
                    className="h-full bg-red-600 rounded-full relative transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
              
              {/* Time display */}
              <span className="text-white text-xs font-medium min-w-[65px] text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              
              {/* Volume button */}
              <button
                onClick={toggleMute}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
            
            <motion.div 
              className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold"
              style={{
                opacity: labelOpacity
              }}
            >
              PROCHAIN ÉVÉNEMENT
            </motion.div>
          </motion.div>
        </motion.div>,
        portalRoot
      )}
      </div>

      {/* Video Section - Scales up on scroll */}
      <div ref={videoContainerRef} className="sticky top-0 h-screen flex items-center justify-center pointer-events-none hidden">
        <motion.div
          style={{
            scale: videoScale,
            borderRadius: videoBorderRadius,
          }}
          className="relative w-full h-full max-w-5xl mx-auto overflow-hidden shadow-2xl"
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/5YtRgbCsy2M?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=5YtRgbCsy2M&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1`}
            title="Max Piccinini - Méthode MAXIMIZER"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Overlay gradients to hide YouTube UI */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}