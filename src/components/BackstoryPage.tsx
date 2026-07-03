import { useState, useRef } from 'react'
import { CaretLeft } from '@phosphor-icons/react'
import './BackstoryPage.css'
import StatusBar from './StatusBar'
import FeedbackSheet from './FeedbackSheet'

const imgChatDots   = 'https://www.figma.com/api/mcp/asset/86300a7a-8d27-4fb4-bdd5-a24197d5fb83'

// Key player avatars
const imgPortAuthority = 'https://www.figma.com/api/mcp/asset/ce216a21-a99b-4723-a08e-30101bedee93'
const imgScottKirby    = 'https://www.figma.com/api/mcp/asset/9a2277e3-e492-44bd-9043-9a557d6847c6'
const imgUnitedAirlines = 'https://www.figma.com/api/mcp/asset/c71c4385-7c4a-4a35-a093-3f3ec9cb5577'
const imgSeanDuffy     = 'https://www.figma.com/api/mcp/asset/00970561-d13e-4e77-939a-b79777958632'
const imgAndrewTangel  = 'https://www.figma.com/api/mcp/asset/72a5499d-6d47-404a-b576-e61baf585f9a'

const tabs = ['Background', 'Timeline', 'Key Players', 'Sources']

const timelineItems = [
  { date: 'May 20, 2025', text: 'The FAA orders airlines to reduce flights at Newark Airport, capping arrivals and departures due to aging equipment, staffing shortages, runway construction, and congestion.' },
  { date: 'May 12, 2025', text: 'Acting FAA Administrator Chris Rocheleau assembles an emergency task force to expedite permanent fixes for the technology issues at Newark.' },
  { date: 'May 9, 2025', text: 'Another technology outage occurs at the Philadelphia air-traffic control facility, briefly taking out radar and communications for Newark Airport\'s controllers.' },
  { date: 'May 8, 2025', text: 'Transportation Secretary Sean Duffy outlines a plan to rebuild the U.S. air-traffic control system, prioritizing the Philadelphia facility overseeing Newark.' },
  { date: 'May 4, 2025', text: 'Air traffic controller Jonathan Stewart experiences a near mid-air collision between two aircraft near Newark, leading him to file an internal safety report and take trauma leave.' },
  { date: 'May 2, 2025', text: 'United Airlines announces it will cut 35 daily round trip flights at Newark due to controller-staffing shortfalls following equipment outages.' },
  { date: 'April 28, 2025', text: 'A technology outage at the Philadelphia air-traffic control facility causes controllers to lose contact with planes and their radar screens to go dark for 90 seconds, disrupting flights at Newark.' },
  { date: 'October 17, 2024', text: 'The Port Authority announces plans to build a replacement for Terminal B at Newark Airport.' },
  { date: 'July 20, 2023', text: 'United Airlines scales back flying at Newark to ease congestion after flare-ups.' },
  { date: 'January 12, 2023', text: 'Newark Airport opens a new Terminal A as part of a multibillion-dollar overhaul plan by the Port Authority of New York and New Jersey.' },
  { date: 'October 3, 2022', text: 'Newark Airport officially loses its New York City designation by the International Air Transport Association.' },
  { date: 'January 24, 2019', text: 'Stephen Colbert jokes about Newark Airport during a government shutdown, highlighting its poor reputation.' },
]

const keyPlayers = [
  { avatar: imgPortAuthority, name: 'The Port Authority of New York and New Jersey', bio: 'The Port Authority of New York and New Jersey operates Newark Airport. It has committed to a multibillion-dollar plan to overhaul the airport, including opening a new Terminal A in 2023 and planning a replacement for Terminal B.' },
  { avatar: null, name: 'The FAA (Federal Aviation Administration)', bio: 'The Federal Aviation Administration speeds up technology fixes for Newark\'s air-traffic control operation. It also proposed limiting the hourly arrival rate at Newark. The FAA is acceptable on second reference.' },
  { avatar: imgScottKirby, name: 'Scott Kirby', bio: 'United CEO Scott Kirby has urged people to give Newark a shot. He wrote that the airline will cancel 35 daily round trip flights at Newark starting this weekend after a group of air-traffic controllers took leave following equipment outages.' },
  { avatar: imgUnitedAirlines, name: 'United Airlines', bio: 'The dominant carrier at Newark, operating a significant portion of the airport\'s flights. They have been forced to reduce flights and are investing in hiring to address staffing shortages. After flare-ups, United scaled back flying at Newark to ease congestion and took other steps to shore up its operation in 2023.' },
  { avatar: imgSeanDuffy, name: 'Sean Duffy', bio: 'Transportation Secretary Sean Duffy outlined a plan to rebuild the U.S. air-traffic control system. He said that a software patch put in place Friday had been successful.' },
  { avatar: null, name: 'Jonathan Stewart', bio: 'Jonathan Stewart is an air-traffic controller based out of the Philadelphia facility that oversees the airspace around Newark Airport. He has been an air-traffic controller for more than two decades.' },
  { avatar: imgAndrewTangel, name: 'Andrew Tangel', bio: 'Andrew Tangel is a Wall Street Journal aviation safety reporter. He sat down with Stewart to discuss the reasons for the trauma leave, and more.' },
]

