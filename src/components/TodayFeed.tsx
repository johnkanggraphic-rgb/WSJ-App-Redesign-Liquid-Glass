import { useRef, useEffect, useState, useContext, createContext, useCallback } from 'react'
import { PlusCircle, MinusCircle, BookmarkSimple, X, Pause, Headphones, Chat, ShareFat } from '@phosphor-icons/react'
import './TodayFeed.css'
import StockBar from './StockBar'

// ── Toast context ──────────────────────────────────────────────────────────
// linkLabel: string = "added" toast with link; null = "removed" toast
const ToastContext = createContext<(linkLabel: string | null) => void>(() => {})

// ── Mini player context ────────────────────────────────────────────────────
export interface MiniPlayerInfo { flashline: string; headline: string }
const MiniPlayerContext = createContext<(info: MiniPlayerInfo) => void>(() => {})

// ── Article tap context ────────────────────────────────────────────────────
const ArticleTapContext = createContext<(headline: string) => void>(() => {})

// ── Comment tap context ────────────────────────────────────────────────────
const CommentTapContext = createContext<(headline: string) => void>(() => {})

// ── Live coverage tap context ──────────────────────────────────────────────
const LiveCoverageTapContext = createContext<() => void>(() => {})

// Article photo (Unsplash — stable)
const imgArticlePhoto = 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&q=80'

// ── Plus button with filled toggle ────────────────────────────────────────
function PlusButton() {
  const [filled, setFilled] = useState(false)
  const [tapping, setTapping] = useState(false)
  const showToast = useContext(ToastContext)

  const handleTap = () => {
    setTapping(true)
    setTimeout(() => {
      const next = !filled
      setFilled(next)
      setTapping(false)
      showToast(next ? 'Go to Shortlist' : null)
    }, 120)
  }

  return (
    <button
      className={`card-action-btn plus-btn${tapping ? ' plus-btn--tapping' : ''}`}
      onClick={handleTap}
    >
      {filled
        ? <MinusCircle size={24} weight="fill" color="#222222" />
        : <PlusCircle size={24} weight="regular" color="#6f6f6f" />
      }
    </button>
  )
}

function BookmarkButton() {
  const [filled, setFilled] = useState(false)
  const [tapping, setTapping] = useState(false)
  const showToast = useContext(ToastContext)

  const handleTap = () => {
    setTapping(true)
    setTimeout(() => {
      const next = !filled
      setFilled(next)
      setTapping(false)
      showToast(next ? 'Go to Save' : null)
    }, 120)
  }

  return (
    <button
      className={`card-action-btn plus-btn${tapping ? ' plus-btn--tapping' : ''}`}
      onClick={handleTap}
    >
      <BookmarkSimple size={24} weight={filled ? 'fill' : 'regular'} color={filled ? '#222222' : '#6f6f6f'} />
    </button>
  )
}

// ── Shared footer actions ──────────────────────────────────────────────────
function ArticleActions({
  readTime, flashline = '', headline = ''
}: {
  readTime: string; flashline?: string; headline?: string
}) {
  const showMiniPlayer = useContext(MiniPlayerContext)
  const onCommentTap   = useContext(CommentTapContext)
  return (
    <div className="card-footer" onClick={e => e.stopPropagation()}>
      <div className="card-footer-left">
        <span className="card-read-time">{readTime}</span>
      </div>
      <div className="card-footer-right">
        <button className="card-action-btn" onClick={() => showMiniPlayer({ flashline, headline })}>
          <Headphones size={24} weight="regular" color="#6f6f6f" />
        </button>
        <button className="card-action-btn" onClick={() => onCommentTap(headline)}>
          <Chat size={24} weight="regular" color="#6f6f6f" />
        </button>
        <BookmarkButton />
        <PlusButton />
      </div>
    </div>
  )
}

// ── Card 1: Article card with full-width 3:2 image ─────────────────────────
const HERO_HEADLINE = 'Judge Rules Google Operates Illegal Ad Monopoly'
function ArticleCardHero({ onTap }: { onTap?: (headline: string) => void }) {
  return (
    <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onTap?.(HERO_HEADLINE)}>
      <div className="card-flashline">Flashline</div>
      <h2 className="card-headline-l">{HERO_HEADLINE}</h2>
      <p className="card-summary">
        Tech giant faces multiple legal threats related to how it wields market power
      </p>
      <div className="card-image-wrap">
        <img src={imgArticlePhoto} alt="" className="card-image" />
      </div>
      <ArticleActions
        flashline="Flashline"
        headline={HERO_HEADLINE}
        readTime="6 min read"
      />
    </div>
  )
}

