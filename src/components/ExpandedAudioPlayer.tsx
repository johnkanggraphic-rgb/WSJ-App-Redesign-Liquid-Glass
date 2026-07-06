import { CaretDown, SkipBack, SkipForward, Pause, ArrowCounterClockwise, ClockCountdown, ShareFat, Play } from '@phosphor-icons/react'
import './ExpandedAudioPlayer.css'

const imgAlbum = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80'

interface Props {
  visible: boolean
  onClose: () => void
  info: { flashline: string; headline: string }
}

const episodes = [
  { date: 'Oct. 31', duration: '3:20', headline: 'Judge Rules Google Operates Illegal Ad Monopoly',             img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80' },
  { date: 'Oct. 30', duration: '3:20', headline: 'Fed Officials Signal No Rush to Cut Rates Despite Cooling Inflation', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80' },
  { date: 'Oct. 29', duration: '3:20', headline: 'Ukraine Strikes Russian Oil Depot Deep Inside Enemy Territory', img: 'https://images.unsplash.com/photo-1580902394724-b08ff42e8c93?w=200&q=80' },
  { date: 'Oct. 29', duration: '3:20', headline: 'Boeing Reaches $1.1 Billion Settlement With Families of 737 MAX Victims', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&q=80' },
  { date: 'Oct. 29', duration: '3:20', headline: 'The A.I. Arms Race Moves to the Data Center',                img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&q=80' },
]

export default function ExpandedAudioPlayer({ visible, onClose, info }: Props) {
  return (
    <div className={`exp-player${visible ? ' exp-player--visible' : ''}`}>
      {/* Top nav */}
      <div className="exp-nav">
        <div className="exp-nav-leading">
          <button className="exp-nav-btn" onClick={onClose}>
            <div className="exp-nav-glass">
              <CaretDown size={20} color="#222" weight="bold" />
            </div>
          </button>
        </div>
        <span className="exp-nav-title" />
        <div className="exp-nav-trailing" />
      </div>

      <div className="exp-scroll">
        {/* Main player block */}
        <div className="exp-main">
          {/* Album art */}
          <div className="exp-art-wrap">
            <div className="exp-art">
              <img src={imgAlbum} alt="podcast art" />
            </div>
          </div>

          {/* Controls */}
          <div className="exp-controls">
            {/* Flashline + headline + timestamp */}
            <div className="exp-flashline-row">
              <span className="exp-flashline">Podcast</span>
              <div className="exp-dot" />
              <span className="exp-flashline">What's News</span>
            </div>
            <p className="exp-headline">{info.headline || 'Judge Rules Google Operates Illegal Ad Monopoly'}</p>
            <p className="exp-timestamp">Oct. 31, 2025 4:37 pm ET</p>

            {/* Timeline */}
            <div className="exp-timeline">
              <div className="exp-track-wrap">
                <div className="exp-track-bg">
                  <div className="exp-track-fill" />
                </div>
                <div className="exp-thumb-wrap">
                  <div className="exp-track-indicator" />
                  <div className="exp-thumb" />
                </div>
              </div>
              <div className="exp-time-row">
                <span className="exp-time">00:30</span>
                <span className="exp-time">01:00</span>
              </div>
            </div>

            {/* Transport controls */}
            <div className="exp-player-controls">
              <button className="exp-ctrl-btn">
                <SkipBack size={32} color="#222" weight="fill" />
              </button>
              <button className="exp-ctrl-btn">
                <ArrowCounterClockwise size={32} color="#222" weight="bold" />
              </button>
              <button className="exp-pause-btn">
                <Pause size={24} color="#fff" weight="fill" />
              </button>
              <button className="exp-ctrl-btn">
                <ArrowCounterClockwise size={32} color="#222" weight="bold" style={{ transform: 'scaleX(-1)' }} />
              </button>
              <button className="exp-ctrl-btn">
                <SkipForward size={32} color="#222" weight="fill" />
              </button>
            </div>

            {/* Action bar */}
            <div className="exp-action-bar">
              <button className="exp-action-btn-text">1x</button>
              <button className="exp-action-btn-icon">
                <ClockCountdown size={24} color="#222" />
              </button>
              <button className="exp-action-btn-icon exp-action-btn-icon--share">
                <ShareFat size={24} color="#222" />
              </button>
            </div>
          </div>
        </div>

        <div className="exp-spacer-8" />

        {/* About section */}
        <div className="exp-section">
          <div className="exp-section-header">
            <span className="exp-section-title">About this episode</span>
          </div>
          <p className="exp-about-body">
            Episode description: lorem ipsum, headline ipsum dolor sit amet consectetur. Eleifend odio.
          </p>
          <div className="exp-host-wrap">
            <div>
              <div className="exp-host-name">Hardika Singh</div>
              <div className="exp-host-role">Co-host</div>
            </div>
            <div>
              <div className="exp-host-name">Hardika Singh</div>
              <div className="exp-host-role">Co-host</div>
            </div>
          </div>
        </div>

        <div className="exp-spacer-8" />

        {/* Most Popular episodes */}
        <div className="exp-section">
          <div className="exp-section-header">
            <span className="exp-section-title">Most Popular</span>
          </div>
          {episodes.map((ep, i) => (
            <div key={i}>
              <div className="exp-episode-card">
                <div className="exp-episode-card-row">
                  <div className="exp-episode-text">
                    <div className="exp-flashline-row">
                      <span className="exp-flashline">Podcast</span>
                      <div className="exp-dot" />
                      <span className="exp-flashline">Series</span>
                    </div>
                    <p className="exp-episode-headline">{ep.headline}</p>
                  </div>
                  <div className="exp-episode-img-wrap">
                    <img src={ep.img} alt="" />
                  </div>
                </div>
                <div className="exp-episode-footer">
                  <div className="exp-episode-footer-left">
                    <div className="exp-play-pill">
                      <Play size={16} color="#222" weight="fill" />
                      <span className="exp-play-pill-text">{ep.duration}</span>
                    </div>
                    <span className="exp-episode-date">{ep.date}</span>
                  </div>
                  <button className="exp-episode-share-btn exp-episode-share-btn--colored">
                    <ShareFat size={24} color="#222" />
                  </button>
                </div>
              </div>
              {i < episodes.length - 1 && <div className="exp-divider" />}
            </div>
          ))}
          <div className="exp-bottom-pad" />
        </div>
      </div>
    </div>
  )
}
