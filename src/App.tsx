import { useState, useEffect, useRef, useCallback } from 'react'
import { X } from '@phosphor-icons/react'
import './App.css'
import StatusBar from './components/StatusBar'
import TitleBar from './components/TitleBar'
import TopNav from './components/TopNav'
import TodayFeed, { MiniPlayer } from './components/TodayFeed'
import type { MiniPlayerInfo } from './components/TodayFeed'
import TabBar from './components/TabBar'
import NotificationsPage from './components/NotificationsPage'
import SearchPage from './components/SearchPage'
import ArticlePage from './components/ArticlePage'
import MyWSJPage from './components/MyWSJPage'
import MarketDataPage, { MdInfoSheet, WatchlistPickerSheet, AddSymbolsSheet } from './components/MarketDataPage'
import MediaPage from './components/MediaPage'
import MorePage from './components/MorePage'
import PuzzlesPage from './components/PuzzlesPage'
import PrintEditionPage from './components/PrintEditionPage'
import PrintEditionReadPage from './components/PrintEditionReadPage'
import LiveCoveragePage from './components/LiveCoveragePage'
import TopNavPage from './components/TopNavPage'
import SectionSubPage from './components/SectionSubPage'
import ExpandedAudioPlayer from './components/ExpandedAudioPlayer'

const PHONE_W = 405
const PHONE_H = 864
const PAD = 96

function computeScale(w: number, h: number) {
  return Math.min(w / PHONE_W, (h - PAD * 2) / PHONE_H, 1)
}


