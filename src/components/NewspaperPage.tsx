import { useState } from 'react'
import { CaretLeft } from '@phosphor-icons/react'
import './SubPage.css'

const imgPage1 = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&q=80'
const imgPage2 = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80'
const imgPage3 = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&q=80'

const PAGES = [
  { num: '1', img: imgPage1 }, { num: '2', img: imgPage2 }, { num: '3', img: imgPage3 },
  { num: '4', img: imgPage1 }, { num: '5', img: imgPage2 }, { num: '6', img: imgPage3 },
  { num: '7', img: imgPage1 }, { num: '8', img: imgPage2 }, { num: '9', img: imgPage3 },
]

const SECTIONS = ['Front Page', 'Business & Finance', 'Money & Investing', 'Personal Journal', 'Greater NY', 'Opinion']

const NP_ARTICLES = [
  { headline: 'Fed Signals Rate Path Hinges on July Jobs Report', section: 'Front Page', col: 'A1' },
  { headline: 'Tech Giants Race to Deploy Enterprise AI Agents', section: 'Business', col: 'B1' },
  { headline: "Goldman's Record Quarter Signals M&A Boom Is Back", section: 'Finance', col: 'B3' },
  { headline: "China's EV Exports Face New EU Tariff Barriers", section: 'World', col: 'A6' },
  { headline: 'Nuclear Energy Sees Biggest Investment Surge in Decades', section: 'Energy', col: 'A8' },
]

function BackBtn({ onBack }: { onBack: () => void }) {
  return (
    <button className="notif-back-btn" onClick={onBack} aria-label="Back">
      <div className="notif-back-glass">
        <CaretLeft size={20} weight="bold" color="#222" />
      </div>
    </button>
  )
}

export default function NewspaperPage({ onBack }: { onBack: () => void }) {
  const [showPages,    setShowPages]    = useState(false)
  const [showSections, setShowSections] = useState(false)
  const [activePage,   setActivePage]   = useState('1')

  return (
    <div className="subpage">
      {/* Toolbar */}
      <div className="subpage-toolbar">
        <span className="subpage-toolbar-title">Thursday, July 3</span>
      </div>

      {/* Scroll */}
      <div className="subpage-scroll">
        {/* Header */}
        <div className="np-masthead">
          <div className="np-masthead-logo">THE WALL STREET JOURNAL</div>
          <div className="np-masthead-date">Thursday, July 3, 2026 · Vol. CCLXXXVIII No. 2</div>
        </div>

        {/* Articles */}
        <div className="np-articles">
          {NP_ARTICLES.map((a, i) => (
            <div key={i}>
              <div className="np-article-row">
                <div className="np-article-meta">
                  <span className="np-article-col">{a.col}</span>
                  <span className="np-article-section">{a.section}</span>
                </div>
                <h3 className="np-article-headline">{a.headline}</h3>
              </div>
              {i < NP_ARTICLES.length - 1 && <div className="subpage-divider" />}
            </div>
          ))}
        </div>

        <div className="subpage-bottom-pad" />
      </div>

      {/* Page sheet */}
      {showPages && (
        <div className="np-sheet-backdrop" onClick={() => setShowPages(false)}>
          <div className="np-sheet" onClick={e => e.stopPropagation()}>
            <div className="np-sheet-grabber" />
            <div className="np-sheet-header">
              <span className="np-sheet-title">Jump to Page</span>
              <button className="np-sheet-close" onClick={() => setShowPages(false)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="#6f6f6f" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="np-pages-scroll">
              {PAGES.map((page, i) => (
                <button
                  key={i}
                  className={`np-page-card${activePage === page.num ? ' np-page-card--active' : ''}`}
                  onClick={() => { setActivePage(page.num); setShowPages(false) }}
                >
                  <img src={page.img} alt={`Page ${page.num}`} className="np-page-img" />
                  <span className="np-page-num">{page.num}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section sheet */}
      {showSections && (
        <div className="np-sheet-backdrop" onClick={() => setShowSections(false)}>
          <div className="np-sheet" onClick={e => e.stopPropagation()}>
            <div className="np-sheet-grabber" />
            <div className="np-sheet-header">
              <span className="np-sheet-title">Jump to Section</span>
              <button className="np-sheet-close" onClick={() => setShowSections(false)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="#6f6f6f" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="np-sections-list">
              {SECTIONS.map((s, i) => (
                <div key={s}>
                  <button className="np-section-row" onClick={() => setShowSections(false)}>
                    <span>{s}</span>
                  </button>
                  {i < SECTIONS.length - 1 && <div className="subpage-divider" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="subpage-bottom-bar">
        <BackBtn onBack={onBack} />
        <div className="np-toolbar-pills">
          <button className="np-pill-btn" onClick={() => setShowPages(v => !v)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f6f6f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h7"/>
            </svg>
            <span>Pages</span>
          </button>
          <div className="np-pill-divider" />
          <button className="np-pill-btn" onClick={() => setShowSections(v => !v)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f6f6f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 10h16M4 14h8M4 18h8"/>
            </svg>
            <span>Sections</span>
          </button>
        </div>
      </div>
    </div>
  )
}
