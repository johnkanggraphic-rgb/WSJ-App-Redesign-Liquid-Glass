import { CaretLeft, Circle } from '@phosphor-icons/react'
import './NotificationsPage.css'
import StatusBar from './StatusBar'

const imgJasonZweig  = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=top'

const notifications = [
  {
    id: 1,
    headline: 'Large Unified News Story Card Headline Goes Here, Extended Headline',
    time: '6 min ago',
    avatar: null,
    bold: null,
    body: null,
  },
  {
    id: 2,
    headline: null,
    time: '6 min ago',
    avatar: imgJasonZweig,
    bold: 'Jason Zweig',
    body: ' just published an article',
  },
]

const filters = ['All', 'Read', 'Unread']

export default function NotificationsPage({ visible, onBack }: {
  visible: boolean
  onBack: () => void
}) {
  return (
    <div className={`notif-page${visible ? ' notif-page--visible' : ''}`}>
      <StatusBar transparent />
      {/* Toolbar */}
      <div className="notif-toolbar">
        <div className="notif-toolbar-leading">
          <button className="notif-back-btn" onClick={onBack}>
            <div className="notif-back-glass">
              <CaretLeft size={20} weight="bold" color="#222" />
            </div>
          </button>
        </div>
        <span className="notif-toolbar-title">Inbox</span>
        <div className="notif-toolbar-trailing" />
      </div>

      {/* Filters */}
      <div className="notif-filters">
        {filters.map((f, i) => (
          <button key={f} className={`notif-filter-btn${i === 0 ? ' notif-filter-btn--active' : ''}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="notif-feed">
        {notifications.map((n) => (
          <div key={n.id}>
            <div className="notif-divider" />
            <div className="notif-card">
              <div className="notif-indicator">
                <Circle size={10} weight="fill" color="#0057a8" />
              </div>
              <div className="notif-card-content">
                <div className="notif-card-text">
                  {n.headline ? (
                    <p className="notif-headline">{n.headline}</p>
                  ) : (
                    <p className="notif-headline">
                      <span className="notif-author">{n.bold}</span>
                      <span className="notif-body">{n.body}</span>
                    </p>
                  )}
                  <span className="notif-time">{n.time}</span>
                </div>
                {n.avatar && (
                  <div className="notif-avatar">
                    <img src={n.avatar} alt="" className="notif-avatar-img" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="notif-divider" />
      </div>
    </div>
  )
}
