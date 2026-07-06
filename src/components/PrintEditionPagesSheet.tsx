import { useState } from 'react'
import { X } from '@phosphor-icons/react'
import './PrintEditionPagesSheet.css'

const PAGE_IMGS: Record<number, string> = {
  1: '/assets/pe-page-1.png',
  2: '/assets/pe-page-2.png',
  3: '/assets/pe-page-3.png',
}

const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({ num }))

export default function PrintEditionPagesSheet({ visible, onClose }: {
  visible: boolean
  onClose: () => void
}) {
  const [activePage, setActivePage] = useState(1)

  return (
    <div className={`peps-sheet${visible ? ' peps-sheet--visible' : ''}`}>
      {/* Toolbar */}
      <div className="peps-toolbar">
        <div className="peps-grabber" />
        <div className="peps-toolbar-row">
          <span className="peps-title">Jump to Page</span>
          <button className="peps-close-btn" onClick={onClose}>
            <div className="peps-close-glass">
              <X size={20} weight="bold" color="#222" />
            </div>
          </button>
        </div>
      </div>

      {/* Scrollable page thumbnails */}
      <div className="peps-scroll">
        {PAGES.map(page => (
          <button
            key={page.num}
            className={`peps-card${activePage === page.num ? ' peps-card--active' : ''}`}
            onClick={() => { setActivePage(page.num); onClose() }}
          >
            <div className="peps-card-img">
              {PAGE_IMGS[page.num]
                ? <img src={PAGE_IMGS[page.num]} alt={`Page ${page.num}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <span style={{ fontSize: 12, color: '#999' }}>{page.num}</span>
              }
            </div>
            <span className="peps-card-num">{page.num}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
