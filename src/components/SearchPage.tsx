import { useState, useRef, useEffect } from 'react'
import './SearchPage.css'
import StatusBar from './StatusBar'

const imgMagnifyingGlass = 'https://www.figma.com/api/mcp/asset/635ae259-7bba-4786-af71-dc08a91f3e16'
const imgCaretLeft       = 'https://www.figma.com/api/mcp/asset/c8603a11-02ff-4cbd-b52f-bb960da640c7'

// iOS-style keypad rows
const KEYS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['⇧','z','x','c','v','b','n','m','⌫'],
  ['123','space','return'],
]

function Keyboard({ onKey }: { onKey: (k: string) => void }) {
  const [shifted, setShifted] = useState(false)
  const [numMode, setNumMode] = useState(false)

  const NUM_KEYS = [
    ['1','2','3','4','5','6','7','8','9','0'],
    ['-','/',':', ';','(',')',  '$','&','@','"'],
    ['#+=','.', ',','?','!', "'", '⌫'],
    ['ABC','space','return'],
  ]

  const rows = numMode ? NUM_KEYS : KEYS

  const handleKey = (k: string) => {
    if (k === '⇧') { setShifted(s => !s); return }
    if (k === '123') { setNumMode(true); return }
    if (k === 'ABC') { setNumMode(false); return }
    if (k === '#+=') return // secondary num mode — no-op for now
    onKey(k)
    if (shifted && k !== '⇧') setShifted(false)
  }

  return (
    <div className="kb-root">
      {rows.map((row, ri) => (
        <div key={ri} className="kb-row">
          {row.map(k => {
            const isSpecial = ['⇧','⌫','123','ABC','#+=','return','space'].includes(k)
            const isSpace   = k === 'space'
            const isReturn  = k === 'return'
            const label = (!numMode && shifted && k.length === 1) ? k.toUpperCase() : k
            return (
              <button
                key={k}
                className={[
                  'kb-key',
                  isSpecial ? 'kb-key--special' : '',
                  isSpace   ? 'kb-key--space'   : '',
                  isReturn  ? 'kb-key--return'  : '',
                  k === '⇧' && shifted ? 'kb-key--active' : '',
                ].filter(Boolean).join(' ')}
                onMouseDown={e => { e.preventDefault(); handleKey(k) }}
              >
                {isSpace ? '' : label}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function SearchPage({ visible, onBack }: {
  visible: boolean
  onBack: () => void
}) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const sizerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => inputRef.current?.focus(), 350)
      return () => clearTimeout(t)
    }
  }, [visible])

  useEffect(() => {
    if (inputRef.current && sizerRef.current) {
      inputRef.current.style.width = sizerRef.current.offsetWidth + 'px'
    }
  }, [query])

  const handleKey = (k: string) => {
    if (k === '⌫') {
      setQuery(q => q.slice(0, -1))
    } else if (k === 'return') {
      // no-op — would trigger search
    } else if (k === 'space') {
      setQuery(q => q + ' ')
    } else {
      setQuery(q => q + k)
    }
  }

  return (
    <div className={`search-page${visible ? ' search-page--visible' : ''}`}>
      <StatusBar />

      {/* Toolbar */}
      <div className="search-toolbar">
        <div className="search-toolbar-leading">
          <button className="notif-back-btn" onClick={onBack}>
            <div className="notif-back-glass">
              <img src={imgCaretLeft} alt="Back" className="titlebar-icon" />
            </div>
          </button>
        </div>
        <span className="search-toolbar-title">Search</span>
        <div className="search-toolbar-trailing" />
      </div>

      {/* Search bar */}
      <div className="search-bar-wrap">
        <div className="search-bar">
          <div className="search-bar-icon-wrap">
            <img src={imgMagnifyingGlass} alt="" className="search-bar-icon" />
          </div>
          <div className="search-bar-field">
            <span className="search-bar-sizer" aria-hidden ref={sizerRef}>{query || ' '}</span>
            <input
              ref={inputRef}
              className="search-bar-input"
              type="text"
              value={query}
              placeholder=""
              readOnly
            />
            <span className="search-bar-caret" />
          </div>
          {query.length > 0 && (
            <button className="search-bar-clear" onMouseDown={e => { e.preventDefault(); setQuery('') }}>
              <span className="search-bar-clear-x">✕</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {query.length === 0 && (
        <div className="search-empty">
          <p className="search-empty-title">Start your search</p>
          <p className="search-empty-body">
            Search for companies, authors, topics, or use a specific query like "Fed rate decision."
          </p>
        </div>
      )}

      {/* iOS keyboard at bottom */}
      <div className="kb-wrap">
        <Keyboard onKey={handleKey} />
      </div>
    </div>
  )
}
