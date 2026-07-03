import { useState, useRef, useEffect } from 'react'
import './MarketDataPage.css'

const imgBell           = "https://www.figma.com/api/mcp/asset/0495eaba-4bb1-4397-a1b9-d7b995d94fec"
const imgMagnifyingGlass = "https://www.figma.com/api/mcp/asset/9bedbd3e-b823-45b0-8dc5-996fc7c3a00f"
const imgClockCountdown = "https://www.figma.com/api/mcp/asset/f4d984f3-96a9-4feb-aeb9-a2948e9e826f"
const imgArrowDown      = "https://www.figma.com/api/mcp/asset/0f780cbc-72af-4242-a06d-2eaca32ce797"
const imgArrowUp        = "https://www.figma.com/api/mcp/asset/90055443-9136-4c58-b777-9b44daa90292"
const imgMinusMinus     = "https://www.figma.com/api/mcp/asset/c87992f8-478f-4c0c-8052-de018f3608e2"
const imgHeadphones     = "https://www.figma.com/api/mcp/asset/58a18138-63b7-4145-afa7-df5d7a6e65d3"
const imgBookmarkSimple = "https://www.figma.com/api/mcp/asset/09a082d1-a61d-4131-8b39-f541dc8bfc41"
const imgShareFat       = "https://www.figma.com/api/mcp/asset/d47ba93c-2767-413b-8574-1a6b1e7449fb"

const imgSparkFillRed   = "https://www.figma.com/api/mcp/asset/7b94aa48-44c9-4ac3-9f36-057343494a38"
const imgSparkStrokeRed = "https://www.figma.com/api/mcp/asset/bca5625c-842e-4281-a2b7-6eba3af5ef2f"
const imgSparkFillGreen = "https://www.figma.com/api/mcp/asset/a52e5e06-76f0-47d3-a600-dbb46babbcf2"
const imgSparkStrokeGreen = "https://www.figma.com/api/mcp/asset/daec86e5-28d7-4bdf-9d4b-5d34f7154f15"

const imgAdFill = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80'

const imgWlCaretUpDown  = "https://www.figma.com/api/mcp/asset/c780ac6c-fd52-4e0e-8587-43c29b8c5364"
const imgWlFunnelSimple = "https://www.figma.com/api/mcp/asset/4f1554b7-d0ab-47ef-87c4-527b551bc0c0"
const imgWlPlus         = "https://www.figma.com/api/mcp/asset/da41af78-196e-4db7-a51d-d6cdc7f49f38"
const imgWlCaretDown    = "https://www.figma.com/api/mcp/asset/5f5c21f3-1ab2-4b51-99ba-491ceb1060ed"
const imgWlSparkGreenFill   = "https://www.figma.com/api/mcp/asset/eb075eb6-a86e-47ee-8aaa-4e9a4a850356"
const imgWlSparkGreenStroke = "https://www.figma.com/api/mcp/asset/15f6e8ce-6c2b-482d-92ec-a5c29b39686e"
const imgWlSparkRedFill     = "https://www.figma.com/api/mcp/asset/94c2a9dd-abc2-47e3-be4e-3986adb2422a"
const imgWlSparkRedStroke   = "https://www.figma.com/api/mcp/asset/eff8601b-d951-4ae8-a007-315a90469446"
const imgWlArrowUp          = "https://www.figma.com/api/mcp/asset/b3b32616-bdcb-4dde-bdeb-3a2fb71262d6"
const imgWlArrowDown        = "https://www.figma.com/api/mcp/asset/87be56cc-56bb-4a71-aa5f-87c06d6eb50d"
const imgWlMinusMinus       = "https://www.figma.com/api/mcp/asset/2e7776ec-237a-4c33-8664-c64d5448e49b"
const imgWlHeadphones       = "https://www.figma.com/api/mcp/asset/a94c3ef5-5dad-4e9b-97a7-b587a31c91d8"
const imgWlBookmark         = "https://www.figma.com/api/mcp/asset/7f9045b4-a2bd-4678-9c10-5016fae0d189"

const TABS = ['Overview', 'Watchlist']

type Direction = 'up' | 'down' | 'flat'

