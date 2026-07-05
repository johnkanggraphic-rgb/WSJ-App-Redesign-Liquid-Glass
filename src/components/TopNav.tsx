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

export default function TopNav({ activeIndex, onTabChange }: {
  activeIndex?: number
  onTabChange?: (index: number) => void
}) {
  const [internalActive, setInternalActive] = useState(0)
  const active = activeIndex !== undefined ? activeIndex : internalActive
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const accentColor = active === 2 ? '#865a1c' : '#222222'

  useEffect(() => {
    const tab = tabRefs.current[active]
    const indicator = indicatorRef.current
    if (!tab || !indicator) return

    indicator.style.left = `${tab.offsetLeft}px`
    indicator.style.width = `${tab.offsetWidth}px`
    indicator.style.background = active === 2 ? '#865a1c' : '#222222'

    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [active])

  const handleClick = (i: number) => {
    setInternalActive(i)
    onTabChange?.(i)
  }

  return (
    <div className="topnav-container" ref={containerRef}>
      <div className="topnav">
        {tabs.map((tab, i) => (
          <div key={tab} className="topnav-tab-wrap">
            {i > 0 && <div className="topnav-space" />}
            <button
              ref={el => { tabRefs.current[i] = el }}
              className={`topnav-tab${i === active ? ' topnav-tab--active' : ''}`}
              style={i === active ? { color: accentColor } : undefined}
              onClick={() => handleClick(i)}
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
