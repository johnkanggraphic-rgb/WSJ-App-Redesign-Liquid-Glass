import './StatusBar.css'

const imgSignalWifiBattery = "https://www.figma.com/api/mcp/asset/4c444ad0-43e5-42bf-aa14-c94c72fe815a"

export default function StatusBar({ transparent = false }: { transparent?: boolean }) {
  return (
    <div className={`statusbar${transparent ? ' statusbar--transparent' : ''}`}>
      {/* Left — time */}
      <div className="statusbar-left">
        <div className="statusbar-time">
          <p className="statusbar-time-text">9:41</p>
        </div>
      </div>

      {/* Center — Dynamic Island */}
      <div className="statusbar-center">
        <div className="statusbar-dynamic-island">
          <div className="statusbar-di-camera" />
          <div className="statusbar-di-facetime" />
        </div>
      </div>

      {/* Right — Signal/Wifi/Battery */}
      <div className="statusbar-right">
        <div className="statusbar-icons">
          <img src={imgSignalWifiBattery} alt="" width={78.401} height={13} />
        </div>
      </div>
    </div>
  )
}
