import { useState, useEffect } from 'react'
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

function computePos() {
  const scale = Math.min(window.innerWidth / PHONE_W, (window.innerHeight - PAD * 2) / PHONE_H, 1)
  return { scale }
}

function App() {
  const [pos, setPos] = useState(computePos)
  const [showNotifs, setShowNotifs] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showArticle, setShowArticle] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [articleHeadline, setArticleHeadline] = useState('')
  const [tabBarDark, setTabBarDark] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [showVolumeSheet, setShowVolumeSheet] = useState(false)
  const [showWatchlistSheet, setShowWatchlistSheet] = useState(false)
  const [showAddSymbols, setShowAddSymbols] = useState(false)
  const [showPuzzles, setShowPuzzles] = useState(false)
  const [showPrintEdition, setShowPrintEdition] = useState(false)
  const [showPrintRead, setShowPrintRead] = useState(false)

  useEffect(() => {
    const onResize = () => setPos(computePos())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="stage">
      <div className="iphone" style={{
        transform: `scale(${pos.scale})`,
      }}>
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
                onDarkBg={setTabBarDark}
              />
              <TabBar dark={tabBarDark || activeTab === 3} onTabChange={setActiveTab} />
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
