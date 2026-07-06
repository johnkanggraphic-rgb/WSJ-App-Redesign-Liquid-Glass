import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from '@phosphor-icons/react'
import './FeedbackSheet.css'

const imgXClose = 'https://www.figma.com/api/mcp/asset/738d0fae-32f6-492b-985a-2aec721ee963'

const MAX_CHARS = 255

export default function FeedbackSheet({ visible, onClose }: {
  visible: boolean
  onClose: () => void
}) {
  const [thumbs, setThumbs] = useState<'up' | 'down' | null>('up')
  const [text, setText] = useState('')
  const remaining = MAX_CHARS - text.length

  return (
    <>
      {/* Scrim */}
      <div
        className={`feedback-sheet-scrim${visible ? ' feedback-sheet-scrim--visible' : ''}`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div className={`feedback-sheet${visible ? ' feedback-sheet--visible' : ''}`}>
        {/* Grabber + toolbar */}
        <div className="feedback-sheet-toolbar">
          <div className="feedback-sheet-grabber" />
          <div className="feedback-sheet-toolbar-row">
            <div className="feedback-sheet-title">Share Feedback</div>
            <button className="feedback-sheet-close-btn" onClick={onClose}>
              <div className="feedback-sheet-close-glass">
                <img src={imgXClose} alt="Close" className="feedback-sheet-close-icon" />
              </div>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="feedback-sheet-content">
          {/* Thumbs row */}
          <div className="feedback-thumbs-row">
            <span className="feedback-thumbs-label">Did you find this summary useful?</span>
            <div className="feedback-thumbs-btns">
              <button
                className={`feedback-thumb-btn${thumbs === 'up' ? ' feedback-thumb-btn--active' : ''}`}
                onClick={() => setThumbs(thumbs === 'up' ? null : 'up')}
              >
                <ThumbsUp size={24} weight={thumbs === 'up' ? 'fill' : 'regular'} color={thumbs === 'up' ? '#222222' : '#6f6f6f'} />
              </button>
              <button
                className={`feedback-thumb-btn${thumbs === 'down' ? ' feedback-thumb-btn--active' : ''}`}
                onClick={() => setThumbs(thumbs === 'down' ? null : 'down')}
              >
                <ThumbsDown size={24} weight={thumbs === 'down' ? 'fill' : 'regular'} color={thumbs === 'down' ? '#222222' : '#6f6f6f'} />
              </button>
            </div>
          </div>

          {/* Text area */}
          <div className="feedback-textarea-wrap">
            <div className="feedback-textarea-label-row">
              <span className="feedback-textarea-label">Additional Feedback</span>
              <span className="feedback-textarea-optional">(Optional)</span>
            </div>
            <textarea
              className="feedback-textarea"
              placeholder="Tell us what you think of Backstory,"
              maxLength={MAX_CHARS}
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <p className="feedback-textarea-count">You have {remaining} characters remaining.</p>
          </div>

          {/* Submit */}
          <div className="feedback-submit-row">
            <button className={`feedback-submit-btn${text.length > 0 || thumbs ? ' feedback-submit-btn--active' : ''}`}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
