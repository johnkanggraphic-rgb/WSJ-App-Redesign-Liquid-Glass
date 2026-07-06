import { ShareFat } from '@phosphor-icons/react'
import './WatchPage.css'

const VIDEO_CARDS = [
  {
    id: 1,
    flashline: 'Video',
    series: 'WSJ Explains',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    duration: '3:20',
    headline: 'Why the Federal Reserve Matters More Than You Think',
    summary: 'The Fed\'s decisions on interest rates ripple through the entire economy, affecting everything from mortgages to jobs.',
    date: 'Nov. 13',
  },
  {
    id: 2,
    flashline: 'Video',
    series: 'The Future of Everything',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    duration: '5:47',
    headline: 'How AI Is Reshaping Wall Street Trading Floors',
    summary: 'Algorithmic trading has been around for decades, but generative AI is changing the game in ways traders never anticipated.',
    date: 'Nov. 12',
  },
  {
    id: 3,
    flashline: 'Video',
    series: 'WSJ Explains',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    duration: '4:15',
    headline: 'Inside the Global Push to Regulate Artificial Intelligence',
    summary: 'Governments around the world are racing to craft rules for AI, but the technology is moving faster than regulators can keep up.',
    date: 'Nov. 11',
  },
  {
    id: 4,
    flashline: 'Video',
    series: 'Markets',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
    duration: '6:02',
    headline: 'The Hidden Costs of a Strong Dollar on Global Markets',
    summary: 'A surging U.S. dollar creates winners and losers around the world, and the effects reach further than most investors realize.',
    date: 'Nov. 10',
  },
]

export default function WatchPage() {
  return (
    <div className="watch-page">
      <span className="watch-section-strap">Latest Videos</span>
      {VIDEO_CARDS.map((card, i) => (
        <div key={card.id}>
          <div className="watch-card">
            <div className="watch-card-flashline-row">
              <span className="watch-card-flashline">{card.flashline}</span>
              <span className="watch-card-sep">·</span>
              <span className="watch-card-flashline">{card.series}</span>
            </div>
            <div className="watch-card-image-wrap">
              <img src={card.image} alt="" className="watch-card-image" />
              <div className="watch-card-play">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 2L10 6L2.5 10V2Z" fill="white" />
                </svg>
                <span className="watch-card-duration">{card.duration}</span>
              </div>
            </div>
            <h3 className="watch-card-headline">{card.headline}</h3>
            <p className="watch-card-summary">{card.summary}</p>
            <div className="watch-card-footer">
              <span className="watch-card-date">{card.date}</span>
              <button className="watch-card-share-btn">
                <ShareFat size={24} color="#6f6f6f" weight="regular" />
              </button>
            </div>
          </div>
          {i < VIDEO_CARDS.length - 1 && <div className="watch-card-divider" />}
        </div>
      ))}
      <div className="watch-bottom-pad" />
    </div>
  )
}
