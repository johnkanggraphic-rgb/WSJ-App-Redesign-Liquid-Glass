import './TitleBar.css'

const imgBell   = "https://www.figma.com/api/mcp/asset/0495eaba-4bb1-4397-a1b9-d7b995d94fec"
const imgSearch = "https://www.figma.com/api/mcp/asset/5bb36d78-3037-4e81-bf53-6b9e298e7f41"
const imgLogo   = "https://www.figma.com/api/mcp/asset/867757ad-edcc-4f55-ac23-2b9a168db1c7"

export default function TitleBar({ onBellTap, onSearchTap }: { onBellTap?: () => void; onSearchTap?: () => void }) {
  return (
    <div className="titlebar">
      {/* Leading — Bell */}
      <div className="titlebar-leading">
        <button className="titlebar-btn-group" onClick={onBellTap}>
          <img src={imgBell} alt="Notifications" className="titlebar-icon" />
        </button>
      </div>

      {/* Center — WSJ Logo */}
      <div className="titlebar-logo-wrap">
        <div className="titlebar-logo">
          <img src={imgLogo} alt="The Wall Street Journal" />
        </div>
      </div>

      {/* Trailing — Search */}
      <div className="titlebar-trailing">
        <button className="titlebar-btn-group" onClick={onSearchTap}>
          <img src={imgSearch} alt="Search" className="titlebar-icon" />
        </button>
      </div>
    </div>
  )
}
