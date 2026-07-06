import { Play, ShareFat } from '@phosphor-icons/react'
import './ListenPage.css'

// Podcast cover art — Unsplash photos as stable placeholder artwork
const imgSeries1 = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&q=80'
const imgSeries2 = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&q=80'
const imgSeries3 = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80'
const imgSeries4 = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80'
const imgSeries5 = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&q=80'
const imgSeries6 = 'https://images.unsplash.com/photo-1580900461591-10df8d3e1e6e?w=200&q=80'

const SERIES = [
  { id: 1, image: imgSeries1, title: 'The Journal.' },
  { id: 2, image: imgSeries2, title: 'Opinion: Potomac Watch' },
  { id: 3, image: imgSeries3, title: 'Your Money Briefing' },
  { id: 4, image: imgSeries4, title: 'Tech News Briefing' },
  { id: 5, image: imgSeries5, title: "What's News" },
  { id: 6, image: imgSeries6, title: 'Opinion: Free Expression' },
]

const EPISODES = [
  {
    id: 1,
    series: 'The Journal.',
    bgColor: '#694a7d',
    artImage: imgSeries5,
    headline: 'The Federal Reserve Signals Rates Will Stay Higher for Longer',
    duration: '24:11',
    date: 'Nov. 13',
  },
  {
    id: 2,
    series: 'Opinion: Potomac Watch',
    bgColor: '#1a3a6b',
    artImage: imgSeries2,
    headline: "Trump's First 100 Days and What Comes Next for American Policy",
    duration: '31:08',
    date: 'Nov. 13',
  },
  {
    id: 3,
    series: 'Your Money Briefing',
    bgColor: '#1a6b6b',
    artImage: imgSeries3,
    headline: 'What Rising Credit Card Delinquencies Mean for Your Finances',
    duration: '18:22',
    date: 'Nov. 12',
  },
]

export default function ListenPage() {
  return (
    <div className="listen-page">

      {/* ── All Podcasts ─────────────────────────────── */}
      <div className="listen-section-header">
        <span className="listen-strap">All Podcasts</span>
      </div>
      <div className="listen-series-outer">
        <div className="listen-series-scroll">
          {SERIES.map(s => (
            <div key={s.id} className="listen-series-item">
              <div className="listen-series-img-wrap">
                <img src={s.image} alt={s.title} className="listen-series-img" />
              </div>
              <span className="listen-series-title">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Spacer ───────────────────────────────────── */}
      <div className="listen-spacer" />

      {/* ── Latest Episodes ──────────────────────────── */}
      <div className="listen-section-header">
        <span className="listen-strap">Latest Episodes</span>
      </div>

      {EPISODES.map((ep, i) => (
        <div key={ep.id} className={`listen-card${i > 0 ? ' listen-card--border' : ''}`}>

          {/* Flashline */}
          <div className="listen-card-flashline-row">
            <span className="listen-card-flashline">Audio</span>
            <span className="listen-card-dot" />
            <span className="listen-card-flashline">{ep.series}</span>
          </div>

          {/* Artwork — coloured bg + centered square album art */}
          <div className="listen-card-inset">
            <div className="listen-card-inset-bg" style={{ background: ep.bgColor }}>
              <img src={ep.artImage} alt="" className="listen-card-art" />
            </div>
          </div>

          {/* Headline */}
          <h3 className="listen-card-headline">{ep.headline}</h3>

          {/* Footer */}
          <div className="listen-card-footer">
            <div className="listen-card-footer-left">
              <div className="listen-card-play-pill">
                <Play size={16} weight="fill" color="#222222" />
                <span className="listen-card-duration">{ep.duration}</span>
              </div>
              <span className="listen-card-date">{ep.date}</span>
            </div>
            <button className="listen-card-share-btn">
              <ShareFat size={24} color="#6f6f6f" weight="regular" />
            </button>
          </div>

        </div>
      ))}

      <div className="listen-bottom-pad" />
    </div>
  )
}