// ── Card 2: Live card ──────────────────────────────────────────────────────
const liveUpdates = [
  { time: '13 min ago', headline: "Google's Ad Unit Could Be Broken Up, DOJ Says in Initial Recommendation" },
  { time: '28 min ago', headline: "Judge's Ruling Covers Search and Ad Tech Businesses Separately" },
  { time: '45 min ago', headline: 'Tech Giant Vows to Appeal, Says Competition in Advertising Is Strong' },
  { time: '1 hr ago',   headline: 'Markets React: Alphabet Shares Fall 4% After Decision Announced' },
]

function LiveCard() {
  const onLiveTap = useContext(LiveCoverageTapContext)
  return (
    <div className="feed-card feed-card--live" style={{ cursor: 'pointer' }} onClick={onLiveTap}>
      <div className="card-top-section">
        <div className="live-tag">
          <div className="live-dot" />
          <span className="live-tag-text">Live</span>
        </div>
        <h2 className="card-headline-l card-headline-l--live">
          Google Ad Monopoly Trial: Live Updates From the Courthouse
        </h2>
        <p className="card-summary card-summary--live">
          A federal judge has found Google illegally monopolized the online advertising technology market, ruling in favor of the Justice Department.
        </p>
      </div>
      <div className="live-updates-outer">
        <div className="live-updates-scroll">
          {liveUpdates.map((item, i) => (
            <div className="live-update-item" key={i}>
              {i > 0 && <div className="live-update-divider" />}
              <div className="live-update-content">
                <span className="live-update-time">{item.time}</span>
                <p className="live-update-headline">{item.headline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer live-card-footer" onClick={e => e.stopPropagation()}>
        <div className="card-footer-left">
          <a href="#" className="view-all-link">View All Updates</a>
        </div>
        <div className="card-footer-right">
          <button className="card-action-btn">
            <Chat size={24} weight="regular" color="#6f6f6f" />
          </button>
          <button className="card-action-btn">
            <ShareFat size={24} weight="regular" color="#6f6f6f" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Card 3: Compact article (no image) ────────────────────────────────────
function CompactArticleCard({
  flashline, headline, readTime
}: {
  flashline: string; headline: string; readTime: string
}) {
  const onArticleTap = useContext(ArticleTapContext)
  return (
    <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(headline)}>
      <div className="card-flashline">{flashline}</div>
      <h3 className="card-headline-s">{headline}</h3>
      <ArticleActions
        flashline={flashline}
        headline={headline}
        readTime={readTime}
      />
    </div>
  )
}


// ── Ad Container ───────────────────────────────────────────────────────────
const imgAdFill = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80'

function AdCard() {
  return (
    <div className="promo-container">
      <div className="promo-spacer" />
      <div className="promo-inner">
        <p className="promo-label">Advertisement</p>
        <div className="promo-box">
          <img src={imgAdFill} alt="Advertisement" className="promo-fill" />
        </div>
      </div>
      <div className="promo-spacer" />
    </div>
  )
}

// ── News Package / Opinion Package ────────────────────────────────────────

const opinionCards = [
  {
    flashline: 'Review & Outlook',
    headline: 'Trump, Wrongful Deportation and the Courts',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=200&q=80',
  },
  {
    flashline: 'Review & Outlook',
    headline: 'The Tariff Demon on Trump\'s Shoulder',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80',
  },
  {
    flashline: 'Review & Outlook',
    headline: 'Prada Hits the FTC With a Handbag',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80',
  },
  {
    flashline: 'Kimberley A. Strassel',
    headline: "Trump's Triple-Dog Supreme Court Dare",
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=200&q=80',
  },
]

function OpinionCard({ flashline, headline, readTime, img }: {
  flashline: string; headline: string; readTime: string; img: string
}) {
  const onArticleTap = useContext(ArticleTapContext)
  return (
    <div className="opinion-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(headline)}>
      <div className="opinion-card-content">
        <div className="opinion-card-text">
          <div className="opinion-flashline">{flashline}</div>
          <h3 className="opinion-headline">{headline}</h3>
        </div>
        <div className="opinion-thumb-wrap">
          <img src={img} alt="" className="opinion-thumb" />
        </div>
      </div>
      <div className="card-footer">
        <div className="card-footer-left">
          <span className="card-read-time">{readTime}</span>
        </div>
        <div className="card-footer-right">
          <button className="card-action-btn">
            <Headphones size={24} weight="regular" color="#6f6f6f" />
          </button>
          <button className="card-action-btn">
            <Chat size={24} weight="regular" color="#6f6f6f" />
          </button>
          <BookmarkButton />
          <PlusButton />
        </div>
      </div>
    </div>
  )
}

function OpinionPackage() {
  return (
    <div className="opinion-pkg">
      <div className="opinion-strap">Opinion</div>
      {opinionCards.map((card, i) => (
        <div key={i}>
          {i > 0 && <div className="opinion-divider" />}
          <OpinionCard {...card} />
        </div>
      ))}
    </div>
  )
}

// ── World Package ─────────────────────────────────────────────────────────
const imgWorldHero = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80'

const WORLD_HEADLINE_1 = "Caitlin Clark Breaks WNBA All-Time Scoring Record in Season Opener"
const WORLD_HEADLINE_2 = 'NFL Draft: Chiefs Trade Up to Secure Generational Talent at Quarterback'
const WORLD_HEADLINE_3 = 'Novak Djokovic Wins 25th Grand Slam Title at the French Open'
function WorldPackage() {
  const onArticleTap = useContext(ArticleTapContext)
  return (
    <div className="world-pkg">
      <div className="section-strap">Sports</div>

      {/* Hero card with image */}
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(WORLD_HEADLINE_1)}>
        <h2 className="card-headline-l">{WORLD_HEADLINE_1}</h2>
        <p className="card-summary">
          The Indiana Fever star surpassed the previous record in just her second professional season, cementing her status as the face of women's basketball.
        </p>
        <div className="card-image-wrap">
          <img src={imgWorldHero} alt="" className="card-image" />
        </div>
        <ArticleActions
          headline={WORLD_HEADLINE_1}
          readTime="6 min read"
        />
      </div>

      <div className="feed-divider" />
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(WORLD_HEADLINE_2)}>
        <h3 className="card-headline-s">{WORLD_HEADLINE_2}</h3>
        <ArticleActions
          headline={WORLD_HEADLINE_2}
          readTime="6 min read"
        />
      </div>
      <div className="feed-divider" />
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(WORLD_HEADLINE_3)}>
        <h3 className="card-headline-s">{WORLD_HEADLINE_3}</h3>
        <ArticleActions
          headline={WORLD_HEADLINE_3}
          readTime="6 min read"
        />
      </div>
    </div>
  )
}

// ── World Section ─────────────────────────────────────────────────────────
const imgWorldSectionHero = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
const WORLD_S_HEADLINE_1 = 'Ukraine Strikes Russian Oil Depot Deep Inside Enemy Territory With Long-Range Drones'
const WORLD_S_HEADLINE_2 = 'China Signals It Will Match Any Further U.S. Tariff Hikes'
const WORLD_S_HEADLINE_3 = "France's Snap Election Leaves No Party With a Clear Majority"
function WorldSection() {
  const onArticleTap = useContext(ArticleTapContext)
  return (
    <div className="world-pkg">
      <div className="section-strap">World</div>
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(WORLD_S_HEADLINE_1)}>
        <h2 className="card-headline-l">{WORLD_S_HEADLINE_1}</h2>
        <p className="card-summary">
          The overnight attack targeted a fuel storage facility more than 400 miles from the front line, marking one of the deepest strikes of the war.
        </p>
        <div className="card-image-wrap">
          <img src={imgWorldSectionHero} alt="" className="card-image" />
        </div>
        <ArticleActions
          headline={WORLD_S_HEADLINE_1}
          readTime="5 min read"
        />
      </div>
      <div className="feed-divider" />
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(WORLD_S_HEADLINE_2)}>
        <h3 className="card-headline-s">{WORLD_S_HEADLINE_2}</h3>
        <ArticleActions
          headline={WORLD_S_HEADLINE_2}
          readTime="4 min read"
        />
      </div>
      <div className="feed-divider" />
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(WORLD_S_HEADLINE_3)}>
        <h3 className="card-headline-s">{WORLD_S_HEADLINE_3}</h3>
        <ArticleActions
          headline={WORLD_S_HEADLINE_3}
          readTime="6 min read"
        />
      </div>
    </div>
  )
}