const sources = [
  'FAA Tells Airlines to Cut Back on Newark Airport Flights',
  'United CEO Reassures Customers That Newark Airport Is Safe',
  'Travelers Are Trying Their Hardest to Avoid Newark Airport',
  'An Air Traffic Controller Speaks Out About Newark Airport',
  'Newark Airport Suffers Another Tech Outage, FAA Says',
  'This Air-Traffic Controller Just Averted a Midair Collision. Now He\'s Speaking Out.',
  '\'You Play God\': Air-Traffic Controller Opens Up About Trauma on the Job',
  'TNB Tech Minute: Newark Airport Suffers Tech Outage, Again',
  'Long a New York Punchline, Newark Airport Is Getting Even Worse',
]

export default function BackstoryPage({ visible, onBack }: {
  visible: boolean
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [feedbackVisible, setFeedbackVisible] = useState(false)

  const handleTabClick = (i: number) => {
    setActiveTab(i)
    tabRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }

  return (
    <div className={`backstory-page${visible ? ' backstory-page--visible' : ''}`}>

      {/* Fixed header */}
      <div className="backstory-header">
        <StatusBar />
        <div className="backstory-header-content">
          <div className="backstory-content-tag">
            <span className="backstory-content-tag-text">Backstory</span>
          </div>
          <div className="backstory-title-section">
            <h1 className="backstory-title">Newark Airport Woes</h1>
            <p className="backstory-ai-text">
              This summary was generated with AI and reviewed by an editor.{' '}
              <span className="backstory-ai-link">Read more</span>
              {' '}about how we use AI in our journalism.
            </p>
            <p className="backstory-timestamp">Last Updated: Aug 21, 2025 at 8:00 A.M. ET</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="backstory-tabs">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              ref={el => { tabRefs.current[i] = el }}
              className={`backstory-tab${i === activeTab ? ' backstory-tab--active' : ''}`}
              onClick={() => handleTabClick(i)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="backstory-scroll">

        {/* Background */}
        {activeTab === 0 && (
          <div className="backstory-body">
            <p>Recent technology outages, staffing shortages and ongoing construction at Newark Liberty International Airport have caused widespread flight delays and cancellations, frustrating travelers and raising safety concerns. The Federal Aviation Administration is working to address these issues, but the problems have prompted airlines to reduce flights and travelers to seek alternative airports.</p>
            <p>The problems at Newark stem from multiple factors. Air traffic control issues, including two technology outages in recent weeks, have disrupted radar and communication systems. Staffing shortages, exacerbated by the high-pressure environment, have led to trauma leave for controllers. Runway construction further limits capacity. The FAA has ordered airlines to reduce flights to alleviate congestion, capping arrivals and departures until late October.</p>
            <p>Jonathan Stewart, an air-traffic controller on trauma leave, has spoken out about the intense pressure and mental strain caused by understaffing, outdated technology and the constant threat of near miss incidents. He advocates for better pay, adequate staffing and improved equipment to ensure controller well-being and passenger safety. While the FAA is implementing fixes, including software patches and increased staffing, the long-term solution requires comprehensive upgrades to the air-traffic control system and a commitment to supporting the well-being of air-traffic controllers.</p>
          </div>
        )}

        {/* Timeline */}
        {activeTab === 1 && (
          <div className="backstory-timeline">
            {timelineItems.map((item, i) => (
              <div key={i}>
                <div className="bs-timeline-item">
                  <p className="bs-timeline-date">{item.date}</p>
                  <p className="bs-timeline-text">{item.text}</p>
                </div>
                {i < timelineItems.length - 1 && <div className="bs-divider" />}
              </div>
            ))}
          </div>
        )}

        {/* Key Players */}
        {activeTab === 2 && (
          <div className="backstory-key-players">
            {keyPlayers.map((player, i) => (
              <div key={i}>
                <div className="bs-player-tile">
                  <div className="bs-player-header">
                    {player.avatar && (
                      <img src={player.avatar} alt="" className="bs-player-avatar" />
                    )}
                    <span className="bs-player-name">{player.name}</span>
                  </div>
                  <p className="bs-player-bio">{player.bio}</p>
                </div>
                {i < keyPlayers.length - 1 && <div className="bs-divider" />}
              </div>
            ))}
          </div>
        )}

        {/* Sources */}
        {activeTab === 3 && (
          <div className="backstory-sources">
            <ul className="bs-sources-list">
              {sources.map((source, i) => (
                <li key={i} className="bs-source-item">
                  <span className="bs-source-link">{source}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Bottom toolbar — back + share feedback */}
      <div className="backstory-toolbar">
        <button className="notif-back-btn" onClick={onBack}>
          <div className="notif-back-glass backstory-back-glass">
            <CaretLeft size={20} weight="bold" color="#222" />
          </div>
        </button>
        <button className="backstory-feedback-btn" onClick={() => setFeedbackVisible(true)}>
          <div className="backstory-feedback-glass">
            <img src={imgChatDots} alt="" className="backstory-feedback-icon" />
            <span className="backstory-feedback-label">Share Feedback</span>
          </div>
        </button>
      </div>

      {/* Feedback sheet */}
      <FeedbackSheet visible={feedbackVisible} onClose={() => setFeedbackVisible(false)} />

    </div>
  )
}
