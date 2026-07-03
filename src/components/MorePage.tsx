import { Bell } from '@phosphor-icons/react'
import './MorePage.css'

const imgNewspaper  = 'https://www.figma.com/api/mcp/asset/af2e83f3-4159-4a71-b2d7-478f0342e7ad'
const imgPuzzle     = 'https://www.figma.com/api/mcp/asset/5425b9af-e49a-4573-b8d7-62c44c06760f'

const PROFILE_ROWS = ['Account', 'Setting', 'Support', 'Developer', 'Sign Out']

export default function MorePage({ slidePos, onBellTap, onExploreTap, onPrintEditionTap }: {
  slidePos?: 'left' | 'center' | 'right'
  onBellTap?: () => void
  onExploreTap?: () => void
  onPrintEditionTap?: () => void
}) {
  return (
    <div className={`more-page more-page--${slidePos ?? 'right'}`}>
      <div className="more-top-blur" />
      <div className="more-top-gradient" />
      {/* Toolbar — same structure as md-toolbar */}
      <div className="more-toolbar">
        <div className="more-toolbar-leading">
          <button className="more-glass-btn" onClick={onBellTap}>
            <Bell size={24} color="#222" />
          </button>
        </div>
        <span className="more-toolbar-title">More</span>
        <div className="more-toolbar-trailing" />
      </div>

      {/* Scrollable content */}
      <div className="more-scroll">

        {/* Puzzles hero card */}
        <div className="more-hero-card">
          <div className="more-hero-content">
            <img src={imgPuzzle} alt="" className="more-hero-icon" />
            <p className="more-hero-headline">Puzzles</p>
            <p className="more-hero-sub">Challenge yourself with our crosswords and other games.</p>
          </div>
          <button className="more-hero-btn" onClick={onExploreTap}>Explore</button>
        </div>

        {/* Print Edition row */}
        <div className="more-card-row" onClick={onPrintEditionTap} style={{ cursor: 'pointer' }}>
          <div className="more-card-icon-wrap">
            <img src={imgNewspaper} alt="" className="more-card-icon" />
          </div>
          <span className="more-card-label">Print Edition</span>
        </div>

        {/* Profile section */}
        <div className="more-section-label">PROFILE</div>
        <div className="more-group">
          {PROFILE_ROWS.map((row, i) => (
            <div key={row}>
              {i > 0 && <div className="more-group-divider" />}
              <button className="more-group-row">
                <span className={`more-group-row-label${row === 'Sign Out' ? ' more-group-row-label--red' : ''}`}>{row}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="more-bottom-pad" />
      </div>
    </div>
  )
}
