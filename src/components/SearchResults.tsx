import { ArrowUp, ArrowDown, Headphones, BookmarkSimple, ShareFat, PlusCircle, Play } from '@phosphor-icons/react'
import './SearchResults.css'

const imgCard1 = 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&q=80'
const imgCard2 = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&q=80'
const imgCard3 = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80'
const imgCard4 = 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=200&q=80'
const imgCard5 = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80'
const imgCard6 = 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=200&q=80'

const filterTabs = ['All', 'Market Data', 'Opinion', 'Video', 'Audio']

function Divider() {
  return <div className="sr-divider" />
}

export default function SearchResults() {
  return (
    <div className="sr-root">
      {/* Scrollable filter tabs */}
      <div className="sr-tabs">
        {filterTabs.map((tab, i) => (
          <button key={tab} className={`sr-tab${i === 0 ? ' sr-tab--active' : ''}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Results scroll */}
      <div className="sr-scroll">

        {/* ── Market Data section ─────────────────────────────────────── */}
        <div className="sr-md-section">
          <div className="sr-md-strap">Market Data</div>

          <div className="sr-stock-row">
            <div className="sr-stock-left">
              <div className="sr-stock-ticker-row">
                <span className="sr-stock-ticker">RICH.N0000</span>
                <span className="sr-stock-exchange">(US: Nasdaq)</span>
              </div>
              <span className="sr-stock-name">Richard Piens &amp; Co. PLC</span>
            </div>
            <div className="sr-stock-right">
              <div className="sr-stock-price-row">
                <ArrowUp size={12} weight="bold" color="#0a8200" className="sr-stock-arrow" />
                <span className="sr-stock-price">26.70 USD</span>
              </div>
              <div className="sr-stock-change sr-stock-change--up">
                <span>+1.70</span>
                <span>+0.20%</span>
              </div>
            </div>
          </div>

          <Divider />

          <div className="sr-stock-row">
            <div className="sr-stock-left">
              <div className="sr-stock-ticker-row">
                <span className="sr-stock-ticker">REXP.N0000</span>
                <span className="sr-stock-exchange">(US: Dow Jones)</span>
              </div>
              <span className="sr-stock-name">Richard Pieris Exports PLC</span>
            </div>
            <div className="sr-stock-right">
              <div className="sr-stock-price-row">
                <ArrowDown size={12} weight="bold" color="#e10000" className="sr-stock-arrow" />
                <span className="sr-stock-price">369.50 USD</span>
              </div>
              <div className="sr-stock-change sr-stock-change--down">
                <span>+1.50</span>
                <span>0.14%</span>
              </div>
            </div>
          </div>

          <div className="sr-md-more">
            <a href="#" className="sr-md-more-link">More In Market Data</a>
          </div>
        </div>

        {/* Gray spacer */}
        <div className="sr-spacer" />

        {/* ── News section ────────────────────────────────────────────── */}
        <div className="sr-news-section">

          {/* Card 1: Video */}
          <div className="sr-card">
            <div className="sr-card-body">
              <div className="sr-card-text">
                <span className="sr-label sr-label--grey">Video</span>
                <p className="sr-headline">'Douglas Is Cancelled' Review: Hugh Bonneville's Cyber Satire</p>
              </div>
              <img src={imgCard1} alt="" className="sr-card-img" />
            </div>
            <div className="sr-footer">
              <div className="sr-footer-left">
                <div className="sr-player">
                  <Play size={16} weight="fill" color="#ffffff" className="sr-play-icon" />
                  <span className="sr-player-time">3:20</span>
                </div>
                <span className="sr-timestamp">Nov. 13</span>
              </div>
              <div className="sr-footer-right">
                <button className="sr-action-btn"><ShareFat size={20} weight="regular" color="#6f6f6f" /></button>
                <button className="sr-action-btn"><PlusCircle size={20} weight="regular" color="#6f6f6f" /></button>
              </div>
            </div>
          </div>

          <Divider />

          {/* Card 2: Live */}
          <div className="sr-card">
            <div className="sr-card-body">
              <div className="sr-card-text">
                <div className="sr-live-tag">
                  <div className="sr-live-dot" />
                  <span className="sr-live-text">Live</span>
                </div>
                <p className="sr-headline sr-headline--dark">Stocks to Watch Thursday: PepsiCo, MP Materials, Tilray Brands, Nvidia</p>
              </div>
              <img src={imgCard2} alt="" className="sr-card-img" />
            </div>
            <div className="sr-footer">
              <div className="sr-footer-left">
                <a href="#" className="sr-view-all">View All Updates</a>
                <span className="sr-timestamp sr-timestamp--red" style={{ marginLeft: 16 }}>13 min ago</span>
              </div>
              <div className="sr-footer-right">
                <button className="sr-action-btn"><ShareFat size={20} weight="regular" color="#6f6f6f" /></button>
              </div>
            </div>
          </div>

          <Divider />

          {/* Card 3: Breaking */}
          <div className="sr-card">
            <div className="sr-card-body">
              <div className="sr-card-text">
                <div className="sr-breaking-tag">Breaking</div>
                <p className="sr-headline sr-headline--dark">Mysteries: Richard Osman's 'The Impossible Fortune'</p>
              </div>
              <img src={imgCard3} alt="" className="sr-card-img" />
            </div>
            <div className="sr-footer">
              <div className="sr-footer-left">
                <span className="sr-timestamp sr-timestamp--red">13 min ago</span>
              </div>
              <div className="sr-footer-right">
                <button className="sr-action-btn"><Headphones size={20} weight="regular" color="#6f6f6f" /></button>
                <button className="sr-action-btn"><BookmarkSimple size={20} weight="regular" color="#6f6f6f" /></button>
              </div>
            </div>
          </div>

          <Divider />

          {/* Card 4: Exclusive */}
          <div className="sr-card">
            <div className="sr-card-body">
              <div className="sr-card-text">
                <div className="sr-exclusive-tag">Exclusive</div>
                <p className="sr-headline sr-headline--dark">'Bodyguard of Lies' Review: Looking for Truth in Afghanistan</p>
              </div>
              <img src={imgCard4} alt="" className="sr-card-img" />
            </div>
            <div className="sr-footer">
              <div className="sr-footer-left">
                <span className="sr-read-time">6 min read</span>
              </div>
              <div className="sr-footer-right">
                <button className="sr-action-btn"><Headphones size={20} weight="regular" color="#6f6f6f" /></button>
                <button className="sr-action-btn"><BookmarkSimple size={20} weight="regular" color="#6f6f6f" /></button>
              </div>
            </div>
          </div>

          <Divider />

          {/* Card 5: Opinion */}
          <div className="sr-card sr-card--opinion">
            <div className="sr-card-body">
              <div className="sr-card-text">
                <div className="sr-label sr-label--opinion">
                  Opinion <span className="sr-label-sep">·</span> Allysia Finley
                </div>
                <p className="sr-headline sr-headline--dark">Meet Albert Bourla—Pfizer CEO, Diplomat and Actor</p>
              </div>
              <img src={imgCard5} alt="" className="sr-card-img" />
            </div>
            <div className="sr-footer">
              <div className="sr-footer-left">
                <span className="sr-read-time">6 min read</span>
              </div>
              <div className="sr-footer-right">
                <button className="sr-action-btn"><Headphones size={20} weight="regular" color="#6f6f6f" /></button>
                <button className="sr-action-btn"><BookmarkSimple size={20} weight="regular" color="#6f6f6f" /></button>
              </div>
            </div>
          </div>

          <Divider />

          {/* Card 6: Article with print note */}
          <div className="sr-card">
            <div className="sr-card-body">
              <div className="sr-card-text">
                <span className="sr-label sr-label--grey">Jason Gay</span>
                <p className="sr-headline sr-headline--dark">Robert Redford Made a Sports Movie Masterpiece—but It's Not 'The Natural'</p>
                <p className="sr-print-note">Appeared in the October 10, 2025 print edition as "Robert Redford Made a Sports Movie Masterpiece"</p>
              </div>
              <img src={imgCard6} alt="" className="sr-card-img" />
            </div>
            <div className="sr-footer">
              <div className="sr-footer-left">
                <span className="sr-read-time">6 min read</span>
              </div>
              <div className="sr-footer-right">
                <button className="sr-action-btn"><Headphones size={20} weight="regular" color="#6f6f6f" /></button>
                <button className="sr-action-btn"><BookmarkSimple size={20} weight="regular" color="#6f6f6f" /></button>
              </div>
            </div>
          </div>

        </div>

        <div style={{ height: 80 }} />
      </div>
    </div>
  )
}
