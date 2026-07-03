import { useState, useRef, useEffect } from 'react'
import './TopNav.css'

const tabs = [
  'Top Stories',
  'Markets & Finance',
  'Opinion',
  'Business',
  'World',
  'Lifestyle',
  'Tech',
  'U.S.',
  'Sections',
]

export default function TopNav() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tab = tabRefs.current[active]
    const container = containerRef.current
    const nav = navRef.current
    const indicator = indicatorRef.current
    if (!tab || !container || !nav || !indicator) return

    const tabRect = tab.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()

    // Position relative to .topnav (where indicator is absolutely placed)
    indicator.style.left = `${tabRect.left - navRect.left}px`
    indicator.style.width = `${tabRect.width}px`

    // Scroll active tab into view
    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [active])

  return (
    <div className="topnav-container" ref={containerRef}>
      <div className="topnav" ref={navRef}>
        {tabs.map((tab, i) => (
          <div key={tab} className="topnav-tab-wrap">
            {i > 0 && <div className="topnav-space" />}
            <button
              ref={el => { tabRefs.current[i] = el }}
              className={`topnav-tab${i === active ? ' topnav-tab--active' : ''}`}
              onClick={() => setActive(i)}
            >
              {tab}
            </button>
          </div>
        ))}

        {/* Sliding underline indicator */}
        <div className="topnav-indicator" ref={indicatorRef} />
      </div>
    </div>
  )
}