type MarketCardData = {
  name: string
  price: string
  pct: string
  direction: Direction
}

const MARKET_CARDS_US: MarketCardData[] = [
  { name: 'S&P 500',   price: '6,716.33',  pct: '-8.83%',  direction: 'down' },
  { name: 'Dow Jones', price: '46,315.27', pct: '+0.37%',  direction: 'up'   },
  { name: 'Nasdaq',    price: '22,631.48', pct: '+0.44%',  direction: 'up'   },
  { name: 'Russell',   price: '2,211.04',  pct: '+0.54%',  direction: 'up'   },
  { name: 'Gold',      price: '3,869.10',  pct: '+0.72%',  direction: 'up'   },
  { name: 'Crude Oil', price: '60.46',     pct: '-2.15%',  direction: 'down' },
]

const MARKET_CARDS_EUROPE: MarketCardData[] = [
  { name: 'STOXX 600', price: '524.18',    pct: '+0.61%',  direction: 'up'   },
  { name: 'DAX',       price: '22,847.40', pct: '+0.83%',  direction: 'up'   },
  { name: 'FTSE 100',  price: '8,612.30',  pct: '-0.24%',  direction: 'down' },
  { name: 'CAC 40',    price: '7,734.05',  pct: '+0.52%',  direction: 'up'   },
  { name: 'IBEX 35',   price: '13,421.10', pct: '+0.38%',  direction: 'up'   },
  { name: 'MIB',       price: '37,890.60', pct: '+0.71%',  direction: 'up'   },
]

const MARKET_CARDS_ASIA: MarketCardData[] = [
  { name: 'Nikkei',    price: '38,405.66', pct: '-1.10%',  direction: 'down' },
  { name: 'Hang Seng', price: '23,118.80', pct: '+0.92%',  direction: 'up'   },
  { name: 'Shanghai',  price: '3,351.44',  pct: '-0.33%',  direction: 'down' },
  { name: 'Kospi',     price: '2,608.19',  pct: '+0.47%',  direction: 'up'   },
  { name: 'ASX 200',   price: '8,214.90',  pct: '+0.15%',  direction: 'up'   },
  { name: 'Sensex',    price: '81,652.30', pct: '-0.58%',  direction: 'down' },
]

const REGION_CARDS: Record<string, MarketCardData[]> = {
  'U.S.':   MARKET_CARDS_US,
  EUROPE: MARKET_CARDS_EUROPE,
  ASIA:   MARKET_CARDS_ASIA,
}

function MarketCard({ name, price, pct, direction }: MarketCardData) {
  const arrowSrc = direction === 'down' ? imgArrowDown : direction === 'up' ? imgArrowUp : imgMinusMinus
  const pctColor = direction === 'down' ? '#e10000' : direction === 'up' ? '#0a8200' : '#6f6f6f'
  const fillSrc   = direction === 'up' ? imgSparkFillGreen   : imgSparkFillRed
  const strokeSrc = direction === 'up' ? imgSparkStrokeGreen : imgSparkStrokeRed
  return (
    <div className="md-card-slot">
      <div className="md-card-inner">
        <div className="md-card-text">
          <span className="md-card-name">{name}</span>
          <div className="md-card-price-row">
            <img src={arrowSrc} alt="" className="md-card-arrow" />
            <span className="md-card-price">{price}</span>
          </div>
          <span className="md-card-pct" style={{ color: pctColor }}>{pct}</span>
        </div>
        <div className="md-card-sparkline">
          {direction !== 'flat' && <>
            <img src={fillSrc}   alt="" className="md-card-spark-fill" />
            <img src={strokeSrc} alt="" className="md-card-spark-stroke" />
          </>}
        </div>
      </div>
    </div>
  )
}

type StockRowProps = {
  ticker: string
  name?: string
  price: string
  change: string
  pctChange?: string
  direction: Direction
}

type TickerBtnProps = { label: string; dir: 'up' | 'down' }

function Sparkline({ direction }: { direction: Direction }) {
  if (direction === 'flat') return <div className="md-sparkline" />
  const fillSrc   = direction === 'up' ? imgSparkFillGreen   : imgSparkFillRed
  const strokeSrc = direction === 'up' ? imgSparkStrokeGreen : imgSparkStrokeRed
  return (
    <div className="md-sparkline">
      <img src={fillSrc}   alt="" className="md-spark-layer" />
      <img src={strokeSrc} alt="" className="md-spark-layer md-spark-stroke" />
    </div>
  )
}

