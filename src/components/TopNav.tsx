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

  useEffect(() => {
    const tab = tabRefs.current[active]
    const indicator = indicatorRef.current
    if (!tab || !indicator) return

    // offsetLeft/offsetWidth are in CSS coordinate space, unaffected by zoom on ancestors
    indicator.style.left = `${tab.offsetLeft}px`
    indicator.style.width = `${tab.offsetWidth}px`

    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [active])

  return (
    <div className="topnav-container" ref={containerRef}>
      <div className="topnav">
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
