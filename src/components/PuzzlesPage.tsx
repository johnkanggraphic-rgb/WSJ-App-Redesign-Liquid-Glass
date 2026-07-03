import { useRef, useState, useEffect } from 'react'
import { CaretLeft } from '@phosphor-icons/react'
import StatusBar from './StatusBar'
import './PuzzlesPage.css'

const imgHeroPhone    = 'https://www.figma.com/api/mcp/asset/cd91e185-9359-487b-9208-2363abd64e6f'
const imgHeroPhone2   = 'https://www.figma.com/api/mcp/asset/e81d643f-0979-40f4-a3f1-115efe615f2d'
const imgDot          = 'https://www.figma.com/api/mcp/asset/a4c8757b-c805-426b-ab5a-f4875ce09ba9'

const CROSSWORDS = [
  { title: 'Hot Spell',       author: 'Jennifer Cook',  date: 'April 9, 2026' },
  { title: 'Lies!',           author: 'Richard Roe',    date: 'April 8, 2026' },
  { title: 'Mixed Load',      author: 'John Smith',     date: 'April 7, 2026' },
  { title: 'Futile Position', author: 'Mary Major',     date: 'April 6, 2026' },
]

const SUDOKUS = [
  { title: 'April 9',    author: 'Naomi Irving',  date: 'April 9, 2026' },
  { title: 'April 2',    author: 'Peter Ramsey',  date: 'April 2, 2026' },
  { title: 'March 26',   author: 'Lana Ziegler',  date: 'March 26, 2026' },
  { title: 'March 19',   author: 'Kevin Sorenson', date: 'March 19, 2026' },
]

function PuzzleCarousel({ items, collectionLabel }: { items: typeof CROSSWORDS; collectionLabel: string }) {
  return (
    <div className="pz-carousel-track">
      {items.map((item, i) => (
        <div key={i} className="pz-carousel-card">
          <p className="pz-card-title">{item.title}</p>
          <div className="pz-card-meta">
            <span className="pz-card-by">By </span>
            <span className="pz-card-author">{item.author}</span>
          </div>
          <span className="pz-card-date">{item.date}</span>
          <button className="pz-card-play-btn">Play</button>
        </div>
      ))}
      <div className="pz-carousel-end-card">
        <span className="pz-end-label">{collectionLabel}</span>
        <span className="pz-end-view-all">View All</span>
      </div>
    </div>
  )
}

export default function PuzzlesPage({ visible, onBack }: { visible: boolean; onBack: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const heroRef   = useRef<HTMLDivElement>(null)
  const [overHero, setOverHero] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    const hero = heroRef.current
    if (!el || !hero) return
    if (visible) {
      el.scrollTop = 0
      setOverHero(false)
    }
    const onScroll = () => {
      const toolbarH = 115
      const heroTop    = hero.offsetTop - toolbarH
      const heroBottom = hero.offsetTop + hero.offsetHeight - toolbarH
      setOverHero(el.scrollTop >= heroTop && el.scrollTop < heroBottom)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [visible])

  return (
    <div className={`pz-page${visible ? ' pz-page--visible' : ''}`}>
      <StatusBar transparent dark={overHero} />

      {/* Top blur + gradient — same as More page */}
      <div className="pz-top-blur" />
      <div className="pz-top-gradient" />

      {/* Floating toolbar */}
      <div className={`pz-toolbar${overHero ? ' pz-toolbar--light' : ''}`}>
        <div className="pz-toolbar-leading" />
        <span className="pz-toolbar-title">Puzzles</span>
        <div className="pz-toolbar-trailing" />
      </div>

      {/* Bottom back button — same position as article page */}
      <div className="pz-bottom-bar">
        <button className="notif-back-btn" onClick={onBack}>
          <div className="notif-back-glass">
            <CaretLeft size={20} weight="bold" color="#222" />
          </div>
        </button>
      </div>

      {/* Scroll content */}
      <div className="pz-scroll" ref={scrollRef}>

        {/* Hero dark card */}
        <div className="pz-hero-card" ref={heroRef}>
          <div className="pz-hero-body">
            <div className="pz-hero-flashline">
              <span className="pz-flashline-text">TODAY'S SELECTION</span>
              <img src={imgDot} alt="" className="pz-flashline-dot" />
              <span className="pz-flashline-text">CROSSWORD</span>
            </div>
            <div className="pz-hero-text">
              <p className="pz-hero-headline">Table Talk</p>
              <div className="pz-hero-byline">
                <span className="pz-hero-by">By </span>
                <span className="pz-hero-author">Jason Zweig</span>
              </div>
              <span className="pz-hero-date">November 13, 2023</span>
            </div>
            <button className="pz-hero-play-btn">Play</button>
          </div>
          <div className="pz-hero-image-wrap">
            <img src={imgHeroPhone}  alt="" className="pz-hero-img pz-hero-img--1" />
            <img src={imgHeroPhone2} alt="" className="pz-hero-img pz-hero-img--2" />
          </div>
        </div>

        {/* Crosswords section */}
        <div className="pz-section">
          <div className="pz-section-strap">CROSSWORDS</div>
          <PuzzleCarousel items={CROSSWORDS} collectionLabel="Crossword Collection" />
        </div>

        {/* Sudoku section */}
        <div className="pz-section">
          <div className="pz-section-strap">SUDOKU</div>
          <PuzzleCarousel items={SUDOKUS} collectionLabel="Sudoku Collection" />
        </div>

        <div className="pz-bottom-pad" />
      </div>
    </div>
  )
}
