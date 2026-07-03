import { useState, useEffect, useRef } from 'react'
import './App.css'
import StatusBar from './components/StatusBar'
import TitleBar from './components/TitleBar'
import TopNav from './components/TopNav'
import TodayFeed from './components/TodayFeed'
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

  return (
    <div className="stage" ref={stageRef}>
      <div className="iphone" style={{ zoom: scale }}>
        <div className="iphone-frame">
          <div className="btn-power" />
          <div className="btn-vol-up" />
          <div className="btn-vol-down" />
          <div className="btn-mute" />

          <div className="iphone-screen">
            <div className="iphone-screen-mask" />
            <StatusBar transparent={activeTab === 3 || activeTab === 4} dark={activeTab === 3} />
            <TitleBar onBellTap={() => setShowNotifs(true)} onSearchTap={() => setShowSearch(true)} />
            <TopNav />
            <div className="content-area">
              <TodayFeed
                onArticleTap={(h) => { setArticleHeadline(h); setOpenComments(false); setShowArticle(true) }}
                onCommentTap={(h) => { setArticleHeadline(h); setOpenComments(true); setShowArticle(true) }}

              />
              <TabBar dark={activeTab === 3} onTabChange={setActiveTab} />
            </div>
            <NotificationsPage visible={showNotifs} onBack={() => setShowNotifs(false)} />
            <SearchPage visible={showSearch} onBack={() => setShowSearch(false)} />
            <MyWSJPage slidePos={activeTab === 1 ? 'center' : activeTab > 1 ? 'left' : 'right'} onBellTap={() => setShowNotifs(true)} />
            <MarketDataPage slidePos={activeTab === 2 ? 'center' : activeTab > 2 ? 'left' : 'right'} onBellTap={() => setShowNotifs(true)} onSearchTap={() => setShowSearch(true)} onVolumeInfo={() => setShowVolumeSheet(true)} onWatchlistPicker={() => setShowWatchlistSheet(true)} onAddSymbols={() => setShowAddSymbols(true)} />
            <MediaPage slidePos={activeTab === 3 ? 'center' : activeTab > 3 ? 'left' : 'right'} />
            <MorePage slidePos={activeTab === 4 ? 'center' : activeTab > 4 ? 'left' : 'right'} onBellTap={() => setShowNotifs(true)} onExploreTap={() => setShowPuzzles(true)} onPrintEditionTap={() => setShowPrintEdition(true)} />
            <PuzzlesPage visible={showPuzzles} onBack={() => setShowPuzzles(false)} />
            <PrintEditionPage visible={showPrintEdition} onBack={() => setShowPrintEdition(false)} onReadTap={() => setShowPrintRead(true)} />
            <PrintEditionReadPage visible={showPrintRead} onBack={() => setShowPrintRead(false)} />
            <ArticlePage visible={showArticle} onBack={() => { setShowArticle(false); setOpenComments(false) }} openComments={openComments} headline={articleHeadline} />
            <MdInfoSheet
              visible={showVolumeSheet}
              onClose={() => setShowVolumeSheet(false)}
              title="Top Movers"
              body="Top stock gainers and decliners by percent change from NYSE and Nasdaq. Minimum requirements: current trading volume over 50,000, price minimum of $5 and minimum market capitalization of $5 billion."
            />
            <WatchlistPickerSheet visible={showWatchlistSheet} onClose={() => setShowWatchlistSheet(false)} />
            <AddSymbolsSheet visible={showAddSymbols} onClose={() => setShowAddSymbols(false)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
