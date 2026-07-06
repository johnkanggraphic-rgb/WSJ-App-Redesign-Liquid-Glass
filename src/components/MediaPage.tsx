import { useState, useRef, useEffect, useCallback } from 'react'
import { SpeakerHigh, SpeakerSlash, ClosedCaptioning, ShareFat, Play, Pause, MagnifyingGlass } from '@phosphor-icons/react'
import './MediaPage.css'
import StatusBar from './StatusBar'
import WatchPage from './WatchPage'
import ListenPage from './ListenPage'

const AV_TABS = ['Discover', 'Watch', 'Listen']

const VIDEOS = [
  'https://videos.pexels.com/video-files/2795405/2795405-uhd_1440_2560_25fps.mp4',
  'https://videos.pexels.com/video-files/7065825/7065825-uhd_1440_2560_24fps.mp4',
  'https://videos.pexels.com/video-files/15202164/15202164-uhd_1440_2560_30fps.mp4',
  'https://videos.pexels.com/video-files/35769386/15164839_1440_2560_25fps.mp4',
  'https://videos.pexels.com/video-files/34512144/14622718_1440_2560_25fps.mp4',
]


const H = 852

export default function MediaPage({ slidePos, onTabChange }: { slidePos?: 'left' | 'center' | 'right'; onTabChange?: (i: number) => void }) {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [paused, setPaused] = useState(false)
  const [showPlayPause, setShowPlayPause] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const playPauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idxRef = useRef(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const rafRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const dragging = useRef(false)
  const currentTranslate = useRef(0)

  const showNavBriefly = useCallback((isPaused: boolean) => {
    setNavVisible(true)
    if (navTimerRef.current) clearTimeout(navTimerRef.current)
    if (!isPaused) {
      navTimerRef.current = setTimeout(() => setNavVisible(false), 3000)
    }
  }, [])

  // Show nav whenever page becomes active, auto-hide after 3s
  useEffect(() => {
    if (slidePos === 'center') {
      setNavVisible(true)
      if (navTimerRef.current) clearTimeout(navTimerRef.current)
      navTimerRef.current = setTimeout(() => setNavVisible(false), 3000)
    }
    return () => { if (navTimerRef.current) clearTimeout(navTimerRef.current) }
  }, [slidePos])

  const trackProgress = useCallback(() => {
    const video = videoRefs.current[idxRef.current]
    if (video && video.duration > 0) {
      setProgress(video.currentTime / video.duration)
    }
    rafRef.current = requestAnimationFrame(trackProgress)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(trackProgress)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [trackProgress])

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === index) {
        v.currentTime = 0
        const tryPlay = () => v.play().catch(() => {})
        if (v.readyState >= 2) tryPlay()
        else v.addEventListener('canplay', tryPlay, { once: true })
      } else {
        v.pause()
        v.currentTime = 0
      }
    })
    setProgress(0)
  }, [index])

  const snapTo = (next: number) => {
    const clamped = Math.max(0, Math.min(VIDEOS.length - 1, next))
    idxRef.current = clamped
    setIndex(clamped)
    const target = -clamped * H
    currentTranslate.current = target
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      containerRef.current.style.transform = `translateY(${target}px)`
    }
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    startY.current = e.clientY
    e.currentTarget.setPointerCapture(e.pointerId)
    if (containerRef.current) {
      containerRef.current.style.transition = 'none'
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const delta = e.clientY - startY.current
    const base = -idxRef.current * H
    const atEdge = (idxRef.current === 0 && delta > 0) || (idxRef.current === VIDEOS.length - 1 && delta < 0)
    const y = base + delta * (atEdge ? 0.1 : 1)
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(${y}px)`
    }
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    dragging.current = false
    const delta = e.clientY - startY.current
    if (delta < -50) {
      snapTo(idxRef.current + 1)
    } else if (delta > 50) {
      snapTo(idxRef.current - 1)
      showNavBriefly(false)
    } else {
      snapTo(idxRef.current)
      // Tap — toggle pause
      const video = videoRefs.current[idxRef.current]
      if (video) {
        const nowPaused = !video.paused
        if (nowPaused) {
          video.pause()
          setPaused(true)
        } else {
          video.play().catch(() => {})
          setPaused(false)
        }
        setShowPlayPause(true)
        if (playPauseTimerRef.current) clearTimeout(playPauseTimerRef.current)
        if (!nowPaused) {
          playPauseTimerRef.current = setTimeout(() => setShowPlayPause(false), 1200)
        }
        showNavBriefly(nowPaused)
      }
    }
  }

  const isWatch = activeTab === 1
  const isListen = activeTab === 2
  const isLight = isWatch || isListen
  const navIconColor = isLight ? '#222' : '#fff'

  return (
    <div className={`media-page media-page--${slidePos ?? 'right'}${isLight ? ' media-page--light' : ''}`}
      onPointerDown={isLight ? undefined : onPointerDown}
      onPointerMove={isLight ? undefined : onPointerMove}
      onPointerUp={isLight ? undefined : onPointerUp}
      onPointerCancel={isLight ? undefined : onPointerUp}
    >
      {/* AV Navigation */}
      <div className={`av-nav${navVisible || isLight ? ' av-nav--visible' : ''}${isLight ? ' av-nav--light' : ''}`}>
        {!isLight && <div className="av-nav-gradient" />}
        <div className="av-nav-statusbar">
          <StatusBar transparent={!isLight} dark={isLight} />
        </div>
        <div className="av-nav-top-row">
          <div className="av-nav-leading" />
          <span className={`av-nav-title${isLight ? ' av-nav-title--light' : ''}`}>Media</span>
          <div className="av-nav-trailing">
            <button className="av-nav-icon-btn" style={{ opacity: 0, pointerEvents: 'none' }}>
              <MagnifyingGlass size={24} color={navIconColor} weight="regular" />
            </button>
          </div>
        </div>
        <div className="av-nav-tabs" onPointerDown={e => e.stopPropagation()}>
          {AV_TABS.map((tab, i) => (
            <button
              key={tab}
              className={`av-tab${activeTab === i ? ' av-tab--active' : ''}${isLight ? ' av-tab--light' : ''}`}
              onClick={e => { e.stopPropagation(); setActiveTab(i); onTabChange?.(i) }}
            >
              {tab}
            </button>
          ))}
        </div>
        {isLight && <div className="av-nav-tab-divider" />}
      </div>

      {/* Watch page content */}
      {isWatch && (
        <div className="media-watch-scroll">
          <WatchPage />
        </div>
      )}

      {/* Listen page content */}
      {isListen && (
        <div className="media-watch-scroll">
          <ListenPage />
        </div>
      )}

      {/* Play/Pause tap feedback — only in video mode */}
      {!isLight && (
        <div className={`media-playpause${showPlayPause ? ' media-playpause--visible' : ''}`}>
          {paused
            ? <Play size={28} color="white" weight="fill" />
            : <Pause size={28} color="white" weight="fill" />
          }
        </div>
      )}

      {/* Video stack — only in video mode */}
      {!isLight && (
        <div
          ref={containerRef}
          className="media-video-stack"
          style={{ transform: `translateY(0px)` }}
        >
          {VIDEOS.map((src, i) => (
            <div key={i} className="media-video-slide" style={{ top: i * H }}>
              <video
                ref={el => { videoRefs.current[i] = el }}
                src={src}
                autoPlay={i === 0}
                muted={muted}
                loop
                playsInline
                preload="auto"
                draggable={false}
                className="media-video"
              />
            </div>
          ))}
        </div>
      )}

      {/* Side icons — only in video mode */}
      {!isLight && (
        <div className="media-side-icons">
          <button className="media-icon-btn" onClick={() => setMuted(m => !m)}>
            {muted
              ? <SpeakerSlash size={16} color="white" weight="fill" />
              : <SpeakerHigh size={16} color="white" weight="fill" />
            }
          </button>
          <button className="media-icon-btn">
            <ClosedCaptioning size={16} color="white" weight="fill" />
          </button>
          <button className="media-icon-btn">
            <ShareFat size={16} color="white" weight="regular" />
          </button>
        </div>
      )}

      {/* Blur + gradient at bottom — only in video mode */}
      {!isLight && <div className="media-bottom-blur" />}
      {!isLight && <div className="media-bottom-gradient" />}

      {/* Closed captions — only in video mode */}
      {!isLight && (
        <div className="media-cc">
          <span>Federal Reserve officials signaled they remain in</span>
          <span>no rush to cut interest rates this year.</span>
        </div>
      )}

      {/* Progress bar — only in video mode */}
      {!isLight && (
        <div className="media-progress-track">
          <div className="media-progress-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      )}
    </div>
  )
}
