import './EventTimelineSheet.css'

const imgXClose = 'https://www.figma.com/api/mcp/asset/738d0fae-32f6-492b-985a-2aec721ee963'

const TIMELINE_ITEMS = [
  { time: '45 min ago',       headline: 'Lorem Ipsum Dolar Sit Amet Doal Aliquamin Semper Nulla Sed Nulla' },
  { time: '1 hr ago',         headline: 'Lorem Ipsum Dolar Sit Amet Doal Aliquamin Semper Nulla Sed Nulla' },
  { time: '2 hr ago',         headline: 'Lorem Ipsum Dolar Sit Amet Doal Aliquamin Semper Nulla Sed Nulla' },
  { time: '3 hr ago',         headline: 'Lorem Ipsum Dolar Sit Amet Doal Aliquamin Semper Nulla Sed Nulla' },
  { time: '6 hr ago',         headline: 'Lorem Ipsum Dolar Sit Amet Doal Aliquamin Semper Nulla Sed Nulla' },
  { time: '12 hr ago',        headline: 'Lorem Ipsum Dolar Sit Amet Doal Aliquamin Semper Nulla Sed Nulla' },
  { time: 'June 16, 4:17 pm ET', headline: 'Lorem Ipsum Dolar Sit Amet Doal Aliquamin Semper Nulla Sed Nulla' },
  { time: '4 hr ago',         headline: 'Lorem Ipsum Dolar Sit Amet Doal Aliquamin Semper Nulla Sed Nulla' },
  { time: 'June 27, 2025',    headline: 'Lorem Ipsum Dolar Sit Amet Doal Aliquamin Semper Nulla Sed Nulla' },
]

export default function EventTimelineSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <>
      <div className={`et-scrim${visible ? ' et-scrim--visible' : ''}`} onClick={onClose} />
      <div className={`et-sheet${visible ? ' et-sheet--visible' : ''}`}>
        {/* Toolbar */}
        <div className="et-toolbar">
          <div className="et-grabber" />
          <div className="et-toolbar-row">
            <span className="et-title">Event Timeline</span>
            <button className="et-close-btn" onClick={onClose}>
              <div className="et-close-glass">
                <img src={imgXClose} alt="Close" className="et-close-icon" />
              </div>
            </button>
          </div>
        </div>

        {/* Scrollable timeline items */}
        <div className="et-scroll">
          {TIMELINE_ITEMS.map((item, i) => (
            <div key={i}>
              {i > 0 && <div className="et-divider" />}
              <div className="et-item">
                <span className="et-item-time">{item.time}</span>
                <p className="et-item-headline">{item.headline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