// ── Mini Player ───────────────────────────────────────────────────────────
const imgMiniPlayerThumb = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=120&q=80'

const marqueeStyleEl: { el: HTMLStyleElement | null } = { el: null }

export function MarqueeHeadline({ text }: { text: string }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const overflow = inner.scrollWidth - outer.clientWidth
    inner.classList.remove('mini-player-headline--marquee')
    if (overflow <= 0) {
      outer.style.removeProperty('--marquee-dist')
      outer.style.removeProperty('--marquee-duration')
      return
    }

    const SPEED = 55   // px/s — constant scroll speed
    const PAUSE = 2    // seconds paused at each end
    const scrollSecs = overflow / SPEED
    const total = scrollSecs + PAUSE + scrollSecs + PAUSE

    const p1 = +(PAUSE / total * 100).toFixed(3)
    const p2 = +((PAUSE + scrollSecs) / total * 100).toFixed(3)
    const p3 = +((PAUSE + scrollSecs + PAUSE) / total * 100).toFixed(3)

    if (!marqueeStyleEl.el) {
      marqueeStyleEl.el = document.createElement('style')
      document.head.appendChild(marqueeStyleEl.el)
    }
    marqueeStyleEl.el.textContent = `
      @keyframes marquee-scroll {
        0%      { transform: translateX(0); }
        ${p1}%  { transform: translateX(0); }
        ${p2}%  { transform: translateX(calc(-1 * var(--marquee-dist))); }
        ${p3}%  { transform: translateX(calc(-1 * var(--marquee-dist))); }
        100%    { transform: translateX(0); }
      }
    `

    outer.style.setProperty('--marquee-dist', `${overflow}px`)
    outer.style.setProperty('--marquee-duration', `${total.toFixed(2)}s`)
    void inner.offsetWidth
    inner.classList.add('mini-player-headline--marquee')
  }, [text])

  return (
    <div className="mini-player-headline-outer" ref={outerRef}>
      <span className="mini-player-headline" ref={innerRef}>{text}</span>
    </div>
  )
}