function StockRow({ ticker, name, price, change, pctChange, direction }: StockRowProps) {
  const arrowSrc    = direction === 'down' ? imgArrowDown : direction === 'up' ? imgArrowUp : imgMinusMinus
  const changeColor = direction === 'down' ? '#e10000'   : direction === 'up' ? '#0a8200'  : '#6f6f6f'
  return (
    <div className="md-stock-row">
      <div className="md-stock-left">
        <span className="md-stock-ticker">{ticker}</span>
        {name && <span className="md-stock-name">{name}</span>}
      </div>
      <Sparkline direction={direction} />
      <div className="md-stock-right">
        <div className="md-stock-price">
          <img src={arrowSrc} alt="" className="md-stock-arrow" />
          <span>{price}</span>
        </div>
        <div className="md-stock-change" style={{ color: changeColor }}>
          <span>{change}</span>
          {pctChange && <span>{pctChange}</span>}
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="md-section-header">
      <p className="md-section-title">{title}</p>
    </div>
  )
}

function RowDivider() {
  return <div className="md-row-divider" />
}

function SectionDivider() {
  return <div className="md-section-divider" />
}

function NewsArticle({ headline, tickers, time, timeRed }: {
  headline: string
  tickers: TickerBtnProps[]
  time: string
  timeRed?: boolean
}) {
  return (
    <div className="md-news-article">
      <h3 className="md-news-headline">{headline}</h3>
      <div className="md-tickers-row">
        {tickers.map(t => (
          <div key={t.label} className={`md-ticker-btn md-ticker-btn--${t.dir}`}>
            <img src={t.dir === 'up' ? imgArrowUp : imgArrowDown} alt="" className="md-ticker-arrow" />
            <span>{t.label}</span>
          </div>
        ))}
      </div>
      <div className="md-news-footer">
        <span className="md-news-time" style={{ color: timeRed ? '#e10000' : '#6f6f6f' }}>{time}</span>
        <div className="md-footer-actions">
          <button className="md-action-btn"><img src={imgHeadphones} alt="Listen" /></button>
          <button className="md-action-btn"><img src={imgBookmarkSimple} alt="Save" /></button>
        </div>
      </div>
    </div>
  )
}

const liveUpdates = [
  { time: '1 min ago',  text: 'Inflation Report Shows Price Pressures Eased in March' },
  { time: '14 min ago', text: "Front and Center in This Week's IPOs: Individual Investors" },
  { time: '23 min ago', text: 'Stocks to Watch Today: Intel, Meta, Darden Restaurants, Bullish' },
  { time: '36 min ago', text: 'Mortgage Rates Drop to 6.26%, Lowest Since October' },
  { time: '45 min ago', text: 'Will the Fed Make Small Stocks Beautiful Again?' },
]

const REGIONS = ['U.S.', 'EUROPE', 'ASIA'] as const
type Region = typeof REGIONS[number]

const COUNTDOWN: Record<Region, string> = {
  'U.S.':  'U.S. markets close in 2 hrs',
  EUROPE: 'European markets closed',
  ASIA:   'Asian markets closed',
}

type WlStockData = {
  ticker: string
  name: string
  price: string
  change: string
  pct: string
  direction: Direction
}

const WL_STOCKS: WlStockData[] = [
  { ticker: 'AAPL',  name: 'Apple Inc.',                    price: '$247.26',  change: '+0.41', pct: '+0.17%', direction: 'up'   },
  { ticker: 'CL00',  name: 'Crude Oil Continuous Contract', price: '$58.77',   change: '-0.71', pct: '-1.19%', direction: 'down' },
  { ticker: 'DAII',  name: 'Mercedes-Benz Group AG ADR',    price: '€13.20',   change: '+0.20', pct: '+1.49%', direction: 'up'   },
  { ticker: 'MSFT',  name: 'Microsoft Corp.',               price: '$514.35',  change: '0.00',  pct: '0.00%',  direction: 'flat' },
]

