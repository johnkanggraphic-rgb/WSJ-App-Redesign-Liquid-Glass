import { useRef, useState, useEffect, useCallback } from 'react'
import { CaretLeft, BookmarkSimple, CaretRight, X } from '@phosphor-icons/react'
import './LiveCoveragePage.css'
import './ArticlePage.css'
import StatusBar from './StatusBar'
import ShareSheet from './ShareSheet'
import CommentSheet from './CommentSheet'
import EventTimelineSheet from './EventTimelineSheet'

const imgChat      = 'https://www.figma.com/api/mcp/asset/68f3f97c-39f3-4cf3-ba6a-35627736d87c'

const imgShareFat  = 'https://www.figma.com/api/mcp/asset/9bdb2d0a-0424-42ad-bc28-61639c781bb0'

const imgHero    = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80'
const imgUpdate1 = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80'
const imgUpdate2 = 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&q=80'
const imgAvatar  = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
const imgAvatar2 = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face'

// ArrowUp icon from Figma
const imgArrowUp = 'https://www.figma.com/api/mcp/asset/2c597e21-1e6c-4ab9-ab34-b05d40ab1cfb'

const stocks = [
  { name: 'Alphabet Inc.', price: '$178.32 USD', change: '+4.21', pct: '2.42%' },
  { name: 'Meta Platforms', price: '$512.18 USD', change: '+9.03', pct: '1.79%' },
  { name: 'NVIDIA Corp.',   price: '$884.55 USD', change: '+6.18', pct: '0.70%' },
]

function StockRow({ name, price, change, pct }: { name: string; price: string; change: string; pct: string }) {
  return (
    <div className="lc-stock-row">
      <span className="lc-stock-name">{name}</span>
      <div className="lc-stock-right">
        <span className="lc-stock-price">{price}</span>
        <span className="lc-stock-change">{change}</span>
        <span className="lc-stock-change">{pct}</span>
        <img src={imgArrowUp} alt="" className="lc-stock-arrow" />
      </div>
    </div>
  )
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label className="lc-toggle">
      <input type="checkbox" className="lc-toggle-input" checked={checked} onChange={onChange} />
      <div className="lc-toggle-track" />
      <div className="lc-toggle-thumb" />
    </label>
  )
}

