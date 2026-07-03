import { useRef, useEffect, useState, useContext, createContext, useCallback } from 'react'
import { PlusCircle, BookmarkSimple, X, Pause } from '@phosphor-icons/react'
import './TodayFeed.css'
import StockBar from './StockBar'

// ── Toast context ──────────────────────────────────────────────────────────
// linkLabel: string = "added" toast with link; null = "removed" toast
const ToastContext = createContext<(linkLabel: string | null) => void>(() => {})

// ── Mini player context ────────────────────────────────────────────────────
interface MiniPlayerInfo { flashline: string; headline: string }
const MiniPlayerContext = createContext<(info: MiniPlayerInfo) => void>(() => {})

// ── Article tap context ────────────────────────────────────────────────────
const ArticleTapContext = createContext<(headline: string) => void>(() => {})

// ── Comment tap context ────────────────────────────────────────────────────
const CommentTapContext = createContext<(headline: string) => void>(() => {})

// ── Icon assets from Figma ─────────────────────────────────────────────────
// Article card (node 2189:47269)
const imgArticlePhoto = 'https://www.figma.com/api/mcp/asset/e85a6828-768e-417b-aae7-b49e1fbd8ee8'
const imgHeadphones   = 'https://www.figma.com/api/mcp/asset/a06853eb-5018-4679-ae5a-6b8d116e13e8'
const imgChat         = 'https://www.figma.com/api/mcp/asset/8cc66f6a-c736-4150-b45e-e146c0f176d5'

// Live card (node 2189:47327)
const imgChatLive = 'https://www.figma.com/api/mcp/asset/4d9ffed9-96a9-43e8-9323-80496988fe1b'
const imgShareFat = 'https://www.figma.com/api/mcp/asset/1b7c231c-ed8f-47f5-9b23-cc6559938601'

