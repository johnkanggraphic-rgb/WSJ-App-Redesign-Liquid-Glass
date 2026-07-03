import {
  ChartBar,
  Play,
} from '@phosphor-icons/react'

const imgTodayRegular = "https://www.figma.com/api/mcp/asset/0b0ccdcf-6486-4103-8090-ea1e31352362"
const imgTodayFill    = "https://www.figma.com/api/mcp/asset/72d5b9c6-77d1-4a07-ade9-cc16461056b1"

type IconProps = { active: boolean }

const size = 24

export function HomeIcon({ active }: IconProps) {
  return (
    <img
      src={active ? imgTodayFill : imgTodayRegular}
      alt="Home"
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  )
}

const imgMyWSJTopRegular    = "https://www.figma.com/api/mcp/asset/cc42c444-8d6d-467a-87c3-f9e5d3bf623f"
const imgMyWSJBottomRegular = "https://www.figma.com/api/mcp/asset/f7e2950c-48eb-4280-9138-4028eefd5bb4"
const imgMyWSJTopFill       = "https://www.figma.com/api/mcp/asset/5c5fa805-cb1b-4325-ba30-71e610a903d3"
const imgMyWSJBottomFill    = "https://www.figma.com/api/mcp/asset/add2b850-44df-4d48-9841-7cc64fce7100"

export function MyWSJIcon({ active }: IconProps) {
  const topSrc    = active ? imgMyWSJTopFill    : imgMyWSJTopRegular
  const bottomSrc = active ? imgMyWSJBottomFill : imgMyWSJBottomRegular
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{ position: 'absolute', top: '15.63%', left: '12.5%', right: '12.5%', bottom: '44%' }}>
        <img src={topSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '53.12%', left: '12.5%', right: '12.51%', bottom: '18.03%' }}>
        <img src={bottomSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  )
}

export function MarketDataIcon({ active }: IconProps) {
  return <ChartBar size={size} weight={active ? 'fill' : 'regular'} color="#222222" />
}

export function MediaIcon({ active }: IconProps) {
  return <Play size={size} weight={active ? 'fill' : 'regular'} color="#222222" />
}

const imgMoreOutline = "https://www.figma.com/api/mcp/asset/fe6c7014-a771-4d6b-8b89-7e40bb1fac92"
const imgMoreFill    = "https://www.figma.com/api/mcp/asset/b294ce23-d887-4ba7-9857-115bc484d254"

export function MoreIcon({ active }: IconProps) {
  return (
    <img
      src={active ? imgMoreFill : imgMoreOutline}
      alt="More"
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  )
}
