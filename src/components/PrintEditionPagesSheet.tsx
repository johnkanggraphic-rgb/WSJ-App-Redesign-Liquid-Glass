import { useState } from 'react'
import { X } from '@phosphor-icons/react'
import './PrintEditionPagesSheet.css'

const imgPage1 = 'https://www.figma.com/api/mcp/asset/eeb594d3-fd9b-4f7f-b8fc-ccd0748c9c2f'
const imgPage2 = 'https://www.figma.com/api/mcp/asset/6bc0b5d1-0d1b-4f68-bcc6-5f6bcd4a5838'
const imgPage3 = 'https://www.figma.com/api/mcp/asset/32785a9a-ad6c-439f-9d6a-92d5b48612e3'

const PAGES = [
  { num: 1, img: imgPage1 },
  { num: 2, img: imgPage2 },
  { num: 3, img: imgPage3 },
  { num: 4, img: imgPage1 },
  { num: 5, img: imgPage2 },
  { num: 6, img: imgPage3 },
  { num: 7, img: imgPage1 },
  { num: 8, img: imgPage2 },
  { num: 9, img: imgPage3 },
]

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
            <img src={page.img} alt={`Page ${page.num}`} className="peps-card-img" />
            <span className="peps-card-num">{page.num}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
