import { useState } from 'react'
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

function App() {
  const [showNotifs, setShowNotifs] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showArticle, setShowArticle] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [articleHeadline, setArticleHeadline] = useState('')
  const [tabBarDark, setTabBarDark] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="stage">
      <div className="iphone">
        <div className="iphone-frame">
          <div className="btn-power" />
          <div className="btn-vol-up" />
          <div className="btn-vol-down" />
          <div className="btn-mute" />

          <div className="iphone-screen">
            <StatusBar />
            <TitleBar onBellTap={() => setShowNotifs(true)} onSearchTap={() => setShowSearch(true)} />
            <TopNav />
            <div className="content-area">
              <TodayFeed
                onArticleTap={(h) => { setArticleHeadline(h); setOpenComments(false); setShowArticle(true) }}
                onCommentTap={(h) => { setArticleHeadline(h); setOpenComments(true); setShowArticle(true) }}
                onDarkBg={setTabBarDark}
              />
              <TabBar dark={tabBarDark} onTabChange={setActiveTab} />
            </div>
            <NotificationsPage visible={showNotifs} onBack={() => setShowNotifs(false)} />
            <SearchPage visible={showSearch} onBack={() => setShowSearch(false)} />
            <MyWSJPage visible={activeTab === 1} onBellTap={() => setShowNotifs(true)} />
            <ArticlePage visible={showArticle} onBack={() => { setShowArticle(false); setOpenComments(false) }} openComments={openComments} headline={articleHeadline} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
