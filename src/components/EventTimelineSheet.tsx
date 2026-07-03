import './EventTimelineSheet.css'

const imgXClose = 'https://www.figma.com/api/mcp/asset/738d0fae-32f6-492b-985a-2aec721ee963'

const timelineItems = [
  { time: '45 min ago', headline: "DOJ Rests Case After Key Witness Testimony on Ad Auction Manipulation" },
  { time: '1 hr ago',   headline: "Judge Questions Google on Revenue Sharing With Browser Partners" },
  { time: '2 hr ago',   headline: "Google Executive Testifies Ad Tools Were Built for Publishers, Not Advertisers" },
  { time: '3 hr ago',   headline: "Prosecutors Show Internal Emails Discussing Ad Pricing Strategy" },
  { time: '6 hr ago',   headline: "Opening Arguments Begin in Federal Ad Monopoly Case" },
  { time: '12 hr ago',  headline: "Judge Denies Google's Motion to Dismiss Key Antitrust Claims" },
  { time: 'June 16, 4:17 pm ET', headline: "Court Reconvenes After Overnight Recess; New Witnesses Scheduled", subtle: true },
  { time: '4 hr ago',   headline: "Alphabet Shares Drop 4% as Trial Enters Second Week" },
  { time: 'June 15, 2025', headline: "Trial Opens With DOJ Laying Out Scope of Google's Ad Dominance", subtle: true },
]

export default function EventTimelineSheet({ visible, onClose }: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <>
      <div
        className={`timeline-sheet-scrim${visible ? ' timeline-sheet-scrim--visible' : ''}`}
        onClick={onClose}
      />
      <div className={`timeline-sheet${visible ? ' timeline-sheet--visible' : ''}`}>
        {/* Toolbar */}
        <div className="timeline-sheet-toolbar">
          <div className="timeline-sheet-grabber" />
          <div className="timeline-sheet-toolbar-row">
            <div className="timeline-sheet-title">Event Timeline</div>
            <button className="timeline-sheet-close-btn" onClick={onClose}>
              <div className="timeline-sheet-close-glass">
                <img src={imgXClose} alt="Close" className="timeline-sheet-close-icon" />
              </div>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="timeline-sheet-list">
          {timelineItems.map((item, i) => (
            <div key={i}>
              <div className="timeline-item">
                <span className={`timeline-item-time${item.subtle ? ' timeline-item-time--subtle' : ''}`}>
                  {item.time}
                </span>
                <p className="timeline-item-headline">{item.headline}</p>
              </div>
              {i < timelineItems.length - 1 && <div className="timeline-item-divider" />}
            </div>
          ))}
          <div style={{ height: 12 }} />
        </div>
      </div>
    </>
  )
}
