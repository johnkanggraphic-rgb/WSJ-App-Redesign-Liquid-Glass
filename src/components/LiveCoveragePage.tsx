import { useRef, useState, useCallback } from 'react'
import { CaretLeft, BookmarkSimple, X, CaretDown } from '@phosphor-icons/react'
import './ArticlePage.css'
import './LiveCoveragePage.css'
import StatusBar from './StatusBar'
import EventTimelineSheet from './EventTimelineSheet'
import ShareSheet from './ShareSheet'

// ── Figma asset URLs (icons only) ─────────────────────────────────────────
const imgArrowUp        = 'https://www.figma.com/api/mcp/asset/56a51659-2606-4cfa-b379-fd1ef6d5b404'
const imgCaretRight     = 'https://www.figma.com/api/mcp/asset/6f7c4740-58d6-4a51-8366-a1434c39dcc2'
const imgDot            = 'https://www.figma.com/api/mcp/asset/1d37423e-9da5-4f24-9d09-9bca4352c9b9'
const imgShareFatStd    = 'https://www.figma.com/api/mcp/asset/773ad126-4d53-426d-945b-f7be74f3b4c2'
const imgShareFatOp     = 'https://www.figma.com/api/mcp/asset/abd7efc3-787f-4c1d-9c27-2e895862fddd'
const imgArrowUpArt     = 'https://www.figma.com/api/mcp/asset/348cb8ca-06da-4c20-a632-d39d08719f7d'
const imgCaretRightArt  = 'https://www.figma.com/api/mcp/asset/a57cf56a-b6da-441b-94ec-1dd213ee4c46'
const imgShareFatArt    = 'https://www.figma.com/api/mcp/asset/886acf04-09d2-466b-90f5-bf9902aa1be0'

// ── ArticlePage toolbar icons ─────────────────────────────────────────────
const imgChat      = 'https://www.figma.com/api/mcp/asset/68f3f97c-39f3-4cf3-ba6a-35627736d87c'

const imgShareFat  = 'https://www.figma.com/api/mcp/asset/9bdb2d0a-0424-42ad-bc28-61639c781bb0'

// ── Unsplash photos ───────────────────────────────────────────────────────
const imgFeatured      = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80'  // courthouse
const imgStdPost1      = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'  // stock chart
const imgStdPost2      = 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?w=800&q=80'  // judge gavel
const imgOpinionPost   = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80'  // newspaper/media
const imgArticlePost   = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80'  // person on laptop
const imgAuthor1       = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=top'
const imgOpinionAuthor = 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=200&h=200&fit=crop&crop=top'

// ── Stock row ─────────────────────────────────────────────────────────────
function StockRow({ arrow }: { arrow: string }) {
  return (
    <div className="lc-stock-row">
      <div className="lc-stock-company">
        <span className="lc-stock-name">NVIDIA Corp.</span>
      </div>
      <div className="lc-stock-info">
        <span className="lc-stock-price">$884.55 UDS</span>
        <span className="lc-stock-change lc-stock-change--up">6.18</span>
        <span className="lc-stock-pct lc-stock-change--up">0.70%</span>
        <div className="lc-stock-icon-wrap">
          <img src={arrow} alt="" className="lc-stock-arrow" />
        </div>
      </div>
    </div>
  )
}

// ── Image with source caption ─────────────────────────────────────────────
function MediaImage({ src }: { src: string }) {
  return (
    <div className="lc-media">
      <div className="lc-image-wrap">
        <img src={src} alt="" className="lc-image" />
      </div>
      <div className="lc-source-caption">
        <span className="lc-caption-text">Caption lorem ipsum dolor sit amet.</span>
        <span className="lc-credit-text">PHOTO: SOURCE</span>
      </div>
    </div>
  )
}

