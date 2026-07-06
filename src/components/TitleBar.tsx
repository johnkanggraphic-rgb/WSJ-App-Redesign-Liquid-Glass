import { Bell, MagnifyingGlass } from '@phosphor-icons/react'
import './TitleBar.css'

export default function TitleBar({ onBellTap, onSearchTap }: { onBellTap?: () => void; onSearchTap?: () => void }) {
  return (
    <div className="titlebar">
      {/* Leading — Bell */}
      <div className="titlebar-leading">
        <button className="titlebar-btn-group" onClick={onBellTap}>
          <Bell size={24} weight="regular" color="#222222" />
        </button>
      </div>

      {/* Center — WSJ Logo */}
      <div className="titlebar-logo-wrap">
        <div className="titlebar-logo">
          <img src="/assets/wsj-logo.svg" alt="The Wall Street Journal" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
      </div>

      {/* Trailing — Search */}
      <div className="titlebar-trailing">
        <button className="titlebar-btn-group" onClick={onSearchTap}>
          <MagnifyingGlass size={24} weight="regular" color="#222222" />
        </button>
      </div>
    </div>
  )
}