type WlNewsArticle = {
  headline: string
  tickers: { label: string; dir: 'up' | 'down' }[]
  time: string
  timeRed?: boolean
}

const WL_NEWS: WlNewsArticle[] = [
  {
    headline: "AI Tech Is Valued as if AI Is the Next Smartphone. It Isn't.",
    tickers: [{ label: 'AAPL', dir: 'up' }],
    time: '13 min ago',
    timeRed: true,
  },
  {
    headline: "Mercedes-Benz earnings are coming, and perhaps 'nothing looms larger' than this factor",
    tickers: [{ label: 'DAII', dir: 'up' }],
    time: 'Nov. 13',
  },
  {
    headline: "PayPal Stock Cut to Sell at Goldman Sachs. Why Its Tough Year Is Getting Even Rougher.",
    tickers: [{ label: 'PAYP', dir: 'up' }, { label: 'MSFT', dir: 'up' }, { label: 'GS', dir: 'down' }],
    time: 'Nov. 13, 2024',
  },
  {
    headline: "Tech Earnings Are Key to Stock Market Navigating Trump's 'October Surprise'",
    tickers: [{ label: 'AAPL', dir: 'up' }, { label: 'MSFT', dir: 'up' }, { label: 'NVDA', dir: 'down' }],
    time: 'Oct. 13, 2024',
  },
  {
    headline: "Nuclear-Reactor Stocks Are Under the Hammer. Why There's Hope for NuScale Power.",
    tickers: [{ label: 'OKLO', dir: 'up' }, { label: 'NUS', dir: 'up' }, { label: 'WOB', dir: 'down' }],
    time: 'Oct. 13, 2021',
  },
]

function WlSparkline({ direction }: { direction: Direction }) {
  if (direction === 'flat') return <div className="wl-sparkline" />
  const fill   = direction === 'up' ? imgWlSparkGreenFill   : imgWlSparkRedFill
  const stroke = direction === 'up' ? imgWlSparkGreenStroke : imgWlSparkRedStroke
  return (
    <div className="wl-sparkline">
      <img src={fill}   alt="" className="wl-spark-fill" />
      <img src={stroke} alt="" className="wl-spark-stroke" />
    </div>
  )
}

function WlStockRow({ ticker, name, price, change, pct, direction }: WlStockData) {
  const arrowSrc    = direction === 'down' ? imgWlArrowDown : direction === 'up' ? imgWlArrowUp : imgWlMinusMinus
  const amtColor    = direction === 'down' ? '#e10000' : direction === 'up' ? '#0a8200' : '#6f6f6f'
  return (
    <div className="wl-stock-row">
      <div className="wl-stock-left">
        <span className="wl-stock-ticker">{ticker}</span>
        <span className="wl-stock-name">{name}</span>
      </div>
      <WlSparkline direction={direction} />
      <div className="wl-stock-right">
        <div className="wl-price-row">
          <img src={arrowSrc} alt="" className="wl-arrow-icon" />
          <span className="wl-price">{price}</span>
        </div>
        <div className="wl-amts" style={{ color: amtColor }}>
          <span>{change}</span>
          <span>{pct}</span>
        </div>
      </div>
      <button className="wl-caret-btn">
        <img src={imgWlCaretDown} alt="" className="wl-caret-icon" />
      </button>
    </div>
  )
}

function WlNewsCard({ headline, tickers, time, timeRed }: WlNewsArticle) {
  return (
    <div className="wl-news-card">
      <h3 className="wl-news-headline">{headline}</h3>
      <div className="wl-tickers-row">
        {tickers.map(t => (
          <div key={t.label} className={`md-ticker-btn md-ticker-btn--${t.dir}`}>
            <img src={t.dir === 'up' ? imgArrowUp : imgArrowDown} alt="" className="md-ticker-arrow" />
            <span>{t.label}</span>
          </div>
        ))}
      </div>
      <div className="wl-news-footer">
        <span className="wl-news-time" style={{ color: timeRed ? '#e10000' : '#6f6f6f' }}>{time}</span>
        <div className="md-footer-actions">
          <button className="md-action-btn"><img src={imgWlHeadphones} alt="Listen" /></button>
          <button className="md-action-btn"><img src={imgWlBookmark} alt="Save" /></button>
        </div>
      </div>
    </div>
  )
}

