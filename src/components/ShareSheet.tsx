import { useState, useRef, useEffect } from 'react'
import './ShareSheet.css'
import { X } from '@phosphor-icons/react'
import NativeShareSheet from './NativeShareSheet'

const imgHero     = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'
const SHARE_ACTIONS = [
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%230a84ff'/%3E%3Crect x='12' y='16' width='36' height='28' rx='5' fill='white'/%3E%3Cpath d='M12 21 L30 32 L48 21' stroke='%230a84ff' strokeWidth='2.5' fill='none'/%3E%3C/svg%3E", label: 'Email' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%2334c759'/%3E%3Crect x='12' y='16' width='36' height='28' rx='5' fill='white'/%3E%3Cpath d='M12 21 L30 32 L48 21' stroke='%2334c759' strokeWidth='2.5' fill='none'/%3E%3C/svg%3E", label: 'Message' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%23000000'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='white' font-size='28' font-weight='bold' font-family='Arial'%3EX%3C/text%3E%3C/svg%3E", label: 'X' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3CdeFsTyle%3E%3C/defs%3E%3Crect width='60' height='60' rx='14' fill='url(%23ig)'/%3E%3ClinearGradient id='ig' x1='0' y1='1' x2='1' y2='0'%3E%3Cstop offset='0%25' stop-color='%23f09433'/%3E%3Cstop offset='25%25' stop-color='%23e6683c'/%3E%3Cstop offset='50%25' stop-color='%23dc2743'/%3E%3Cstop offset='75%25' stop-color='%23cc2366'/%3E%3Cstop offset='100%25' stop-color='%23bc1888'/%3E%3C/linearGradient%3E%3Ccircle cx='30' cy='30' r='12' fill='none' stroke='white' strokeWidth='2.5'/%3E%3Ccircle cx='30' cy='30' r='4' fill='white'/%3E%3Ccircle cx='40' cy='20' r='2' fill='white'/%3E%3C/svg%3E", label: 'Instagram' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%230077b5'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='central' text-anchor='middle' fill='white' font-size='22' font-weight='bold' font-family='Arial'%3Ein%3C/text%3E%3C/svg%3E", label: 'LinkedIn' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%23e5e5ea'/%3E%3Ccircle cx='20' cy='30' r='5' fill='%23555'/%3E%3Ccircle cx='30' cy='30' r='5' fill='%23555'/%3E%3Ccircle cx='40' cy='30' r='5' fill='%23555'/%3E%3C/svg%3E", label: 'More' },
]

export default function ShareSheet({ visible, onClose, headline, heroImage }: {
  visible: boolean
  onClose: () => void
  headline?: string
  heroImage?: string
}) {
  const [nativeVisible, setNativeVisible] = useState(false)
  const actionsRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible && actionsRowRef.current) {
      actionsRowRef.current.scrollLeft = 0
    }
  }, [visible])

  return (
    <>
      <div className={`share-sheet-scrim${visible ? ' share-sheet-scrim--visible' : ''}`} onClick={onClose} />
      <div className={`share-sheet${visible ? ' share-sheet--visible' : ''}`}>
        {/* Toolbar */}
        <div className="share-sheet-toolbar">
          <div className="share-sheet-grabber" />
          <div className="share-sheet-toolbar-row">
            <span className="share-sheet-title">Share</span>
            <button className="share-sheet-close-btn" onClick={onClose}>
              <div className="share-sheet-close-glass">
                <X size={20} weight="bold" color="#222" />
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="share-sheet-content">
          {/* Article card */}
          <div className="share-article-card">
            <p className="share-article-headline">{headline ?? 'Judge Rules Google Operates Illegal Ad Monopoly'}</p>
            <img src={heroImage ?? imgHero} alt="" className="share-article-img" />
          </div>

          {/* Share actions */}
          <div className="share-actions-row" ref={actionsRowRef}>
            {SHARE_ACTIONS.map(({ src, label }) => (
              <div key={label} className="share-action-item">
                <button
                  className="share-action-btn"
                  onClick={label === 'More' ? () => { setNativeVisible(true); onClose() } : undefined}
                >
                  <img src={src} alt={label} className="share-action-icon" />
                </button>
                <span className="share-action-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NativeShareSheet visible={nativeVisible} onClose={() => setNativeVisible(false)} />
    </>
  )
}
