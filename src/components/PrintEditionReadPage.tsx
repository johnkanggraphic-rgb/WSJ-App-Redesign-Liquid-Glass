import { useState } from 'react'
import { CaretLeft, DownloadSimple, DotsThree } from '@phosphor-icons/react'
import StatusBar from './StatusBar'
import PrintEditionOptionsSheet from './PrintEditionOptionsSheet'
import './PrintEditionReadPage.css'

const imgNewspaper = 'https://www.figma.com/api/mcp/asset/918bf87e-9fa2-49b0-9941-52929eb31f6a'

export default function PrintEditionReadPage({ visible, onBack }: {
  visible: boolean
  onBack: () => void
}) {
  const [optionsVisible, setOptionsVisible] = useState(false)

  return (
    <div className={`per-page${visible ? ' per-page--visible' : ''}`}>
      {/* Newspaper content */}
      <div className="per-newspaper-wrap">
        <img src={imgNewspaper} alt="Today's Edition" className="per-newspaper-img" />
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
            <DownloadSimple size={24} color="#6f6f6f" />
          </button>
          <button className="per-pill-btn" onClick={() => setOptionsVisible(v => !v)}>
            <DotsThree size={24} weight="bold" color="#6f6f6f" />
          </button>
        </div>
      </div>
      <PrintEditionOptionsSheet visible={optionsVisible} onClose={() => setOptionsVisible(false)} />
    </div>
  )
}
