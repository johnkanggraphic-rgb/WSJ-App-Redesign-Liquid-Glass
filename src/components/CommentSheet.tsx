import { ThumbsUp, X, ArrowsDownUp } from '@phosphor-icons/react'
import './CommentSheet.css'

const imgHero        = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&q=80'

function CommentCard({ initials, name, time, text }: {
  initials: string
  name: string
  time: string
  text: string
}) {
  return (
    <div className="comment-card">
      <div className="comment-card-avatar">{initials}</div>
      <div className="comment-card-body">
        <div className="comment-card-meta">
          <span className="comment-card-name">{name}</span>
          <span className="comment-card-time">{time}</span>
        </div>
        <p className="comment-card-text">{text}</p>
        <div className="comment-card-actions">
          <button className="comment-card-action-btn">Reply</button>
          <button className="comment-card-action-btn comment-card-action-btn--like">
            <ThumbsUp size={16} weight="regular" color="#222222" />
          </button>
          <button className="comment-card-action-btn">Share</button>
        </div>
      </div>
    </div>
  )
}

export default function CommentSheet({ visible, onClose }: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Scrim */}
      <div
        className={`comment-sheet-scrim${visible ? ' comment-sheet-scrim--visible' : ''}`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div className={`comment-sheet${visible ? ' comment-sheet--visible' : ''}`}>

        {/* Grabber + toolbar */}
        <div className="comment-sheet-toolbar">
          <div className="comment-sheet-grabber" />
          <div className="comment-sheet-toolbar-row">
            <div className="comment-sheet-title">Comments</div>
            <button className="comment-sheet-close-btn" onClick={onClose}>
              <div className="comment-sheet-close-glass">
                <X size={20} weight="bold" color="#222222" />
              </div>
            </button>
          </div>
        </div>

        {/* Article card */}
        <div className="comment-article-card">
          <img src={imgHero} alt="" className="comment-article-thumb" />
          <p className="comment-article-headline">Judge Rules Google Operates Illegal Ad Monopoly</p>
        </div>

        <div className="comment-divider" />

        {/* Count + sort */}
        <div className="comment-meta-row">
          <span className="comment-count">213 Comments</span>
          <div className="comment-sort">
            <span className="comment-sort-label">Sort by</span>
            <span className="comment-sort-value">Newest</span>
            <ArrowsDownUp size={16} weight="regular" color="#6f6f6f" className="comment-sort-caret" />
          </div>
        </div>

        <div className="comment-divider" />

        {/* Comment list */}
        <div className="comment-list">
          <CommentCard
            initials="JG"
            name="James Graves"
            time="6m ago"
            text="Elon knows that Mars colonization is impossible. There is no solution for deep space radiation. The Martian atmosphere is thin and Mars has no magnetic shield because… See more"
          />
          <div className="comment-divider comment-divider--inset" />
          <CommentCard
            initials="JA"
            name="Josef Alexander"
            time="8m ago"
            text="This ruling was long overdue. Google has been abusing its dominance in the ad market for years. Advertisers and publishers alike have suffered while Google took an ever-larger cut… See more"
          />
        </div>

        {/* Reply input */}
        <div className="comment-input-bar">
          <div className="comment-input-avatar">XK</div>
          <div className="comment-input-field">
            <span className="comment-input-placeholder">What do you think?</span>
          </div>
        </div>

      </div>
    </>
  )
}