export function MiniPlayer({ visible, hiding, info, onClose, onExpand, bottomOffset }: {
  visible: boolean; hiding: boolean; info: MiniPlayerInfo; onClose: () => void; onExpand: () => void; bottomOffset?: number
}) {
  return (
    <div
      className={`mini-player${visible ? ' mini-player--visible' : ''}${hiding ? ' mini-player--hiding' : ''}`}
      style={bottomOffset !== undefined ? { bottom: bottomOffset } : undefined}
      onClick={onExpand}
    >
      <div className="mini-player-thumb">
        <img src={imgMiniPlayerThumb} alt="" className="mini-player-thumb-img" />
      </div>
      <div className="mini-player-content">
        <span className="mini-player-flashline">{info.flashline || 'WSJ'}</span>
        <MarqueeHeadline text={info.headline} />
      </div>
      <div className="mini-player-actions">
        <button className="mini-player-btn" onClick={e => e.stopPropagation()}>
          <Pause size={20} weight="fill" color="#222222" />
        </button>
        <button className="mini-player-btn" onClick={e => { e.stopPropagation(); onClose() }}>
          <X size={20} weight="bold" color="#222222" />
        </button>
      </div>
    </div>
  )
}

// ── Bookmark Toast ─────────────────────────────────────────────────────────
// linkLabel null = "removed" variant (no link); string = "added" variant with link
function BookmarkToast({ visible, hiding, linkLabel, onClose, navDown }: { visible: boolean; hiding: boolean; linkLabel: string | null; onClose: () => void; navDown: boolean }) {
  const bottom = navDown ? 87 : 96
  return (
    <div
      className={`bookmark-toast${visible ? ' bookmark-toast--visible' : ''}${hiding ? ' bookmark-toast--hiding' : ''}`}
      style={{ bottom }}
    >
      <span className="bookmark-toast-text">
        {linkLabel !== null ? 'Successfully added' : 'Item successfully removed'}
      </span>
      {linkLabel !== null && (
        <a href="#" className="bookmark-toast-link">{linkLabel}</a>
      )}
      <button className="bookmark-toast-close" onClick={onClose}>
        <X size={20} color="#fff" weight="bold" />
      </button>
    </div>
  )
}

