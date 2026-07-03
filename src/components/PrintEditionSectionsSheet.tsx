import { X } from '@phosphor-icons/react'
import './PrintEditionSectionsSheet.css'

const SECTIONS = [
  'Front Page',
  'Business & Finance',
  'Money & Investing',
  'Personal Journal',
  'Greater NY',
  'Opinion',
]

export default function PrintEditionSectionsSheet({ visible, onClose }: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <div className={`pess-sheet${visible ? ' pess-sheet--visible' : ''}`}>
      {/* Toolbar */}
      <div className="pess-toolbar">
        <div className="pess-grabber" />
        <div className="pess-toolbar-row">
          <span className="pess-title">Jump to Section</span>
          <button className="pess-close-btn" onClick={onClose}>
            <div className="pess-close-glass">
              <X size={20} weight="bold" color="#222" />
            </div>
          </button>
        </div>
      </div>

      {/* Section list */}
      <div className="pess-list">
        {SECTIONS.map((section, i) => (
          <div key={section}>
            <button className="pess-row" onClick={onClose}>
              <span className="pess-row-label">{section}</span>
            </button>
            {i < SECTIONS.length - 1 && <div className="pess-divider" />}
          </div>
        ))}
      </div>
    </div>
  )
}