// Compact article card icons (node 2189:47364)
const imgHeadphones2 = 'https://www.figma.com/api/mcp/asset/8195a4cb-5dba-4fa0-8fb7-915488948945'
const imgChat2       = 'https://www.figma.com/api/mcp/asset/2b67c32e-bd1f-4986-b060-cd1011692615'

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
      <PlusCircle size={24} weight={filled ? 'fill' : 'regular'} color={filled ? '#222222' : '#6f6f6f'} />
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
  headphones, chat, readTime, flashline = '', headline = ''
}: {
  headphones: string; chat: string; readTime: string; flashline?: string; headline?: string
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
          <img src={headphones} alt="" className="card-action-icon" />
        </button>
        <button className="card-action-btn" onClick={() => onCommentTap(headline)}>
          <img src={chat} alt="" className="card-action-icon" />
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
        headphones={imgHeadphones}
        chat={imgChat}
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

const LIVE_HEADLINE = 'Google Ad Monopoly Trial: Live Updates From the Courthouse'
function LiveCard() {
  const onArticleTap = useContext(ArticleTapContext)
  return (
    <div className="feed-card feed-card--live" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(LIVE_HEADLINE)}>
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
            <img src={imgChatLive} alt="" className="card-action-icon" />
          </button>
          <button className="card-action-btn">
            <img src={imgShareFat} alt="" className="card-action-icon" />
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
        headphones={imgHeadphones2}
        chat={imgChat2}
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

// ── News Package (node 2189:47411) ────────────────────────────────────────
const imgPkg2LivePhoto = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'
const imgPkg2ShareFat  = 'https://www.figma.com/api/mcp/asset/4b381112-91c0-488d-bc0e-33eb8b057e97'
const imgPkg2Headphones = 'https://www.figma.com/api/mcp/asset/07615240-36d9-4b57-9b67-68c7bb5a224e'
const imgPkg2Chat       = 'https://www.figma.com/api/mcp/asset/dfe26845-9ea3-4be0-854d-e6ec2104802a'

const pkg2Updates = [
  { time: '13 min ago', headline: 'Inflation Outlook Reaches 44-Year High' },
  { time: '24 min ago', headline: 'Analysis | The Simple Explanation for the Treasury Market Mayhem' },
  { time: '38 min ago', headline: 'Dollar Tumbles as Investors Flee U.S. Assets' },
  { time: '1 hr ago',   headline: 'China Signals It Will Match Any Further U.S. Tariff Hikes' },
]

const NEWS_PKG_HEADLINE = 'Consumer Sentiment Plunges on Recession Fears; China Hits Back Again on Tariffs'
const NEWS_PKG_COMPACT_1 = "The 'Hidden Force' That Can Bring Mortgage Rates Down"
const NEWS_PKG_COMPACT_2 = 'Musk Vaulted to Top of a Popular Game. How Did He Find the Time?'
function NewsPackageCard() {
  const onArticleTap = useContext(ArticleTapContext)
  return (
    <div className="pkg-wrapper">
      {/* Live card with image */}
      <div className="feed-card feed-card--live" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(NEWS_PKG_HEADLINE)}>
        <div className="card-top-section">
          <div className="live-tag">
            <div className="live-dot" />
            <span className="live-tag-text">Live</span>
          </div>
          <h2 className="card-headline-l card-headline-l--live">
            Consumer Sentiment Plunges on Recession Fears; China Hits Back Again on Tariffs
          </h2>
          <p className="card-summary card-summary--live">
            Beijing signaled it wouldn't match any further tariff increases by Washington. The dollar and Treasury prices fell, while U.S. stocks rose on the last trading day of a tumultuous week.
          </p>
          <div className="card-image-wrap">
            <img src={imgPkg2LivePhoto} alt="" className="card-image" />
          </div>
        </div>
        <div className="live-updates-outer">
          <div className="live-updates-scroll">
            {pkg2Updates.map((item, i) => (
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
              <img src={imgPkg2ShareFat} alt="" className="card-action-icon" />
            </button>
          </div>
        </div>
      </div>
      {/* Compact card 1 */}
      <div className="feed-divider" />
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(NEWS_PKG_COMPACT_1)}>
        <h3 className="card-headline-s">{NEWS_PKG_COMPACT_1}</h3>
        <ArticleActions
          headphones={imgPkg2Headphones} chat={imgPkg2Chat}
          headline={NEWS_PKG_COMPACT_1}
          readTime="6 min read"
        />
      </div>
      <div className="feed-divider" />
      {/* Compact card 2 */}
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(NEWS_PKG_COMPACT_2)}>
        <h3 className="card-headline-s">{NEWS_PKG_COMPACT_2}</h3>
        <ArticleActions
          headphones={imgPkg2Headphones} chat={imgPkg2Chat}
          headline={NEWS_PKG_COMPACT_2}
          readTime="6 min read"
        />
      </div>
    </div>
  )
}

// ── Opinion Package (node 2189:47423) ─────────────────────────────────────
const opinionIcons = {
  headphones: 'https://www.figma.com/api/mcp/asset/45cb41e0-7683-4369-a546-8efde86bb4ac',
  chat:       'https://www.figma.com/api/mcp/asset/16356b20-eb8a-48bf-acf5-6c0384c2fa85',
  bookmark:   'https://www.figma.com/api/mcp/asset/5994a1a2-fffc-4f5d-9ad1-72fb6aff0526',
  plus:       'https://www.figma.com/api/mcp/asset/fda72b99-e9c5-4344-8be1-5833aaab7115',
}

const opinionCards = [
  {
    flashline: 'Review & Outlook',
    headline: 'Trump, Wrongful Deportation and the Courts',
    readTime: '6 min read',
    img: 'https://www.figma.com/api/mcp/asset/3f87ddde-e6d2-4660-9a8d-e4807ca4920c',
  },
  {
    flashline: 'Review & Outlook',
    headline: 'The Tariff Demon on Trump\'s Shoulder',
    readTime: '6 min read',
    img: 'https://www.figma.com/api/mcp/asset/3320b47b-bc19-4213-a4a4-7acdf98fe016',
  },
  {
    flashline: 'Review & Outlook',
    headline: 'Prada Hits the FTC With a Handbag',
    readTime: '6 min read',
    img: 'https://www.figma.com/api/mcp/asset/590b5990-2f46-4980-bb6c-6bbd4fa82def',
  },
  {
    flashline: 'Kimberley A. Strassel',
    headline: "Trump's Triple-Dog Supreme Court Dare",
    readTime: '6 min read',
    img: 'https://www.figma.com/api/mcp/asset/6ec4c67a-8e57-4a80-8cd6-ff769fc5e116',
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
            <img src={opinionIcons.headphones} alt="" className="card-action-icon" />
          </button>
          <button className="card-action-btn">
            <img src={opinionIcons.chat} alt="" className="card-action-icon" />
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

// ── World Package (node 2189:47437) ───────────────────────────────────────
const worldIcons = {
  headphones: 'https://www.figma.com/api/mcp/asset/4b2003eb-885f-4967-95cb-ee29ba9648a8',
  chat:       'https://www.figma.com/api/mcp/asset/93ed0ef8-af4a-4c14-85e2-6c36f464374e',
  bookmark:   'https://www.figma.com/api/mcp/asset/7a7ba8d9-58c5-40cc-9c0f-4893cb253106',
  plus:       'https://www.figma.com/api/mcp/asset/716342b1-0417-4030-9a28-a8730294f18e',
}
const imgWorldHero = 'https://www.figma.com/api/mcp/asset/f47532ee-8c04-46c8-a479-adf9a4df06c1'

const WORLD_HEADLINE_1 = 'For Working Women in India, Staying Safe Can Feel Like a Full-Time Job'
const WORLD_HEADLINE_2 = 'Flights Redirected From Barcelona as Fresh Storms Lash Spanish Coast'
const WORLD_HEADLINE_3 = 'Kate Middleton Returns With A New Royal Role'
function WorldPackage() {
  const onArticleTap = useContext(ArticleTapContext)
  return (
    <div className="world-pkg">
      <div className="section-strap">World</div>

      {/* Hero card with image */}
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(WORLD_HEADLINE_1)}>
        <h2 className="card-headline-l">{WORLD_HEADLINE_1}</h2>
        <p className="card-summary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tristique magna eu lacus blandit fringilla.
        </p>
        <div className="card-image-wrap">
          <img src={imgWorldHero} alt="" className="card-image" />
        </div>
        <ArticleActions
          headphones={worldIcons.headphones} chat={worldIcons.chat}
          headline={WORLD_HEADLINE_1}
          readTime="6 min read"
        />
      </div>

      <div className="feed-divider" />
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(WORLD_HEADLINE_2)}>
        <h3 className="card-headline-s">{WORLD_HEADLINE_2}</h3>
        <ArticleActions
          headphones={worldIcons.headphones} chat={worldIcons.chat}
          headline={WORLD_HEADLINE_2}
          readTime="6 min read"
        />
      </div>
      <div className="feed-divider" />
      <div className="feed-card" style={{ cursor: 'pointer' }} onClick={() => onArticleTap(WORLD_HEADLINE_3)}>
        <h3 className="card-headline-s">{WORLD_HEADLINE_3}</h3>
        <ArticleActions
          headphones={worldIcons.headphones} chat={worldIcons.chat}
          headline={WORLD_HEADLINE_3}
          readTime="6 min read"
        />
      </div>
    </div>
  )
}

// ── Mini Player ───────────────────────────────────────────────────────────
const imgMiniPlayerThumb = 'https://www.figma.com/api/mcp/asset/dc625918-054a-46a7-af2e-17834a2ff978'

const marqueeStyleEl: { el: HTMLStyleElement | null } = { el: null }

function MarqueeHeadline({ text }: { text: string }) {
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

function MiniPlayer({ visible, hiding, info, onClose, navDown }: {
  visible: boolean; hiding: boolean; info: MiniPlayerInfo; onClose: () => void; navDown: boolean
}) {
  return (
    <div
      className={`mini-player${visible ? ' mini-player--visible' : ''}${hiding ? ' mini-player--hiding' : ''}`}
      style={navDown ? { bottom: 83 } : undefined}
    >
      <div className="mini-player-thumb">
        <img src={imgMiniPlayerThumb} alt="" className="mini-player-thumb-img" />
      </div>
      <div className="mini-player-content">
        <span className="mini-player-flashline">{info.flashline || 'WSJ'}</span>
        <MarqueeHeadline text={info.headline} />
      </div>
      <div className="mini-player-actions">
        <button className="mini-player-btn">
          <Pause size={20} weight="fill" color="#111" />
        </button>
        <button className="mini-player-btn" onClick={onClose}>
          <X size={20} weight="bold" color="#111" />
        </button>
      </div>
    </div>
  )
}

// ── Bookmark Toast ─────────────────────────────────────────────────────────
// linkLabel null = "removed" variant (no link); string = "added" variant with link
function BookmarkToast({ visible, hiding, linkLabel, onClose, navDown }: { visible: boolean; hiding: boolean; linkLabel: string | null; onClose: () => void; navDown: boolean }) {
  return (
    <div
      className={`bookmark-toast${visible ? ' bookmark-toast--visible' : ''}${hiding ? ' bookmark-toast--hiding' : ''}`}
      style={navDown ? { bottom: 83 } : undefined}
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
export default function TodayFeed({ onArticleTap, onCommentTap }: { onArticleTap?: (headline: string) => void; onCommentTap?: (headline: string) => void }) {
  const feedRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastHiding, setToastHiding] = useState(false)
  const [toastLinkLabel, setToastLinkLabel] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toastHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [playerVisible, setPlayerVisible] = useState(false)
  const [playerHiding, setPlayerHiding] = useState(false)
  const [playerInfo, setPlayerInfo] = useState<MiniPlayerInfo>({ flashline: '', headline: '' })
  const [navDown, setNavDown] = useState(false)

  const hidePlayer = useCallback(() => {
    setPlayerHiding(true)
    setTimeout(() => { setPlayerVisible(false); setPlayerHiding(false) }, 220)
  }, [])

  const showMiniPlayer = useCallback((info: MiniPlayerInfo) => {
    setPlayerInfo(info)
    setPlayerHiding(false)
    setPlayerVisible(true)
  }, [])

  const hideToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    if (toastHideTimer.current) clearTimeout(toastHideTimer.current)
    setToastHiding(true)
    toastHideTimer.current = setTimeout(() => {
      setToastVisible(false)
      setToastHiding(false)
    }, 220)
  }, [])

  const showToast = useCallback((linkLabel: string | null) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    if (toastHideTimer.current) clearTimeout(toastHideTimer.current)
    setToastLinkLabel(linkLabel)
    setToastHiding(false)
    setToastVisible(true)
    toastTimer.current = setTimeout(() => {
      setToastHiding(true)
      toastHideTimer.current = setTimeout(() => {
        setToastVisible(false)
        setToastHiding(false)
      }, 220)
    }, 2000)
  }, [])

  useEffect(() => {
    const el = feedRef.current
    if (!el) return
    const onScroll = () => {
      const tabbar = el.closest('.content-area')?.querySelector('.tabbar-wrapper') as HTMLElement | null
      if (!tabbar) return
      const current = el.scrollTop
      if (current > lastScrollY.current && current > 40) {
        tabbar.classList.add('tabbar--scrolled-down')
        setNavDown(true)
      } else {
        tabbar.classList.remove('tabbar--scrolled-down')
        setNavDown(false)
      }
      lastScrollY.current = current
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <MiniPlayerContext.Provider value={showMiniPlayer}>
    <ArticleTapContext.Provider value={onArticleTap ?? (() => {})}>
    <CommentTapContext.Provider value={onCommentTap ?? (() => {})}>
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
        <div className="feed-divider" />
        <NewsPackageCard />
        <div className="feed-divider" />
        <div style={{ height: 8, background: '#f4f5f7', flexShrink: 0, width: '100%', boxShadow: 'inset 0 -1.5px 0 0 #ebebeb' }} />
        <OpinionPackage />
        <div className="feed-divider" />
        <WorldPackage />
        <div className="feed-bottom-pad" />
      </div>
      <BookmarkToast visible={toastVisible} hiding={toastHiding} linkLabel={toastLinkLabel} onClose={hideToast} navDown={navDown} />
      <MiniPlayer visible={playerVisible} hiding={playerHiding} info={playerInfo} onClose={hidePlayer} navDown={navDown} />
    </ToastContext.Provider>
    </CommentTapContext.Provider>
    </ArticleTapContext.Provider>
    </MiniPlayerContext.Provider>
  )
}
