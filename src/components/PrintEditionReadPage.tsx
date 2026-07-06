import { useState } from 'react'
import { CaretLeft, DownloadSimple, DotsThree } from '@phosphor-icons/react'

const imgReadPage = '/assets/print-read-page.png'
import StatusBar from './StatusBar'
import PrintEditionOptionsSheet from './PrintEditionOptionsSheet'
import './PrintEditionReadPage.css'

export default function PrintEditionReadPage({ visible, onBack }: {
  visible: boolean
  onBack: () => void
}) {
  const [optionsVisible, setOptionsVisible] = useState(false)

  return (
    <div className={`per-page${visible ? ' per-page--visible' : ''}`}>
      {/* Newspaper content */}
      <div className="per-newspaper-wrap">
        <img src={imgReadPage} alt="WSJ Front Page" className="per-newspaper-img" />
      </div>

      {/* Floating status bar */}
      <div className="per-statusbar-overlay">
        <StatusBar transparent />
      </div>

      {/* Bottom toolbar — mirrors ArticlePage exactly */}
      <div className="per-toolbar">
        <div className="per-toolbar-leading">
          <button className="notif-back-btn" onClick={onBack}>
            <div className="notif-back-glass per-back-glass">
              <CaretLeft size={20} weight="bold" color="#222" />
            </div>
          </button>
        </div>
        <div className="per-pill">
          <div className="per-pill-bg" />
          <button className="per-pill-btn">
            <DownloadSimple size={24} color="#222222" />
          </button>
          <button className="per-pill-btn" onClick={() => setOptionsVisible(v => !v)}>
            <DotsThree size={24} weight="bold" color="#222222" />
          </button>
        </div>
      </div>
      <PrintEditionOptionsSheet visible={optionsVisible} onClose={() => setOptionsVisible(false)} />
    </div>
  )
}
