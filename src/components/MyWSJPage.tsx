import { useState, useRef, useEffect } from 'react'
import { Bell, Headphones, BookmarkSimple } from '@phosphor-icons/react'
import './MyWSJPage.css'
import MyWSJShortlist, { ShortlistCard, INITIAL_CURRENT } from './MyWSJShortlist'

const imgCard1     = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80"
const imgCard2     = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80"
const imgCard3     = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"

const stories = [
  {
    flashline: 'Markets',
    headline: 'Fed Signals Rate Cuts Are Likely Off the Table Until Inflation Cools Further',
    summary: 'Federal Reserve officials pushed back on expectations for near-term rate reductions, citing persistent price pressures and a resilient labor market.',
    image: imgCard1,
  },
  {
    flashline: 'Technology',
    headline: "Apple's AI Features Draw Scrutiny From European Regulators Over Privacy Rules",
    summary: "Regulators in Brussels have opened inquiries into whether Apple Intelligence complies with the bloc's strict data laws.",
    image: imgCard2,
  },
  {
    flashline: 'Business',
    headline: 'Goldman Sachs Sees Record Advisory Revenue as M&A Activity Surges in 2026',
    summary: 'The Wall Street bank reported its strongest deal-making quarter in three years, driven by mega-mergers in tech and healthcare.',
    image: imgCard3,
  },
]

const TABS = ['For You', 'Shortlist', 'Saved']

export default function MyWSJPage({ slidePos, onBellTap }: { slidePos?: 'left' | 'center' | 'right'; onBellTap?: () => void }) {
  const [activeTab, setActiveTab] = useState(0)
  const [shortlistKey, setShortlistKey] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const tabbar = el.closest('.iphone-screen')?.querySelector('.tabbar-wrapper') as HTMLElement | null
      const current = el.scrollTop
      if (tabbar) {
        if (current > lastScrollY.current && current > 40) {
          tabbar.classList.add('tabbar--scrolled-down')
        } else {
          tabbar.classList.remove('tabbar--scrolled-down')
        }
      }
      lastScrollY.current = current
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`mywsj-page mywsj-page--${slidePos ?? 'right'}`}>
      {/* Toolbar */}
      <div className="mywsj-toolbar">
        <div className="mywsj-toolbar-leading">
          <button className="mywsj-bell-btn" onClick={onBellTap}>
            <Bell size={24} weight="regular" color="#222222" className="mywsj-bell-icon" />
          </button>
        </div>
        <span className="mywsj-toolbar-title">MyWSJ</span>
        <div className="mywsj-toolbar-trailing" />
      </div>

      {/* Tab Navigation */}
      <div className="mywsj-tab-nav">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`mywsj-tab${i === activeTab ? ' mywsj-tab--active' : ''}`}
            onClick={() => { if (i === 1 && activeTab !== 1) setShortlistKey(k => k + 1); setActiveTab(i) }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="mywsj-scroll" ref={scrollRef}>
        {activeTab === 0 && (
          <div className="mywsj-tab-panel">
            <div className="mywsj-section-zone">
              <div className="mywsj-section-header">
                <p className="mywsj-section-title">Recommended for you</p>
                <p className="mywsj-section-subtitle">Stories picked for you based on your reading history</p>
              </div>
              {stories.map((story, i) => (
                <div key={i}>
                  {i > 0 && <div className="mywsj-divider" />}
                  <div className="mywsj-card">
                    <p className="mywsj-flashline">{story.flashline}</p>
                    <div className="mywsj-space-8" />
                    <h2 className="mywsj-headline">{story.headline}</h2>
                    <div className="mywsj-space-8" />
                    <p className="mywsj-summary">{story.summary}</p>
                    <div className="mywsj-space-16" />
                    <div className="mywsj-card-image">
                      <img src={story.image} alt="" />
                    </div>
                    <div className="mywsj-space-8" />
                    <div className="mywsj-card-footer">
                      <span className="mywsj-read-time">6 min read</span>
                      <div className="mywsj-footer-actions">
                        <button className="mywsj-footer-btn">
                          <Headphones size={20} weight="regular" color="#6f6f6f" />
                        </button>
                        <button className="mywsj-footer-btn">
                          <BookmarkSimple size={20} weight="regular" color="#6f6f6f" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mywsj-bottom-pad" />
          </div>
        )}
        {activeTab === 1 && (
          <div className="mywsj-tab-panel">
            <MyWSJShortlist key={shortlistKey} />
          </div>
        )}
        {activeTab === 2 && (
          <div className="mywsj-tab-panel">
            <div className="mywsj-section-zone">
              {INITIAL_CURRENT.slice(0, 2).map((item, i) => (
                <div key={item.id}>
                  {i > 0 && <div className="mywsj-divider" />}
                  <ShortlistCard {...item} onRemove={() => {}} />
                </div>
              ))}
              <div className="mywsj-bottom-pad" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