// ── TodayFeed ──────────────────────────────────────────────────────────────
export default function TodayFeed({ onArticleTap, onCommentTap, onDarkBg, onLiveTap, onMiniPlayer, onNavDown, onToastActive }: { onArticleTap?: (headline: string) => void; onCommentTap?: (headline: string) => void; onDarkBg?: (dark: boolean) => void; onLiveTap?: () => void; onMiniPlayer?: (info: MiniPlayerInfo) => void; onNavDown?: (down: boolean) => void; onToastActive?: (active: boolean) => void }) {
  const feedRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastHiding, setToastHiding] = useState(false)
  const [toastLinkLabel, setToastLinkLabel] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toastHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [navDown, setNavDown] = useState(false)

  const hideToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    if (toastHideTimer.current) clearTimeout(toastHideTimer.current)
    setToastHiding(true)
    toastHideTimer.current = setTimeout(() => {
      setToastVisible(false)
      setToastHiding(false)
      onToastActive?.(false)
    }, 220)
  }, [onToastActive])

  const showToast = useCallback((linkLabel: string | null) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    if (toastHideTimer.current) clearTimeout(toastHideTimer.current)
    setToastLinkLabel(linkLabel)
    setToastHiding(false)
    setToastVisible(true)
    onToastActive?.(true)
    toastTimer.current = setTimeout(() => {
      setToastHiding(true)
      toastHideTimer.current = setTimeout(() => {
        setToastVisible(false)
        setToastHiding(false)
        onToastActive?.(false)
      }, 220)
    }, 2000)
  }, [onToastActive])

  useEffect(() => {
    const el = feedRef.current
    if (!el) return
    const onScroll = () => {
      const tabbar = el.closest('.content-area')?.querySelector('.tabbar-wrapper') as HTMLElement | null
      const current = el.scrollTop
      if (tabbar) {
        if (current > lastScrollY.current && current > 40) {
          tabbar.classList.add('tabbar--scrolled-down')
          setNavDown(true)
          onNavDown?.(true)
        } else {
          tabbar.classList.remove('tabbar--scrolled-down')
          setNavDown(false)
          onNavDown?.(false)
        }
      }
      lastScrollY.current = current
    }
    el.addEventListener('scroll', onScroll, { passive: true })

    // IntersectionObserver: detect when card images enter the bottom 100px (tab bar zone)
    const darkCount = { value: 0 }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          darkCount.value = Math.max(0, darkCount.value + (e.isIntersecting ? 1 : -1))
        })
        onDarkBg?.(darkCount.value > 0)
      },
      {
        root: el,
        rootMargin: `-${Math.max(0, el.clientHeight - 100)}px 0px 0px 0px`,
        threshold: 0,
      }
    )
    el.querySelectorAll('.card-image, .promo-fill').forEach(img => observer.observe(img))

    return () => {
      el.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [onDarkBg])

  return (
    <MiniPlayerContext.Provider value={(info) => onMiniPlayer?.(info)}>
    <ArticleTapContext.Provider value={onArticleTap ?? (() => {})}>
    <CommentTapContext.Provider value={onCommentTap ?? (() => {})}>
    <LiveCoverageTapContext.Provider value={onLiveTap ?? (() => {})}>
<ToastContext.Provider value={showToast}>
      <div className="today-feed" ref={feedRef}>
        <StockBar />
        <ArticleCardHero onTap={onArticleTap} />
        <div className="feed-divider" />
        <LiveCard />
        <div className="feed-divider" />
        <CompactArticleCard
          flashline="Technology"
          headline="Trump Exempts Smartphones, Other Electronics From Chinese Tariffs"
          readTime="4 min read"
        />
        <div className="feed-divider" />
        <CompactArticleCard
          flashline="Markets &amp; Finance"
          headline="Fed Minutes Reveal Deep Divide Over When to Cut Rates This Year"
          readTime="5 min read"
        />
        <div className="feed-divider" />
        <CompactArticleCard
          flashline="Business"
          headline="Boeing Reaches $1.1 Billion Settlement With Families of 737 MAX Crash Victims"
          readTime="7 min read"
        />
        <div className="feed-divider" />
        <CompactArticleCard
          flashline="World"
          headline="Ukraine Strikes Russian Oil Depot Deep Inside Enemy Territory With Long-Range Drones"
          readTime="3 min read"
        />
        <div className="feed-divider" />
        <CompactArticleCard
          flashline="U.S."
          headline="Senate Passes Sweeping Infrastructure Bill in Rare Bipartisan Vote"
          readTime="6 min read"
        />
        <div className="feed-divider" />
        <CompactArticleCard
          flashline="Opinion"
          headline="The Fed Is Running Out of Time to Get Inflation Right"
          readTime="8 min read"
        />
        <div className="feed-divider" />
        <AdCard />
        <WorldPackage />
        <div style={{ height: 8, background: '#f4f5f7', flexShrink: 0, width: '100%', boxShadow: 'inset 0 -1.5px 0 0 #ebebeb' }} />
        <OpinionPackage />
        <WorldSection />
        <div className="feed-bottom-pad" />
      </div>
      <BookmarkToast visible={toastVisible} hiding={toastHiding} linkLabel={toastLinkLabel} onClose={hideToast} navDown={navDown} />
    </ToastContext.Provider>
    </LiveCoverageTapContext.Provider>
</CommentTapContext.Provider>
    </ArticleTapContext.Provider>
    </MiniPlayerContext.Provider>
  )
}
