import { useState, useRef } from 'react'
import { Headphones, MinusCircle, CaretUp } from '@phosphor-icons/react'
import './MyWSJShortlist.css'

const imgCard1 = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80"
const imgCard2 = "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=200&q=80"
const imgCard3 = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80"
const imgCard4 = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80"
const imgCard5 = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80"

export type StoryItem = {
  id: string
  flashline: string
  flashline2?: string
  headline: string
  date: string
  readTime: string
  image: string
  imageSize?: number
  opinion?: boolean
}

export const INITIAL_CURRENT: StoryItem[] = [
  { id: 'c1', flashline: 'U.S.', headline: 'Inside the Nightmare at 345 Park Avenue, a Manhattan Office Tower Under Attack', date: 'Nov. 13', readTime: '6 min read', image: imgCard1 },
  { id: 'c2', flashline: 'Opinion', flashline2: 'Mark Helprin', headline: "Trump's Tariff Deals With Japan and the EU, as His Aug. 1 Deadline Nears", date: 'Nov. 13', readTime: '6 min read', image: imgCard2, opinion: true },
  { id: 'c3', flashline: 'Economy', headline: 'ECB Must Not Exclude Any Policy Action, Says Villeroy', date: 'Nov. 13', readTime: '8 min read', image: imgCard3 },
]

const INITIAL_EXPIRED: StoryItem[] = [
  { id: 'e1', flashline: 'Technology', headline: "Five Things You Shouldn't Tell ChatGPT", date: 'Nov. 13', readTime: '3 min read', image: imgCard4, imageSize: 100 },
  { id: 'e2', flashline: 'Politics', headline: "Trump Lashes Out at Democrat for 'Lack of Loyalty' After Pardon", date: 'Nov. 13', readTime: '6 min read', image: imgCard5, imageSize: 100 },
]

type CardProps = StoryItem & { onRemove: () => void }

export function ShortlistCard({ flashline, flashline2, headline, date, readTime, image, imageSize = 72, opinion = false, onRemove }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleRemove = () => {
    const el = ref.current
    if (!el) return
    el.style.overflow = 'hidden'
    el.style.transition = 'max-height 0.3s ease, opacity 0.2s ease, padding 0.3s ease'
    el.style.maxHeight = el.offsetHeight + 'px'
    // Force reflow
    void el.offsetHeight
    el.style.maxHeight = '0'
    el.style.opacity = '0'
    el.style.paddingTop = '0'
    el.style.paddingBottom = '0'
    el.addEventListener('transitionend', onRemove, { once: true })
  }

  return (
    <div ref={ref} className={`sl-card${opinion ? ' sl-card--opinion' : ''}`}>
      <div className="sl-card-content">
        <div className="sl-card-text">
          <div className="sl-flashline-row">
            <span className={`sl-flashline${opinion ? ' sl-flashline--opinion' : ''}`}>{flashline}</span>
            {flashline2 && (
              <>
                <span className="sl-flashline-dot">·</span>
                <span className={`sl-flashline${opinion ? ' sl-flashline--opinion' : ''}`}>{flashline2}</span>
              </>
            )}
          </div>
          <div className="sl-space-8" />
          <h3 className="sl-headline">{headline}</h3>
        </div>
        <div className="sl-thumb-gap" />
        <div className="sl-thumb" style={{ width: imageSize, height: imageSize }}>
          <img src={image} alt="" />
        </div>
      </div>
      <div className="sl-space-8" />
      <div className="sl-footer">
        <div className="sl-footer-left">
          <span className="sl-date">{date}</span>
          <span className="sl-sep">·</span>
          <span className="sl-read-time">{readTime}</span>
        </div>
        <div className="sl-footer-right">
          <button className="sl-action-btn">
            <Headphones size={24} weight="regular" color="#6f6f6f" />
          </button>
          <button className="sl-action-btn" onClick={handleRemove}>
            <MinusCircle size={24} weight="fill" color="#222222" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MyWSJShortlist() {
  const [current, setCurrent] = useState(INITIAL_CURRENT)
  const [expired, setExpired] = useState(INITIAL_EXPIRED)

  return (
    <div className="sl-root">
      {/* Info bar */}
      <div className="sl-info-bar">
        <p className="sl-info-text">
          Stories expire a day after you add them.{' '}
          <span className="sl-info-link">Send us your feedback.</span>
        </p>
      </div>
      <div className="sl-divider" />

      {/* Listen to all */}
      <div className="sl-listen-row">
        <span className="sl-listen-label">Listen to all articles</span>
        <button className="sl-play-btn">
          <span className="sl-play-icon">▶</span>
          Play
        </button>
      </div>

      {/* Current section */}
      <div className="sl-section">
        {current.map((item, i) => (
          <div key={item.id}>
            {i > 0 && <div className="sl-divider" />}
            <ShortlistCard
              {...item}
              onRemove={() => setCurrent(prev => prev.filter(s => s.id !== item.id))}
            />
          </div>
        ))}
      </div>

      {/* 8px spacer */}
      <div className="sl-spacer" />

      {/* Expired section */}
      <div className="sl-section">
        <div className="sl-expired-header">
          <span className="sl-expired-title">Expired</span>
          <button className="sl-action-btn">
            <CaretUp size={16} weight="bold" color="#6f6f6f" />
          </button>
        </div>
        {expired.map((item, i) => (
          <div key={item.id}>
            {i > 0 && <div className="sl-divider" />}
            <ShortlistCard
              {...item}
              onRemove={() => setExpired(prev => prev.filter(s => s.id !== item.id))}
            />
          </div>
        ))}
      </div>

      <div className="sl-bottom-pad" />
    </div>
  )
}
