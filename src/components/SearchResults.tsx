import './SearchResults.css'

const imgArrowUp   = 'https://www.figma.com/api/mcp/asset/882eb807-9f6c-4d43-b72e-928eac9d4a02'
const imgArrowDown = 'https://www.figma.com/api/mcp/asset/0918323b-cd61-4a8f-bad5-a6c4f9fd2d7c'
const imgHeadphones = 'https://www.figma.com/api/mcp/asset/96c3b686-c1ec-47c4-8847-a6f0006b9130'
const imgBookmark  = 'https://www.figma.com/api/mcp/asset/f11d5efe-688c-4b4c-9c17-8f9e47426362'
const imgShare     = 'https://www.figma.com/api/mcp/asset/11588b0b-94b4-4c89-935e-7e580e83c8aa'
const imgPlus      = 'https://www.figma.com/api/mcp/asset/8066bc4e-6351-43f0-b7be-1774e60b421b'
const imgPlay      = 'https://www.figma.com/api/mcp/asset/faccdae1-082b-40f6-b91a-85b0f9bf8596'

const imgCard1 = 'https://www.figma.com/api/mcp/asset/d106f3c8-b549-490c-8d4e-91a49f49e5c1'
const imgCard2 = 'https://www.figma.com/api/mcp/asset/2633c810-0fc8-4887-9258-6fbec372b9cd'
const imgCard3 = 'https://www.figma.com/api/mcp/asset/5f86f0af-e873-4ebe-be46-2ee2d669231f'
const imgCard4 = 'https://www.figma.com/api/mcp/asset/96a7e837-e039-4d1c-9adb-72706eb2fe1a'
const imgCard5 = 'https://www.figma.com/api/mcp/asset/60899a42-5ca3-4b35-8d8d-2e4602b48390'
const imgCard6 = 'https://www.figma.com/api/mcp/asset/d4db0988-9cb8-48ca-a8ca-34b9f627163a'

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
                <img src={imgArrowUp} alt="" className="sr-stock-arrow" />
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
                <img src={imgArrowDown} alt="" className="sr-stock-arrow" />
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
                  <img src={imgPlay} alt="" className="sr-play-icon" />
                  <span className="sr-player-time">3:20</span>
                </div>
                <span className="sr-timestamp">Nov. 13</span>
              </div>
              <div className="sr-footer-right">
                <button className="sr-action-btn"><img src={imgShare} alt="" className="sr-action-icon" /></button>
                <button className="sr-action-btn"><img src={imgPlus} alt="" className="sr-action-icon" /></button>
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
                <button className="sr-action-btn"><img src={imgShare} alt="" className="sr-action-icon" /></button>
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
                <button className="sr-action-btn"><img src={imgHeadphones} alt="" className="sr-action-icon" /></button>
                <button className="sr-action-btn"><img src={imgBookmark} alt="" className="sr-action-icon" /></button>
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
                <button className="sr-action-btn"><img src={imgHeadphones} alt="" className="sr-action-icon" /></button>
                <button className="sr-action-btn"><img src={imgBookmark} alt="" className="sr-action-icon" /></button>
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
                <button className="sr-action-btn"><img src={imgHeadphones} alt="" className="sr-action-icon" /></button>
                <button className="sr-action-btn"><img src={imgBookmark} alt="" className="sr-action-icon" /></button>
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
                <button className="sr-action-btn"><img src={imgHeadphones} alt="" className="sr-action-icon" /></button>
                <button className="sr-action-btn"><img src={imgBookmark} alt="" className="sr-action-icon" /></button>
              </div>
            </div>
          </div>

        </div>

        <div style={{ height: 80 }} />
      </div>
    </div>
  )
}