// ── Featured post ─────────────────────────────────────────────────────────
function FeaturedPost({ onTimelineTap }: { onTimelineTap: () => void }) {
  const [notifOn, setNotifOn] = useState(false)
  return (
    <div className="lc-featured">
      {/* LC-Header: LIVE tag + timestamp */}
      <div className="lc-lc-header">
        <div className="lc-live-tag">
          <div className="lc-live-dot" />
          <span className="lc-live-text">LIVE</span>
        </div>
        <span className="lc-timestamp">June 17, 2025 4:17 pm ET</span>
      </div>

      {/* Headline */}
      <h1 className="lc-headline">
        Google Antitrust Trial: DOJ Rests Case After Key Witness Testimony on Ad Auction Manipulation
      </h1>

      {/* Summary */}
      <p className="lc-summary">
        The Justice Department closed its antitrust case against Google as testimony revealed the tech giant paid billions to lock competitors out of the search and ad markets.
      </p>

      {/* Actions: Event Timeline + Notifications */}
      <div className="lc-actions">
        {/* Event Timeline widget */}
        <div className="lc-widget" onClick={onTimelineTap} style={{ cursor: 'pointer' }}>
          <div className="lc-widget-content">
            <div className="lc-widget-text-col">
              <span className="lc-widget-title">Event Timeline</span>
              <div className="lc-widget-secondary">
                <span className="lc-widget-sub">8 updates total</span>
                <img src={imgDot} alt="" className="lc-widget-dot" />
                <span className="lc-widget-updated">Updated 45 min ago</span>
              </div>
            </div>
            <div className="lc-widget-action">
              <img src={imgCaretRight} alt="" className="lc-widget-caret" />
            </div>
          </div>
        </div>

        {/* Notifications widget */}
        <div className="lc-widget lc-widget--notif">
          <div className="lc-widget-content">
            <div className="lc-widget-text-col">
              <span className="lc-widget-title">Notifications</span>
              <span className="lc-widget-sub">Receive alerts for major updates.</span>
            </div>
            <button className="lc-toggle" onClick={() => setNotifOn(n => !n)} aria-label="Toggle notifications">
              <div className={`lc-toggle-track${notifOn ? ' lc-toggle-track--on' : ''}`}>
                <div className={`lc-toggle-thumb${notifOn ? ' lc-toggle-thumb--on' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <MediaImage src={imgFeatured} />

      {/* Body text */}
      <div className="lc-body-section">
        <p className="lc-body">
          Lorem ipsum dolor sit amet consectetur. Suspendisse mattis convallis magna tincidunt luctus massa ac. Sit tristique augue arcu id. Venenatis feugiat faucibus ut nulla facilisi volutpat pulvinar. Enim non erat tincidunt sed. Pretium eleifend nibh eget convallis auctor. Elementum lectus accumsan id imperdiet maecenas vulputate nunc. Aliquam integer eget mauris quis posuere. Ullamcorper sapien cras.
        </p>
      </div>

      {/* Bullets */}
      <div className="lc-bullets-section">
        <ul className="lc-bullets">
          <li><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
          <li><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
          <li><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
        </ul>
      </div>

      {/* Stocks */}
      <div className="lc-stocks-section">
        <StockRow arrow={imgArrowUp} />
        <StockRow arrow={imgArrowUp} />
        <StockRow arrow={imgArrowUp} />
      </div>
    </div>
  )
}

// ── Standard post ─────────────────────────────────────────────────────────
function StandardPost({ time, image, headline }: { time: string; image: string; headline: string }) {
  return (
    <div className="lc-post lc-post--standard">
      {/* Timestamp */}
      <div className="lc-post-ts-row">
        <span className="lc-post-timestamp">{time}</span>
      </div>

      {/* Headline */}
      <h3 className="lc-post-headline">
        {headline}
      </h3>

      {/* Byline */}
      <div className="lc-byline">
        <div className="lc-byline-avatar-wrap">
          <img src={imgAuthor1} alt="" className="lc-byline-avatar" />
        </div>
        <div className="lc-byline-info">
          <span className="lc-byline-by">By </span>
          <span className="lc-byline-name">Jason Zweig</span>
        </div>
      </div>

      {/* Image */}
      <MediaImage src={image} />

      {/* Body */}
      <p className="lc-post-body">
        Lorem ipsum dolor sit amet consectetur. Suspendisse mattis convallis magna tincidunt luctus massa ac. Sit tristique augue arcu id. Venenatis feugiat faucibus ut nulla facilisi volutpat pulvinar. Enim non erat tincidunt sed. Pretium eleifend nibh eget convallis auctor. Elementum lectus accumsan id imperdiet maecenas vulputate nunc. Aliquam integer eget mauris quis posuere. Ullamcorper sapien cras.
      </p>

      {/* Bullets */}
      <ul className="lc-post-bullets">
        <li><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
        <li><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
        <li><strong>Highlighted sentence or word.</strong>{' '}Large unified headline ipsum dolor sit amet consectetur. Eleifend odio.</li>
      </ul>

      {/* Stocks */}
      <div className="lc-post-stocks">
        <StockRow arrow={imgArrowUp} />
        <StockRow arrow={imgArrowUp} />
        <StockRow arrow={imgArrowUp} />
      </div>

      {/* Footer */}
      <div className="lc-post-footer">
        <div className="lc-post-footer-spacer" />
        <button className="lc-show-more-btn">
          <span className="lc-show-more-text">Show More</span>
          <CaretDown size={16} color="#222" />
        </button>
        <button className="lc-post-share-btn">
          <img src={imgShareFatStd} alt="" className="lc-share-icon" />
        </button>
      </div>
    </div>
  )
}

// ── Opinion post ──────────────────────────────────────────────────────────
function OpinionPost({ time }: { time: string }) {
  return (
    <div className="lc-post lc-post--opinion">
      {/* Opinion flashline + timestamp */}
      <div className="lc-opinion-header">
        <div className="lc-opinion-flashline-wrap">
          <span className="lc-opinion-flashline">OPINION</span>
        </div>
        <span className="lc-post-timestamp lc-post-timestamp--inline">{time}</span>
      </div>

      {/* Headline */}
      <h3 className="lc-post-headline">
        Big Tech's Day of Reckoning Has Finally Arrived
      </h3>

      {/* Byline */}
      <div className="lc-byline">
        <div className="lc-byline-avatar-wrap lc-byline-avatar-wrap--opinion">
          <img src={imgOpinionAuthor} alt="" className="lc-byline-avatar" />
        </div>
        <div className="lc-byline-info">
          <span className="lc-byline-by lc-byline-by--opinion">By </span>
          <span className="lc-byline-name lc-byline-name--opinion">Hardika Singh</span>
        </div>
      </div>

      {/* Image */}
      <MediaImage src={imgOpinionPost} />

      {/* Body */}
      <p className="lc-post-body">
        Lorem ipsum dolor sit amet consectetur. Suspendisse mattis convallis magna tincidunt luctus massa ac. Sit tristique augue arcu id. Venenatis feugiat faucibus ut nulla facilisi volutpat pulvinar. Enim non erat tincidunt sed. Pretium eleifend nibh eget convallis auctor. Elementum lectus accumsan id imperdiet maecenas vulputate nunc. Aliquam integer eget mauris quis posuere. Ullamcorper sapien cras.
      </p>

      {/* Footer */}
      <div className="lc-post-footer">
        <div className="lc-post-footer-spacer" />
        <button className="lc-show-more-btn lc-show-more-btn--opinion">
          <span className="lc-show-more-text">Show More</span>
          <CaretDown size={16} color="#865a1c" />
        </button>
        <button className="lc-post-share-btn">
          <img src={imgShareFatOp} alt="" className="lc-share-icon" />
        </button>
      </div>
    </div>
  )
}

// ── Article post ──────────────────────────────────────────────────────────
function ArticlePost({ time }: { time: string }) {
  return (
    <div className="lc-post lc-post--article">
      {/* Timestamp placeholder row (empty in design) */}
      <div className="lc-post-ts-row">
        <span className="lc-post-timestamp">{time}</span>
      </div>

      {/* Headline — larger size */}
      <h3 className="lc-post-headline lc-post-headline--lg">
        Judge Weighs Sweeping Remedies That Could Break Up Google's Ad Business
      </h3>

      {/* Image */}
      <MediaImage src={imgArticlePost} />

      {/* Body */}
      <p className="lc-post-body lc-post-body--article">
        Lorem ipsum dolor sit amet consectetur. Suspendisse mattis convallis magna tincidunt luctus massa ac. Sit tristique augue arcu id. Venenatis feugiat faucibus ut nulla facilisi volutpat pulvinar. Enim non erat tincidunt sed. Pretium eleifend nibh eget convallis auctor. Elementum lectus accumsan id imperdiet maecenas vulputate nunc. Aliquam integer eget mauris quis posuere. Ullamcorper sapien cras.
      </p>

      {/* Stocks */}
      <div className="lc-post-stocks lc-post-stocks--article">
        <StockRow arrow={imgArrowUpArt} />
        <StockRow arrow={imgArrowUpArt} />
        <StockRow arrow={imgArrowUpArt} />
      </div>

      {/* Link */}
      <div className="lc-article-link-row">
        <span className="lc-article-link">Read Full Article</span>
      </div>

      {/* Footer */}
      <div className="lc-post-footer lc-post-footer--article">
        <div className="lc-post-footer-spacer" />
        <button className="lc-read-full-btn">
          <span className="lc-show-more-text">Read Full Article</span>
          <img src={imgCaretRightArt} alt="" className="lc-caret-right-icon" />
        </button>
        <button className="lc-post-share-btn">
          <img src={imgShareFatArt} alt="" className="lc-share-icon" />
        </button>
      </div>
    </div>
  )
}

// ── LiveCoveragePage ──────────────────────────────────────────────────────
export default function LiveCoveragePage({ visible, onBack }: { visible: boolean; onBack: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastY = useRef(0)
  const [toolbarHidden, setToolbarHidden] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastHiding, setToastHiding] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastLinkLabel, setToastLinkLabel] = useState<string | null>(null)
  const [showTimeline, setShowTimeline] = useState(false)
  const [shareSheetVisible, setShareSheetVisible] = useState(false)
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

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const y = el.scrollTop
    if (y > lastY.current && y > 60) setToolbarHidden(true)
    else if (y < lastY.current) setToolbarHidden(false)
    lastY.current = y
  }, [])

  return (
    <div className={`article-page lc-page${visible ? ' article-page--visible' : ''}`}>

      {/* Scrollable content */}
      <div className="article-scroll" ref={scrollRef} onScroll={handleScroll}>
        <FeaturedPost onTimelineTap={() => setShowTimeline(true)} />

        {/* Updates: gray bg container with post cards */}
        <div className="lc-updates">
          <StandardPost time="13 min ago" image={imgStdPost1} headline="DOJ Rests Case After Key Witness Testimony on Ad Auction Manipulation" />
          <div className="lc-post-gap" />
          <OpinionPost time="13 min ago" />
          <div className="lc-post-gap" />
          <StandardPost time="45 min ago" image={imgStdPost2} headline="Google Executive Admits Search Deal Locked Out Rivals for Years" />
          <div className="lc-post-gap" />
          <ArticlePost time="1 hr ago" />
        </div>

        <div className="article-bottom-pad" />
      </div>

      {/* Top blur + gradient */}
      <div className="article-top-blur" />
      <div className="article-top-gradient" />

      {/* Floating status bar */}
      <div className="article-statusbar-overlay">
        <StatusBar transparent />
      </div>

      {/* Bookmark toast */}
      <div
        className={`bookmark-toast${toastVisible ? ' bookmark-toast--visible' : ''}${toastHiding ? ' bookmark-toast--hiding' : ''}`}
        style={{ bottom: toolbarHidden ? 44 : 92 }}
      >
        <span className="bookmark-toast-text">{toastMessage}</span>
        {toastLinkLabel && <a href="#" className="bookmark-toast-link">{toastLinkLabel}</a>}
        <button className="bookmark-toast-close" onClick={hideToast}>
          <X size={20} color="#fff" weight="bold" />
        </button>
      </div>

      {/* Bottom toolbar — exact ArticlePage toolbar */}
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
          <button className="article-pill-btn">
            <img src={imgChat} alt="" className="article-pill-icon" />
          </button>
          <button className="article-pill-btn" onClick={handleBookmark}>
            <BookmarkSimple size={24} weight={bookmarked ? 'fill' : 'regular'} color="#222222" />
          </button>
          <button className="article-pill-btn" onClick={() => setShareSheetVisible(true)}>
            <img src={imgShareFat} alt="" className="article-pill-icon" />
          </button>
        </div>
      </div>

      {/* Event Timeline bottom sheet */}
      <EventTimelineSheet visible={showTimeline} onClose={() => setShowTimeline(false)} />

      {/* Share bottom sheet */}
      <ShareSheet
        visible={shareSheetVisible}
        onClose={() => setShareSheetVisible(false)}
        headline="Google Antitrust Trial: DOJ Rests Case After Key Witness Testimony on Ad Auction Manipulation"
        heroImage={imgFeatured}
      />
    </div>
  )
}
