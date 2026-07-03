import { useState, useRef, useEffect } from 'react'
import './TabBar.css'
import { HomeIcon, MyWSJIcon, MarketDataIcon, MediaIcon, MoreIcon } from './TabIcons'

const tabs = [
  { label: 'Home',        Icon: HomeIcon },
  { label: 'MyWSJ',       Icon: MyWSJIcon },
  { label: 'Market Data', Icon: MarketDataIcon, labelWide: true },
  { label: 'Media',       Icon: MediaIcon },
  { label: 'More',        Icon: MoreIcon },
]

export default function TabBar({ dark = false, onTabChange }: { dark?: boolean; onTabChange?: (index: number) => void }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const pillRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const activeTab = tabRefs.current[active]
    const container = buttonsRef.current
    const pill = pillRef.current
    if (!activeTab || !container || !pill) return

    pill.style.left = `${activeTab.offsetLeft - 2}px`
    pill.style.width = `${activeTab.offsetWidth + 3.8}px`

    // Trigger bounce: remove class, force reflow, re-add
    pill.classList.remove('tab-selection-pill--bounce')
    void pill.offsetWidth
    pill.classList.add('tab-selection-pill--bounce')
  }, [active])

  return (
    <div className={`tabbar-wrapper${dark ? ' tabbar--dark' : ''}`}>
      <div className="tabbar-buttons" ref={buttonsRef}>
        {/* Glass pill background */}
        <div className="tabbar-bg">
          <div className="tabbar-glass">
            <div className="tabbar-glass-white" />
            <div className="tabbar-glass-burn" />
            <div className="tabbar-glass-darken" />
          </div>
          <div className="tabbar-glass-effect" />
        </div>

        {/* Single sliding selection pill */}
        <div className="tab-selection-pill" ref={pillRef} />

        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={el => { tabRefs.current[i] = el }}
            className={`tab${i === active ? ' tab--active' : ''}${i === tabs.length - 1 ? ' tab--last' : ''}`}
            onClick={() => { setActive(i); onTabChange?.(i) }}
          >
            <div className="tab-icon">
              <tab.Icon active={i === active} dark={dark} />
            </div>
            <span className={`tab-label${i === active ? ' tab-label--active' : ''}${tab.labelWide ? ' tab-label--wide' : ''}${dark && i !== active ? ' tab-label--dark-bg' : ''}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