export default function LiveCoveragePage({ visible, onBack }: { visible: boolean; onBack: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastY = useRef(0)
  const [toolbarHidden, setToolbarHidden] = useState(false)
  const [notifEnabled, setNotifEnabled] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [commentSheetVisible, setCommentSheetVisible] = useState(false)
  const [timelineSheetVisible, setTimelineSheetVisible] = useState(false)
  const [shareSheetVisible, setShareSheetVisible] = useState(false)

  const [toastVisible, setToastVisible] = useState(false)
  const [toastHiding, setToastHiding] = useState(false)
  const [toastLinkLabel, setToastLinkLabel] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState('Successfully added')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toastHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const hideToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    if (toastHideTimer.current) clearTimeout(toastHideTimer.current)
    setToastHiding(true)
    toastHideTimer.current = setTimeout(() => { setToastVisible(false); setToastHiding(false) }, 220)
  }, [])

  const showToast = useCallback((message: string, linkLabel: string | null) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    if (toastHideTimer.current) clearTimeout(toastHideTimer.current)
    setToastMessage(message)
    setToastLinkLabel(linkLabel)
    setToastHiding(false)
    setToastVisible(true)
    toastTimer.current = setTimeout(() => {
      setToastHiding(true)
      toastHideTimer.current = setTimeout(() => { setToastVisible(false); setToastHiding(false) }, 220)
    }, 2000)
  }, [])

  const handleBookmark = useCallback(() => {
    const next = !bookmarked
    setBookmarked(next)
    showToast(next ? 'Successfully added' : 'Item successfully removed', next ? 'Go to Save' : null)
  }, [bookmarked, showToast])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const y = el.scrollTop
      if (y > lastY.current && y > 60) setToolbarHidden(true)
      else if (y < lastY.current) setToolbarHidden(false)
      lastY.current = y
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`lc-page${visible ? ' lc-page--visible' : ''}`}>
      {/* Scrollable content */}
      <div className="lc-scroll" ref={scrollRef}>

        {/* ── Featured Post ──────────────────────────────────────────────── */}
        <div className="lc-featured">
          {/* LIVE tag + timestamp */}
          <div className="lc-header-row">
            <div className="lc-live-tag">
              <div className="lc-live-dot" />
              <span className="lc-live-text">LIVE</span>
            </div>
            <span className="lc-timestamp">June 17, 2025 4:17 pm ET</span>
          </div>

          {/* Headline */}
          <h1 className="lc-featured-headline">
            Google Ad Monopoly Trial: Live Updates From the Courthouse
          </h1>

          {/* Summary */}
          <p className="lc-featured-summary">
            Federal prosecutors say Google illegally monopolized the digital advertising market. Follow live updates as the trial unfolds in the Eastern District of Virginia.
          </p>

          {/* Widgets */}
          <div className="lc-widgets">
            {/* Event Timeline widget */}
            <div className="lc-widget" style={{ cursor: 'pointer' }} onClick={() => setTimelineSheetVisible(true)}>
              <div className="lc-widget-content">
                <div className="lc-widget-title">Event Timeline</div>
                <div className="lc-widget-meta">
                  <span className="lc-widget-meta-text">8 updates total</span>
                  <div className="lc-widget-meta-dot" />
                  <span className="lc-widget-meta-text lc-widget-meta-live">Updated 45 min ago</span>
                </div>
              </div>
              <div className="lc-widget-caret">
                <CaretRight size={24} color="#222" />
              </div>
            </div>

            {/* Notifications widget */}
            <div className="lc-widget lc-widget-notif">
              <div className="lc-widget-content">
                <div className="lc-widget-title">Notifications</div>
                <div className="lc-widget-meta">
                  <span className="lc-widget-meta-text">Receive alerts for major updates.</span>
                </div>
              </div>
              <ToggleSwitch checked={notifEnabled} onChange={() => setNotifEnabled(v => !v)} />
            </div>
          </div>

          {/* Hero image */}
          <div className="lc-featured-img-wrap">
            <img src={imgHero} alt="" className="lc-featured-img" />
          </div>
          <div className="lc-img-caption-row">
            <span className="lc-img-caption">Caption lorem ipsum dolor sit amet.</span>
            <span className="lc-img-credit">PHOTO: Source</span>
          </div>

          {/* Body text */}
          <p className="lc-featured-body">
            Lorem ipsum dolor sit amet consectetur. Suspendisse mattis convallis magna tincidunt luctus massa ac. Sit tristique augue arcu id. Venenatis feugiat faucibus ut nulla facilisi volutpat pulvinar. Enim non erat tincidunt sed. Pretium eleifend nibh eget convallis auctor.
          </p>

          {/* Bullets */}
          <ul className="lc-bullets">
            <li className="lc-bullet"><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
            <li className="lc-bullet"><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
            <li className="lc-bullet"><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
          </ul>

          {/* Stocks */}
          <div className="lc-stocks">
            {stocks.map(s => <StockRow key={s.name} {...s} />)}
          </div>
        </div>

        {/* ── Updates feed ──────────────────────────────────────────────── */}
        <div className="lc-updates-label">Updates</div>

        {/* Update card 1 — Standard post */}
        <div className="lc-update-card">
          <div className="lc-update-timestamp">13 min ago</div>
          <h2 className="lc-update-headline">
            DOJ Rests Case After Key Witness Testimony on Ad Auction Manipulation
          </h2>
          {/* Byline */}
          <div className="lc-update-byline">
            <img src={imgAvatar} alt="" className="lc-update-avatar" />
            <div className="lc-update-byline-text">
              <span className="lc-update-author">By Jason Zweig</span>
            </div>
          </div>
          {/* Image */}
          <div className="lc-update-img-wrap">
            <img src={imgUpdate1} alt="" className="lc-update-img" />
          </div>
          <div className="lc-img-caption-row" style={{ marginBottom: 0 }}>
            <span className="lc-img-caption">Caption lorem ipsum dolor sit amet.</span>
            <span className="lc-img-credit">PHOTO: Source</span>
          </div>
          {/* Body */}
          <p className="lc-update-body" style={{ marginTop: 16 }}>
            Lorem ipsum dolor sit amet consectetur. Suspendisse mattis convallis magna tincidunt luctus massa ac. Sit tristique augue arcu id. Venenatis feugiat faucibus ut nulla facilisi volutpat pulvinar.
          </p>
          <ul className="lc-update-bullets">
            <li className="lc-update-bullet"><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
            <li className="lc-update-bullet"><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
          </ul>
          <div className="lc-update-stocks">
            {stocks.slice(0, 2).map(s => <StockRow key={s.name} {...s} />)}
          </div>
          {/* Footer */}
          <div className="lc-update-footer">
            <div style={{ width: 32 }} />
            <button className="lc-update-show-more">Show More <CaretRight size={14} /></button>
            <button className="lc-update-share-btn">
              <img src={imgShareFat} alt="Share" className="lc-update-share-icon" />
            </button>
          </div>
        </div>

        {/* Update card 2 — Opinion post */}
        <div className="lc-update-card lc-update-card--opinion">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <span className="lc-update-opinion-tag">OPINION</span>
            <span className="lc-update-timestamp" style={{ margin: 0 }}>13 min ago</span>
          </div>
          <h2 className="lc-update-headline">
            Google's Advertising Dominance May Outlast the Courtroom Battle
          </h2>
          <div className="lc-update-byline">
            <img src={imgAvatar2} alt="" className="lc-update-avatar" style={{ border: '1px solid #e7ded2' }} />
            <div className="lc-update-byline-text">
              <span className="lc-update-author lc-update-author--opinion">By Hardika Singh</span>
            </div>
          </div>
          <div className="lc-update-img-wrap">
            <img src={imgUpdate2} alt="" className="lc-update-img" />
          </div>
          <div className="lc-img-caption-row" style={{ marginBottom: 0 }}>
            <span className="lc-img-caption">Caption lorem ipsum dolor sit amet.</span>
            <span className="lc-img-credit">PHOTO: Source</span>
          </div>
          <p className="lc-update-body" style={{ marginTop: 16 }}>
            Lorem ipsum dolor sit amet consectetur. Suspendisse mattis convallis magna tincidunt luctus massa ac. Sit tristique augue arcu id. Venenatis feugiat faucibus ut nulla facilisi volutpat pulvinar. Enim non erat tincidunt sed.
          </p>
          <div className="lc-update-footer">
            <div style={{ width: 32 }} />
            <button className="lc-update-show-more" style={{ borderColor: '#e7ded2', color: '#865a1c' }}>Show More <CaretRight size={14} /></button>
            <button className="lc-update-share-btn">
              <img src={imgShareFat} alt="Share" className="lc-update-share-icon" />
            </button>
          </div>
        </div>

        {/* Update card 3 — Another standard post */}
        <div className="lc-update-card">
          <div className="lc-update-timestamp">1 hr ago</div>
          <h2 className="lc-update-headline">
            Judge Questions Google on Revenue Sharing With Browser Partners
          </h2>
          <div className="lc-update-byline">
            <img src={imgAvatar} alt="" className="lc-update-avatar" />
            <div className="lc-update-byline-text">
              <span className="lc-update-author">By Jason Zweig</span>
            </div>
          </div>
          <p className="lc-update-body">
            Lorem ipsum dolor sit amet consectetur. Suspendisse mattis convallis magna tincidunt luctus massa ac. Sit tristique augue arcu id. Venenatis feugiat faucibus ut nulla facilisi volutpat pulvinar. Enim non erat tincidunt sed.
          </p>
          <div className="lc-update-footer">
            <div style={{ width: 32 }} />
            <button className="lc-update-show-more">Show More <CaretRight size={14} /></button>
            <button className="lc-update-share-btn">
              <img src={imgShareFat} alt="Share" className="lc-update-share-icon" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="lc-cta">
          <button className="lc-cta-btn">Load More Updates</button>
        </div>

        <div className="lc-bottom-pad" />
      </div>

      {/* ── Status bar overlay ─────────────────────────────────────────── */}
      <div className="lc-statusbar-overlay">
        <StatusBar transparent />
      </div>

      {/* ── Top gradient ───────────────────────────────────────────────── */}
      <div className="lc-top-gradient" />

      {/* ── Toast ──────────────────────────────────────────────────────── */}
      <div
        className={`bookmark-toast${toastVisible ? ' bookmark-toast--visible' : ''}${toastHiding ? ' bookmark-toast--hiding' : ''}`}
        style={{ bottom: toolbarHidden ? 44 : 92 }}
      >
        <span className="bookmark-toast-text">{toastMessage}</span>
        {toastLinkLabel !== null && (
          <a href="#" className="bookmark-toast-link">{toastLinkLabel}</a>
        )}
        <button className="bookmark-toast-close" onClick={hideToast}>
          <X size={20} color="#fff" weight="bold" />
        </button>
      </div>

      {/* ── Bottom toolbar — exact same as ArticlePage ──────────────────── */}
      <div className={`article-toolbar${toolbarHidden ? ' article-toolbar--hidden' : ''}`}>
        <div className="article-toolbar-leading">
          <button className="notif-back-btn" onClick={onBack}>
            <div className="notif-back-glass">
              <CaretLeft size={20} weight="bold" color="#222" />
            </div>
          </button>
        </div>
        <div className="article-bottom-pill">
          <div className="article-bottom-pill-bg" />
          <button className="article-pill-btn" onClick={() => setCommentSheetVisible(true)}>
            <img src={imgChat} alt="Chat" className="article-pill-icon" />
          </button>
          <button className="article-pill-btn" onClick={handleBookmark}>
            <BookmarkSimple size={24} weight={bookmarked ? 'fill' : 'regular'} color="#222222" />
          </button>
          <button className="article-pill-btn" onClick={() => setShareSheetVisible(true)}>
            <img src={imgShareFat} alt="Share" className="article-pill-icon" />
          </button>
        </div>
      </div>

      {/* ── Sub-pages / sheets ─────────────────────────────────────────── */}
      <EventTimelineSheet visible={timelineSheetVisible} onClose={() => setTimelineSheetVisible(false)} />
      <CommentSheet visible={commentSheetVisible} onClose={() => setCommentSheetVisible(false)} />
      <ShareSheet visible={shareSheetVisible} onClose={() => setShareSheetVisible(false)} />
    </div>
  )
}
