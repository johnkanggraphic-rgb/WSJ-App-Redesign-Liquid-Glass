import { useRef, useState, useEffect, useCallback } from 'react'
import { BookmarkSimple, CaretLeft, Envelope, Chat, Gift, ShareFat } from '@phosphor-icons/react'
import './ArticlePage.css'
import StatusBar from './StatusBar'
import AuthorSheet from './AuthorSheet'
import BackstoryPage from './BackstoryPage'
import CommentSheet from './CommentSheet'
import ShareSheet from './ShareSheet'

const imgHero        = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'
const imgInline      = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
const imgAvatar      = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=top'

export default function ArticlePage({ visible, onBack, openComments = false, headline = 'Judge Rules Google Operates Illegal Ad Monopoly', onMiniPlayer, onToolbarChange, onSheetChange, onToast }: {
  visible: boolean
  onBack: () => void
  openComments?: boolean
  headline?: string
  onMiniPlayer?: (info: { flashline: string; headline: string }) => void
  onToolbarChange?: (hidden: boolean) => void
  onSheetChange?: (open: boolean) => void
  onToast?: (opts: { visible: boolean; message?: string; linkLabel?: string | null }) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastY = useRef(0)
  const [toolbarHidden, setToolbarHidden] = useState(false)
  const [authorSheetVisible, setAuthorSheetVisible] = useState(false)
  const [showBackstory, setShowBackstory] = useState(false)
  const [commentSheetVisible, setCommentSheetVisible] = useState(false)
  const [shareSheetVisible, setShareSheetVisible] = useState(false)

  const openSheet = useCallback((setter: (v: boolean) => void) => {
    setter(true)
    onSheetChange?.(true)
  }, [onSheetChange])

  const closeSheet = useCallback((setter: (v: boolean) => void) => {
    setter(false)
    onSheetChange?.(false)
  }, [onSheetChange])

  useEffect(() => {
    if (visible && openComments) {
      setCommentSheetVisible(true)
      onSheetChange?.(true)
    }
    if (!visible) {
      setCommentSheetVisible(false)
      setAuthorSheetVisible(false)
      setShowBackstory(false)
      setShareSheetVisible(false)
      setToolbarHidden(false)
      onToolbarChange?.(false)
      onSheetChange?.(false)
      onToast?.({ visible: false })
    }
  }, [visible, openComments])

  // Bookmark + toast
  const [bookmarked, setBookmarked] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((message: string, linkLabel: string | null) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    onToast?.({ visible: true, message, linkLabel })
    toastTimer.current = setTimeout(() => {
      onToast?.({ visible: false })
    }, 2000)
  }, [onToast])

  const handleBookmark = useCallback(() => {
    const next = !bookmarked
    setBookmarked(next)
    showToast(next ? 'Successfully added' : 'Item successfully removed', next ? 'Go to Save' : null)
  }, [bookmarked, showToast])

  const handleGift = useCallback(() => {
    showToast('Gift link copied', null)
  }, [showToast])


  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const y = el.scrollTop
      if (y > lastY.current && y > 60) {
        setToolbarHidden(true)
        onToolbarChange?.(true)
      } else if (y < lastY.current) {
        setToolbarHidden(false)
        onToolbarChange?.(false)
      }
      lastY.current = y
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`article-page${visible ? ' article-page--visible' : ''}`}>
      {/* Scrollable article content — full height */}
      <div className="article-scroll" ref={scrollRef}>
        {/* Flashline + Headline + Dek */}
        <div className="article-header">
          <span className="article-flashline">Flashline</span>
          <h1 className="article-headline">
            {headline}
          </h1>
          <p className="article-dek">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tristique magna eu lacus blandit fringilla.
          </p>
        </div>

        {/* Hero image */}
        <div className="article-hero-wrap">
          <img src={imgHero} alt="" className="article-hero-img" />
          <div className="article-caption">
            <p>Sawgrass Bay Elementary School in Clermont, Fla., Oct. 5, 2021.</p>
            <p className="article-caption-source">Illustration: Jason Schneider for WSJ</p>
          </div>
        </div>

        {/* Byline */}
        <div className="article-byline">
          <img src={imgAvatar} alt="" className="article-avatar" />
          <div className="article-byline-text">
            <p className="article-byline-name">
              By <span className="article-byline-link" onClick={() => openSheet(setAuthorSheetVisible)}>Hardika Singh</span>
            </p>
            <p className="article-byline-date">November 13, 2023</p>
          </div>
        </div>

        {/* Listen to article */}
        <div className="article-listen" onClick={() => onMiniPlayer?.({ flashline: 'Flashline', headline: 'Judge Rules Google Operates Illegal Ad Monopoly' })}>
          <span className="article-listen-label">Listen to this article</span>
          <span className="article-listen-duration">4 minutes</span>
        </div>

        {/* Body */}
        <div className="article-body">
          <p>Every December for the past decade, we've put on our futuristic glasses to predict the year ahead in tech. Looking back, we've gotten a lot right—and, OK, a few things wrong. Come on, who didn't think <span className="article-link">Harry Potter's augmented-reality adventure</span> would be a smash hit?</p>
          <p>But trust us: This year our predictions are more on-point than ever. In 2025, big loose ends will be tied up, including TikTok's legal troubles and electric vehicles' federal subsidies. Long-awaited promises will be fulfilled, like self-driving Ubers, cleaner-energy data centers and crypto for everyday investors. And, of course, artificial intelligence: AI agents, AI weather forecasters, AI…everything.</p>
          <p>As for us humans, if our longevity-tech predictions pan out, we'll be making these annual forecasts for another 80 years.</p>
        </div>

        {/* Inline image */}
        <div className="article-inline-img-wrap">
          <img src={imgInline} alt="" className="article-inline-img" />
          <p className="article-caption-source article-inline-caption">Illustration: Jason Schneider for WSJ</p>
        </div>

        {/* More body */}
        <div className="article-body">
          <p>Every big (and small) tech company will hype up the promise of AI "agents" this coming year. So far, generative AI has mostly been about creating text, images and videos. But in the next evolution, AI systems don't just create—they do.</p>
          <p>Agents will understand context, learn your preferences and interact with you and other software to get stuff done: booking travel, ordering food, shopping for those new sneakers.</p>
          <p>Another option: the Trump administration. If the court doesn't delay or derail the ban, which takes effect on the eve of the inauguration, the second-term president could help.</p>
          <p>While he can't unilaterally wipe away an act of Congress, the law does allow the president to lift the ban if his administration determines the site is no longer under Chinese control. TikTok has hinted in legal filings that it's hoping for executive action to block the ban or soften its impact.</p>
          <p>Finally, ByteDance, TikTok's Chinese parent company, could decide to sell the app outright. It has said it won't. But if things change, billionaire Frank McCourt is ready to buy; he says he's expecting over $20 billion in capital for what he's calling "The People's Bid." The clock is…well, you know.</p>
        </div>

        {/* Author bio */}
        <div className="article-author-bio">
          <p className="article-author-bio-text">
            <span className="article-author-name">Nicole Nguyen</span>
            {` is a Personal Tech columnist at The Wall Street Journal, covering how technology companies' products and policies affect people's lives. `}
          </p>
          <div className="article-author-actions">
            <button className="article-follow-btn">Follow</button>
            <button className="article-author-icon-btn">
              <Envelope size={20} weight="regular" color="#6f6f6f" className="article-author-icon" />
            </button>
            <button className="article-author-icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="article-author-icon"><path d="M11.73 8.77L17.9 2H16.4L11.06 7.85 6.77 2H2L8.46 11.01 2 18H3.5L9.14 11.83 13.65 18H18.42L11.73 8.77ZM9.89 10.93L9.23 10.01 4.04 3.07H6.03L10.47 9.01L11.13 9.93L16.41 17.07H14.42L9.89 10.93Z" fill="#6f6f6f"/></svg>
            </button>
          </div>
        </div>

        {/* Next for you */}
        <div className="article-next">
          <p className="article-next-strap">Next for you</p>
          <div className="article-next-tabs">
            <span className="article-next-tab article-next-tab--active">Articles</span>
            <span className="article-next-tab">Videos</span>
            <span className="article-next-tab">Podcast</span>
          </div>
          {[1,2,3].map(i => (
            <div key={i} className="article-next-card">
              <div className="article-next-card-text">
                <span className="article-next-flashline">Flashline</span>
                <p className="article-next-headline">Small Unified News Story Card Headline Goes Here</p>
                <span className="article-next-time">6 min read</span>
              </div>
              <img src={imgInline} alt="" className="article-next-thumb" />
            </div>
          ))}
        </div>

        <div className="article-bottom-pad" />
      </div>

      {/* Top blur + gradient (two layers — mask kills backdrop-filter in WebKit) */}
      <div className="article-top-blur" />
      <div className="article-top-gradient" />

      {/* Floating status bar */}
      <div className="article-statusbar-overlay">
        <StatusBar transparent />
      </div>


      {/* Author bottom sheet */}
      <AuthorSheet visible={authorSheetVisible} onClose={() => closeSheet(setAuthorSheetVisible)} />

      {/* Backstory page */}
      <BackstoryPage visible={showBackstory} onBack={() => closeSheet(setShowBackstory)} />

      {/* Comment sheet */}
      <CommentSheet visible={commentSheetVisible} onClose={() => closeSheet(setCommentSheetVisible)} />

      {/* Share sheet */}
      <ShareSheet visible={shareSheetVisible} onClose={() => closeSheet(setShareSheetVisible)} />


      {/* Bottom toolbar */}
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
          <button className="article-pill-btn" onClick={() => openSheet(setShowBackstory)}>
            <img src="/assets/backstory-icon.svg" alt="Backstory" style={{ width: 24, height: 24, objectFit: 'contain', display: 'block' }} />
          </button>
          <button className="article-pill-btn" onClick={() => openSheet(setCommentSheetVisible)}>
            <Chat size={24} weight="regular" color="#222222" />
          </button>
          <button className="article-pill-btn" onClick={handleBookmark}>
            <BookmarkSimple size={24} weight={bookmarked ? 'fill' : 'regular'} color="#222222" />
          </button>
          <button className="article-pill-btn" onClick={handleGift}>
            <Gift size={24} weight="regular" color="#222222" />
          </button>
          <button className="article-pill-btn" onClick={() => openSheet(setShareSheetVisible)}>
            <ShareFat size={24} weight="regular" color="#222222" />
          </button>
        </div>
      </div>
    </div>
  )
}
