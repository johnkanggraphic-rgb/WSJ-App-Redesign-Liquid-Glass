import './AuthorSheet.css'

const imgXClose    = 'https://www.figma.com/api/mcp/asset/738d0fae-32f6-492b-985a-2aec721ee963'
const imgEnvelope  = 'https://www.figma.com/api/mcp/asset/8a7a0f51-2867-43b0-b7d4-4304d3926780'
const imgXLogo     = 'https://www.figma.com/api/mcp/asset/a2b9f7e5-0d5d-4cb6-89fa-e6cee2561b93'
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
                <img src={imgXClose} alt="Close" className="author-sheet-close-icon" />
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
              <img src={imgEnvelope} alt="Email" className="author-sheet-action-icon" />
            </button>
            <button className="author-sheet-follow-btn">Follow</button>
            <button className="author-sheet-icon-btn">
              <img src={imgXLogo} alt="X" className="author-sheet-action-icon" />
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