function WatchlistContent() {
  return (
    <>
      {/* Header strap */}
      <div className="wl-strap">
        <div className="wl-strap-left">
          <span className="wl-strap-title">My demo picks</span>
          <button className="wl-icon-btn">
            <img src={imgWlCaretUpDown} alt="Sort" className="wl-icon-24" />
          </button>
        </div>
        <div className="wl-strap-right">
          <button className="wl-icon-btn">
            <img src={imgWlFunnelSimple} alt="Filter" className="wl-icon-24" />
          </button>
          <button className="wl-icon-btn">
            <img src={imgWlPlus} alt="Add" className="wl-icon-24" />
          </button>
        </div>
      </div>

      {/* Stock rows */}
      <div className="wl-stock-list">
        {WL_STOCKS.map((s, i) => (
          <div key={s.ticker}>
            {i > 0 && <div className="md-row-divider" />}
            <WlStockRow {...s} />
          </div>
        ))}
      </div>

      <div className="md-spacer-8" />

      {/* Watchlist news */}
      <div className="wl-news-section">
        <div className="wl-news-strap">
          <span className="wl-news-title">Watchlist News</span>
        </div>
        {WL_NEWS.map((a, i) => (
          <div key={i}>
            {i > 0 && <div className="md-section-divider" />}
            <WlNewsCard {...a} />
          </div>
        ))}
      </div>

      {/* Ad */}
      <div className="promo-container">
        <div className="promo-spacer" />
        <div className="promo-inner">
          <p className="promo-label">Advertisement</p>
          <div className="promo-box">
            <img src={imgAdFill} alt="Advertisement" className="promo-fill" />
          </div>
        </div>
        <div className="promo-spacer" />
      </div>
    </>
  )
}