function App() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(() => computeScale(window.innerWidth, window.innerHeight))
  const [showNotifs, setShowNotifs] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showArticle, setShowArticle] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [articleHeadline, setArticleHeadline] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [showVolumeSheet, setShowVolumeSheet] = useState(false)
  const [showWatchlistSheet, setShowWatchlistSheet] = useState(false)
  const [showAddSymbols, setShowAddSymbols] = useState(false)
  const [showPuzzles, setShowPuzzles] = useState(false)
  const [showPrintEdition, setShowPrintEdition] = useState(false)
  const [showPrintRead, setShowPrintRead] = useState(false)
  const [showLiveCoverage, setShowLiveCoverage] = useState(false)
  const [topNavActive, setTopNavActive] = useState(0)
  const [activeSectionPage, setActiveSectionPage] = useState<string | null>(null)
  const [expandedPlayerInfo, setExpandedPlayerInfo] = useState<{ flashline: string; headline: string } | null>(null)
  const [miniPlayerVisible, setMiniPlayerVisible] = useState(false)
  const [miniPlayerHiding, setMiniPlayerHiding] = useState(false)
  const [miniPlayerInfo, setMiniPlayerInfo] = useState<MiniPlayerInfo>({ flashline: '', headline: '' })
  const miniPlayerTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [navDown, setNavDown] = useState(false)
  const [mediaSubTab, setMediaSubTab] = useState(0)
  const [articleToolbarHidden, setArticleToolbarHidden] = useState(false)
  const [articleSheetOpen, setArticleSheetOpen] = useState(false)
  const [feedToastActive, setFeedToastActive] = useState(false)
  const [articleToast, setArticleToast] = useState<{ visible: boolean; hiding: boolean; message: string; linkLabel: string | null }>({ visible: false, hiding: false, message: '', linkLabel: null })
  const articleToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const articleToastHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleArticleToast = useCallback((opts: { visible: boolean; message?: string; linkLabel?: string | null }) => {
    if (!opts.visible) {
      if (articleToastTimer.current) clearTimeout(articleToastTimer.current)
      if (articleToastHideTimer.current) clearTimeout(articleToastHideTimer.current)
      setArticleToast(t => ({ ...t, hiding: true }))
      articleToastHideTimer.current = setTimeout(() => setArticleToast(t => ({ ...t, visible: false, hiding: false })), 220)
    } else {
      if (articleToastTimer.current) clearTimeout(articleToastTimer.current)
      if (articleToastHideTimer.current) clearTimeout(articleToastHideTimer.current)
      setArticleToast({ visible: true, hiding: false, message: opts.message ?? '', linkLabel: opts.linkLabel ?? null })
    }
  }, [])

  const hideMiniPlayer = useCallback(() => {
    setMiniPlayerHiding(true)
    if (miniPlayerTimer.current) clearTimeout(miniPlayerTimer.current)
    miniPlayerTimer.current = setTimeout(() => {
      setMiniPlayerVisible(false)
      setMiniPlayerHiding(false)
    }, 220)
  }, [])

  const showMiniPlayer = useCallback((info: MiniPlayerInfo) => {
    setMiniPlayerInfo(info)
    setMiniPlayerHiding(false)
    setMiniPlayerVisible(true)
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setScale(computeScale(width, height))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const screenContents = (
    <>
            <div className="iphone-screen-mask" />
            <StatusBar transparent={activeTab === 3 || activeTab === 4} dark={activeTab === 3 && mediaSubTab === 0} />
            <TitleBar onBellTap={() => setShowNotifs(true)} onSearchTap={() => setShowSearch(true)} />
            <TopNav
              activeIndex={topNavActive}
              onTabChange={(i) => setTopNavActive(i)}
            />
            <div className="content-area">
              <TodayFeed
                onArticleTap={(h) => { setArticleHeadline(h); setOpenComments(false); setShowArticle(true) }}
                onCommentTap={(h) => { setArticleHeadline(h); setOpenComments(true); setShowArticle(true) }}
                onLiveTap={() => setShowLiveCoverage(true)}
                onMiniPlayer={showMiniPlayer}
                onNavDown={setNavDown}
                onToastActive={setFeedToastActive}
              />
              <TopNavPage tabIndex={topNavActive} visible={topNavActive > 0} onSectionTap={(s) => setActiveSectionPage(s)} onArticleTap={(h) => { setArticleHeadline(h); setOpenComments(false); setShowArticle(true) }} onNavDown={setNavDown} />
              <TabBar dark={activeTab === 3 && mediaSubTab === 0} onTabChange={setActiveTab} />
            </div>
            <NotificationsPage visible={showNotifs} onBack={() => setShowNotifs(false)} />
            <SearchPage visible={showSearch} onBack={() => setShowSearch(false)} />
            <MyWSJPage slidePos={activeTab === 1 ? 'center' : activeTab > 1 ? 'left' : 'right'} onBellTap={() => setShowNotifs(true)} />
            <MarketDataPage slidePos={activeTab === 2 ? 'center' : activeTab > 2 ? 'left' : 'right'} onBellTap={() => setShowNotifs(true)} onSearchTap={() => setShowSearch(true)} onVolumeInfo={() => setShowVolumeSheet(true)} onWatchlistPicker={() => setShowWatchlistSheet(true)} onAddSymbols={() => setShowAddSymbols(true)} />
            <MediaPage slidePos={activeTab === 3 ? 'center' : activeTab > 3 ? 'left' : 'right'} onTabChange={setMediaSubTab} />
            <MorePage slidePos={activeTab === 4 ? 'center' : activeTab > 4 ? 'left' : 'right'} onBellTap={() => setShowNotifs(true)} onExploreTap={() => setShowPuzzles(true)} onPrintEditionTap={() => setShowPrintEdition(true)} />
            <PuzzlesPage visible={showPuzzles} onBack={() => setShowPuzzles(false)} />
            <PrintEditionPage visible={showPrintEdition} onBack={() => setShowPrintEdition(false)} onReadTap={() => setShowPrintRead(true)} />
            <PrintEditionReadPage visible={showPrintRead} onBack={() => setShowPrintRead(false)} />
            <ArticlePage visible={showArticle} onBack={() => { setShowArticle(false); setOpenComments(false) }} openComments={openComments} headline={articleHeadline} onMiniPlayer={showMiniPlayer} onToolbarChange={setArticleToolbarHidden} onSheetChange={setArticleSheetOpen} onToast={handleArticleToast} />
            <LiveCoveragePage visible={showLiveCoverage} onBack={() => setShowLiveCoverage(false)} />
            <SectionSubPage title={activeSectionPage ?? ''} visible={activeSectionPage !== null} onBack={() => setActiveSectionPage(null)} />
            <MiniPlayer visible={miniPlayerVisible && activeTab !== 3 && !showPrintEdition && !showPrintRead && !articleSheetOpen && !feedToastActive && !articleToast.visible && !showSearch} hiding={miniPlayerHiding} info={miniPlayerInfo} onClose={hideMiniPlayer} onExpand={() => setExpandedPlayerInfo(miniPlayerInfo)} bottomOffset={showNotifs ? 16 : showArticle ? (articleToolbarHidden ? 16 : 96) : (navDown ? 87 : undefined)} />
            {showArticle && (
              <div
                className={`bookmark-toast${articleToast.visible ? ' bookmark-toast--visible' : ''}${articleToast.hiding ? ' bookmark-toast--hiding' : ''}`}
                style={{ bottom: articleToolbarHidden ? 16 : 96, zIndex: 70 }}
              >
                <span className="bookmark-toast-text">{articleToast.message}</span>
                {articleToast.linkLabel !== null && (
                  <a href="#" className="bookmark-toast-link">{articleToast.linkLabel}</a>
                )}
                <button className="bookmark-toast-close" onClick={() => handleArticleToast({ visible: false })}>
                  <X size={20} color="#fff" weight="bold" />
                </button>
              </div>
            )}
            <ExpandedAudioPlayer visible={expandedPlayerInfo !== null} info={expandedPlayerInfo ?? { flashline: '', headline: '' }} onClose={() => setExpandedPlayerInfo(null)} />
            <MdInfoSheet
              visible={showVolumeSheet}
              onClose={() => setShowVolumeSheet(false)}
              title="Top Movers"
              body="Top stock gainers and decliners by percent change from NYSE and Nasdaq. Minimum requirements: current trading volume over 50,000, price minimum of $5 and minimum market capitalization of $5 billion."
            />
            <WatchlistPickerSheet visible={showWatchlistSheet} onClose={() => setShowWatchlistSheet(false)} />
            <AddSymbolsSheet visible={showAddSymbols} onClose={() => setShowAddSymbols(false)} />
    </>
  )

  return (
    <div className="stage" ref={stageRef}>
      <div className="iphone" style={{ zoom: scale }}>
        <div className="iphone-frame">
          <div className="btn-power" />
          <div className="btn-vol-up" />
          <div className="btn-vol-down" />
          <div className="btn-mute" />

          <div className="iphone-screen">
            {screenContents}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
