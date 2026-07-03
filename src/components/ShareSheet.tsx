import { useState } from 'react'
import './ShareSheet.css'
import { X } from '@phosphor-icons/react'
import NativeShareSheet from './NativeShareSheet'

const imgHero     = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'
const imgEmail    = 'https://www.figma.com/api/mcp/asset/53d15a72-78d5-44b6-9769-83aef97c229d'
const imgMessage  = 'https://www.figma.com/api/mcp/asset/ba77d48d-55cd-4602-9e70-1959855fdd8f'
const imgXLogo    = 'https://www.figma.com/api/mcp/asset/bdc07f4a-d3ef-4fc9-a6d9-2d1350688d1a'
const imgInstagram= 'https://www.figma.com/api/mcp/asset/10c25830-eacf-4b38-b07b-3ba2c0af4d6d'
const imgLinkedin = 'https://www.figma.com/api/mcp/asset/d5b369de-24f3-49cf-8dea-ad0a572d71b3'
const imgMore     = 'https://www.figma.com/api/mcp/asset/382b761d-7417-4712-91a3-c02fb61fd480'

const SHARE_ACTIONS = [
  { src: imgEmail,     label: 'Email' },
  { src: imgMessage,   label: 'Message' },
  { src: imgXLogo,     label: 'X' },
  { src: imgInstagram, label: 'Instagram' },
  { src: imgLinkedin,  label: 'Linkedin' },
  { src: imgMore,      label: 'More' },
]

export default function ShareSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [nativeVisible, setNativeVisible] = useState(false)

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
            <p className="share-article-headline">Judge Rules Google Operates Illegal Ad Monopoly</p>
            <img src={imgHero} alt="" className="share-article-img" />
          </div>

          {/* Share actions */}
          <div className="share-actions-row">
            {SHARE_ACTIONS.map(({ src, label }) => (
              <div key={label} className="share-action-item">
                <button
                  className="share-action-btn"
                  onClick={label === 'More' ? () => setNativeVisible(true) : undefined}
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
