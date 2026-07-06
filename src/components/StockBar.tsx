import { ArrowUp, ArrowDown } from '@phosphor-icons/react'
import './StockBar.css'

type StockState = 'positive' | 'negative'

interface StockItem {
  ticker: string
  percent: string
  state: StockState
}

const stocks: StockItem[] = [
  { ticker: 'DJIA',   percent: '1.13%', state: 'positive' },
  { ticker: 'S&P',    percent: '1.13%', state: 'positive' },
  { ticker: 'NASDAQ', percent: '1.13%', state: 'positive' },
  { ticker: 'DJIA',   percent: '1.13%', state: 'negative' },
  { ticker: 'OIL',    percent: '1.13%', state: 'negative' },
  { ticker: 'GOLD',   percent: '1.13%', state: 'negative' },
  { ticker: 'EUR/USD', percent: '1.13%', state: 'negative' },
  { ticker: 'T-BOND', percent: '1.13%', state: 'negative' },
  { ticker: 'BTC',    percent: '1.13%', state: 'negative' },
]

function StockCell({ ticker, percent, state }: StockItem) {
  const isPositive = state === 'positive'
  return (
    <div className="stock-cell">
      <div className="stock-ticker-group">
        <p className="stock-ticker">{ticker}</p>
        <div className="stock-space-4" />
        <div className="stock-change">
          <div className="stock-arrow">
            {isPositive
              ? <ArrowUp size={16} weight="bold" color="#00a651" />
              : <ArrowDown size={16} weight="bold" color="#d9534f" />
            }
          </div>
          <div className="stock-space-4" />
          <p className={`stock-percent ${isPositive ? 'stock-percent--positive' : 'stock-percent--negative'}`}>
            {percent}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function StockBar() {
  return (
    <div className="stockbar">
      {stocks.map((s, i) => (
        <StockCell key={i} {...s} />
      ))}
    </div>
  )
}