function OverviewContent() {
  const [region, setRegion] = useState<Region>('U.S.')
  const cards = REGION_CARDS[region]

  return (
    <>
      {/* Markets Today */}
      <SectionHeader title="Markets Today" />
      <div className="md-filters-row">
        {REGIONS.map(r => (
          <button
            key={r}
            className={`md-filter${r === region ? ' md-filter--active' : ''}`}
            onClick={() => setRegion(r)}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="md-countdown">
        <img src={imgClockCountdown} alt="" className="md-clock-icon" />
        <span className="md-countdown-text">{COUNTDOWN[region]}</span>
      </div>
      <div className="md-cards-scroll">
        {cards.map(c => <MarketCard key={c.name} {...c} />)}
        <div className="md-cards-end-spacer" />
      </div>

      <SectionDivider />

      {/* Live story */}
      <div className="md-live-card">
        <div className="md-live-tag">
          <span className="md-live-dot" />
          <span className="md-live-label">Live</span>
        </div>
        <div className="md-space-8" />
        <h2 className="md-story-headline">Inflation Report Shows Price Pressures Eased in March</h2>
        <div className="md-space-8" />
        <p className="md-story-summary">Inflation slowed to 2.4% in the 12 months through March, as measured by the consumer-price index.</p>
        <div className="md-space-20" />
        <div className="md-updates-scroll">
          {liveUpdates.map((u, i) => (
            <div key={i} className="md-update-item">
              {i > 0 && <div className="md-update-vdivider" />}
              <div className="md-update-content">
                <span className="md-update-time">{u.time}</span>
                <div className="md-space-8" />
                <p className="md-update-text">{u.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="md-space-8" />
        <div className="md-live-footer">
          <span className="md-view-all">View All Updates</span>
          <button className="md-action-btn"><img src={imgShareFat} alt="Share" /></button>
        </div>
      </div>

      <div className="md-spacer-8" />

      {/* U.S. Market Summary */}
      <SectionHeader title="U.S. Market Summary" />
      <div className="md-vibe-snapshot">
        <p className="md-vibe-text">More securities on NASDAQ and NYSE are advancing vs. declining</p>
        <div className="md-bar-labels">
          <span>2911 Decliners</span>
          <span>650 Unchanged</span>
          <span>Advancers</span>
        </div>
        <div className="md-bar-chart">
          <div className="md-bar-red" />
          <div className="md-bar-beige" />
          <div className="md-bar-green" />
        </div>
        <p className="md-bar-disclaimer">Data as of Sep 23, 3:50:15 PM EDT</p>
      </div>
      <SectionDivider />

      {/* Trending by Volume */}
      <SectionHeader title="Trending by Volume" />
      <div className="md-stock-list">
        <StockRow ticker="LAC"  name="Lithium Americas Corp."       price="321.87M"  change="-11.20"       pctChange="-24.24%" direction="down" />
        <RowDivider />
        <StockRow ticker="RAI"  name="Rezolve AI PLC"               price="55.25M"   change="+1.30"        pctChange="+23.23%" direction="up" />
        <RowDivider />
        <StockRow ticker="HCTI" name="Healthcare Triangle Inc."      price="22.18M"   change="+0.25"        pctChange="+12.12%" direction="up" />
        <RowDivider />
        <StockRow ticker="FBIO" name="Fortress Biotech Inc."         price="4.72M"    change="-1115.20"     pctChange="-21.21%" direction="down" />
        <RowDivider />
        <StockRow ticker="REIT" name="Reitar Logtech Holdings Ltd."  price="3.47M"    change="-115,739.30"  pctChange="-32.32%" direction="down" />
      </div>
      <div className="md-how-volume">
        <span>How do we track volume?</span>
      </div>
      <SectionDivider />

      {/* Related news */}
      <div className="md-news-section">
        <NewsArticle
          headline="Inflation Report Shows Price Pressures Eased in March"
          tickers={[{ label: 'LAC', dir: 'up' }, { label: 'NVDA', dir: 'up' }, { label: 'GOOGL', dir: 'down' }]}
          time="13 min ago"
          timeRed
        />
        <SectionDivider />
        <NewsArticle
          headline="GE Aerospace Stock Is Ever-So-Close to a New Record. How It Can Get There."
          tickers={[{ label: 'GA', dir: 'up' }, { label: 'BA', dir: 'up' }, { label: 'FBIO', dir: 'down' }]}
          time="Nov. 13"
        />
        <SectionDivider />
        <NewsArticle
          headline="Healthcare Triangle Executes Reverse Stock Split"
          tickers={[{ label: 'HCTI', dir: 'up' }]}
          time="Oct. 13, 2024"
        />
      </div>
      <SectionDivider />

      {/* Ad */}
      <div className="promo-container">
        <div className="promo-spacer" />
        <div className="promo-inner">
          <p className="promo-label">Advertisement</p>
          <div className="promo-box">
            <img src={imgAdFill} alt="Advertisement" className="promo-fill" />
          </div>
        </div>
        <div className="promo-spacer" />
      </div>

      {/* Bond Yields */}
      <SectionHeader title="Bond Yields" />
      <div className="md-stock-list">
        <StockRow ticker="U.S. 10 Yr"     price="4.083%" change="-0.031"  direction="down" />
        <RowDivider />
        <StockRow ticker="Germany 10 Yr"  price="3.942%" change="0.00"    direction="flat" />
        <RowDivider />
        <StockRow ticker="Italy 10 Yr"    price="3.823%" change="-0.021"  direction="down" />
        <RowDivider />
        <StockRow ticker="Spain 10 Yr"    price="3.624%" change="+0.001"  direction="up" />
        <RowDivider />
        <StockRow ticker="U.K. 10 Yr"     price="3.561%" change="-0.056"  direction="down" />
        <RowDivider />
        <StockRow ticker="Japan 10 Yr"    price="3.942%" change="0.00"    direction="flat" />
      </div>
      <div className="md-spacer-8" />

      {/* Futures */}
      <SectionHeader title="Futures" />
      <div className="md-stock-list">
        <StockRow ticker="Crude Oil"       price="$60.46"      change="-1.32"   pctChange="-2.15%"  direction="down" />
        <RowDivider />
        <StockRow ticker="Gold"            price="$3,869.10"   change="+28.20"  pctChange="+0.72%"  direction="up" />
        <RowDivider />
        <StockRow ticker="Silver"          price="$46.415"     change="-1.264"  pctChange="-2.65%"  direction="down" />
        <RowDivider />
        <StockRow ticker="DJIA Futures"    price="$46,775"     change="0.00"    pctChange="0.00%"   direction="flat" />
        <RowDivider />
        <StockRow ticker="S&P 500 Futures" price="$77.25"      change="+47.00"  pctChange="+0.04%"  direction="up" />
        <RowDivider />
        <StockRow ticker="Nasdaq Futures"  price="$25,088.50"  change="0.00"    pctChange="0.00%"   direction="flat" />
      </div>
      <div className="md-spacer-8" />

      {/* Currencies */}
      <SectionHeader title="Currencies" />
      <div className="md-stock-list">
        <StockRow ticker="Euro"         price="$1.172"  change="-0.0013" pctChange="-0.11%"  direction="down" />
        <RowDivider />
        <StockRow ticker="Yen"          price="¥147.17" change="-0.09"   pctChange="-0.06%"  direction="up" />
        <RowDivider />
        <StockRow ticker="Pound"        price="$1.3440" change="-0.0036" pctChange="-0.27%"  direction="down" />
        <RowDivider />
        <StockRow ticker="Swiss Franc"  price="$0.783"  change="0.00"    pctChange="0.00%"   direction="flat" />
        <RowDivider />
        <StockRow ticker="Australian $" price="$0.6593" change="0.0019"  pctChange="0.12%"   direction="up" />
        <RowDivider />
        <StockRow ticker="Canadian $"   price="$1.3969" change="0.00"    pctChange="0.00%"   direction="flat" />
      </div>
      <div className="md-spacer-8" />

      {/* Cryptocurrencies */}
      <SectionHeader title="Cryptocurrencies" />
      <div className="md-stock-list">
        <StockRow ticker="Bitcoin"   price="$119,009.34" change="-2,515.22" pctChange="-2.14%"  direction="down" />
        <RowDivider />
        <StockRow ticker="Ethereum"  price="$4,469.15"   change="+134.53"   pctChange="+3.10%"  direction="up" />
        <RowDivider />
        <StockRow ticker="XRP"       price="$2.54"       change="-0.898"    pctChange="-1.14%"  direction="down" />
        <RowDivider />
        <StockRow ticker="Solana"    price="$230.66"     change="0.00"      pctChange="0.00%"   direction="flat" />
        <RowDivider />
        <StockRow ticker="Cardano"   price="$0.8620"     change="0.00"      pctChange="0.00%"   direction="flat" />
      </div>
    </>
  )
}

export default function MarketDataPage({ slidePos, onBellTap }: { slidePos?: 'left' | 'center' | 'right'; onBellTap?: () => void }) {
  const [activeTab, setActiveTab] = useState(0)
  const scrollRef  = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const tabbar = el.closest('.iphone-screen')?.querySelector('.tabbar-wrapper') as HTMLElement | null
      const current = el.scrollTop
      if (tabbar) {
        if (current > lastScrollY.current && current > 40) {
          tabbar.classList.add('tabbar--scrolled-down')
        } else {
          tabbar.classList.remove('tabbar--scrolled-down')
        }
      }
      lastScrollY.current = current
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`md-page md-page--${slidePos ?? 'right'}`}>
      {/* Toolbar — height/padding identical to TitleBar and MyWSJ toolbar */}
      <div className="md-toolbar">
        <div className="md-toolbar-leading">
          <button className="md-glass-btn" onClick={onBellTap}>
            <img src={imgBell} alt="Notifications" className="md-btn-icon" />
          </button>
        </div>
        <span className="md-toolbar-title">Market Data</span>
        <div className="md-toolbar-trailing">
          <button className="md-glass-btn">
            <img src={imgMagnifyingGlass} alt="Search" className="md-btn-icon" />
          </button>
        </div>
      </div>

      {/* Tab nav — height matches TopNav / MyWSJ tab nav */}
      <div className="md-tab-nav">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`md-tab${i === activeTab ? ' md-tab--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="md-scroll" ref={scrollRef}>
        {activeTab === 0 && <OverviewContent />}
        {activeTab === 1 && <WatchlistContent />}
        <div className="md-bottom-pad" />
      </div>
    </div>
  )
}
