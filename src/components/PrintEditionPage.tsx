import { CaretLeft } from '@phosphor-icons/react'
import StatusBar from './StatusBar'
import './PrintEditionPage.css'

const imgNewspaper  = 'https://www.figma.com/api/mcp/asset/f3885992-9a7e-4f8c-b8a2-064cfba3ac77'
const imgEdition1   = 'https://www.figma.com/api/mcp/asset/f3885992-9a7e-4f8c-b8a2-064cfba3ac77'
const imgEdition4   = 'https://www.figma.com/api/mcp/asset/ff66f2b2-aed2-4746-91d8-a95caeb12213'
const imgEdition5   = 'https://www.figma.com/api/mcp/asset/59ad4674-424d-4c82-90ca-3357a5318daa'
const imgEdition6   = 'https://www.figma.com/api/mcp/asset/c63ebc66-1ada-461a-8125-0b8adf9bb471'
const imgDownload   = 'https://www.figma.com/api/mcp/asset/d25dcad2-8fa4-40ca-8de6-5f1a482061a8'

const EDITIONS = [
  { date: 'April 14, 2026', img: imgEdition1 },
  { date: 'April 13, 2026', img: imgEdition1 },
  { date: 'April 12, 2026', img: imgEdition1 },
  { date: 'April 11, 2026', img: imgEdition4 },
  { date: 'April 10, 2026', img: imgEdition5 },
  { date: 'April 9, 2026',  img: imgEdition6 },
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
            <img src={imgNewspaper} alt="Today's edition" className="pe-hero-image" />
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
                <img src={imgDownload} alt="Download" className="pe-dl-icon" />
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
