import { CaretLeft, DownloadSimple } from '@phosphor-icons/react'
import StatusBar from './StatusBar'
import './PrintEditionPage.css'

const imgCover     = '/assets/print-edition-cover.png'
const imgEdition1  = '/assets/print-edition-1.png'
const imgEdition2  = '/assets/print-edition-2.png'
const imgEdition3  = '/assets/print-edition-3.png'

const EDITIONS = [
  { date: 'April 14, 2026', img: imgCover    },
  { date: 'April 13, 2026', img: imgCover    },
  { date: 'April 12, 2026', img: imgCover    },
  { date: 'April 11, 2026', img: imgEdition1 },
  { date: 'April 10, 2026', img: imgEdition2 },
  { date: 'April 9, 2026',  img: imgEdition3 },
]

export default function PrintEditionPage({ visible, onBack, onReadTap }: {
  visible: boolean
  onBack: () => void
  onReadTap?: () => void
}) {
  return (
    <div className={`pe-page${visible ? ' pe-page--visible' : ''}`}>
      <StatusBar transparent />

      <div className="pe-top-blur" />
      <div className="pe-top-gradient" />

      {/* Floating toolbar */}
      <div className="pe-toolbar">
        <div className="pe-toolbar-leading" />
        <span className="pe-toolbar-title">Print Edition</span>
        <div className="pe-toolbar-trailing" />
      </div>

      {/* Scroll content */}
      <div className="pe-scroll">

        {/* Hero dark card */}
        <div className="pe-hero-card">
          <div className="pe-hero-body">
            <p className="pe-hero-headline">Today's Edition</p>
            <span className="pe-hero-date">April 15, 2026</span>
          </div>
          <div className="pe-hero-image-wrap">
            <img src={imgCover} alt="Today's Edition" className="pe-hero-cover-img" />
          </div>
          <div className="pe-hero-btns">
            <button className="pe-btn pe-btn--solid" onClick={onReadTap}>Read</button>
            <button className="pe-btn pe-btn--outline">Download</button>
          </div>
        </div>

        {/* Recent Editions */}
        <div className="pe-section-header">
          <span className="pe-section-strap">RECENT EDITIONS</span>
          <span className="pe-download-all">Download All</span>
        </div>

        <div className="pe-editions-list">
          {EDITIONS.map((ed, i) => (
            <div key={i} className="pe-edition-row">
              <div className="pe-edition-thumb">
                <img src={ed.img} alt={ed.date} />
              </div>
              <div className="pe-edition-info">
                <span className="pe-edition-date">{ed.date}</span>
              </div>
              <button className="pe-edition-dl-btn">
                <DownloadSimple size={22} weight="regular" color="#6f6f6f" />
              </button>
            </div>
          ))}
        </div>

        <div className="pe-bottom-pad" />
      </div>

      {/* Bottom back button */}
      <div className="pe-bottom-bar">
        <button className="notif-back-btn" onClick={onBack}>
          <div className="notif-back-glass">
            <CaretLeft size={20} weight="bold" color="#222" />
          </div>
        </button>
      </div>
    </div>
  )
}
