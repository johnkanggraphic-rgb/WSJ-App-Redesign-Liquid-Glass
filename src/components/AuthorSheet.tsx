import { X, Envelope } from '@phosphor-icons/react'
import './AuthorSheet.css'
const imgAvatar    = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=top'

export default function AuthorSheet({ visible, onClose }: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Scrim */}
      <div
        className={`author-sheet-scrim${visible ? ' author-sheet-scrim--visible' : ''}`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div className={`author-sheet${visible ? ' author-sheet--visible' : ''}`}>
        {/* Grabber + toolbar */}
        <div className="author-sheet-toolbar">
          <div className="author-sheet-grabber" />
          <div className="author-sheet-toolbar-row">
            <div className="author-sheet-toolbar-spacer" />
            <button className="author-sheet-close-btn" onClick={onClose}>
              <div className="author-sheet-close-glass">
                <X size={20} weight="bold" color="#222222" />
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="author-sheet-content">
          <img src={imgAvatar} alt="" className="author-sheet-avatar" />
          <h2 className="author-sheet-name">Hardika Singh</h2>
          <p className="author-sheet-title">Personal Tech Columnist</p>

          <div className="author-sheet-actions">
            <button className="author-sheet-icon-btn">
              <Envelope size={22} weight="regular" color="#222222" />
            </button>
            <button className="author-sheet-follow-btn">Follow</button>
            <button className="author-sheet-icon-btn">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M11.73 8.77L17.9 2H16.4L11.06 7.85 6.77 2H2L8.46 11.01 2 18H3.5L9.14 11.83 13.65 18H18.42L11.73 8.77ZM9.89 10.93L9.23 10.01 4.04 3.07H6.03L10.47 9.01L11.13 9.93L16.41 17.07H14.42L9.89 10.93Z" fill="#222222"/></svg>
            </button>
          </div>

          <p className="author-sheet-bio">
            Nicole Nguyen is a Personal Tech columnist at The Wall Street Journal, covering how technology companies' products and policies affect people's lives.
          </p>
          <p className="author-sheet-bio">
            Her stories explore all aspects of consumer technology, in particular new innovations related to mobile devices, cybersecurity, digital privacy, e-bikes and health.
          </p>
        </div>
      </div>
    </>
  )
}
