import { useState } from 'react'
import { X, CaretRight, Users, CopySimple, Star, Eyeglasses, BookOpen, PlusSquare, PencilSimple, Printer } from '@phosphor-icons/react'
import './NativeShareSheet.css'

const imgThumbnail  = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'
const imgAvatar0    = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
const imgAvatar1    = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face'
const imgAvatar2    = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
const imgAvatar3    = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face'
const imgAvatar4    = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face'
const imgAvatar5    = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face'

const CONTACTS = [
  { name: ['Herland', 'Antezana'], avatar: imgAvatar0 },
  { name: ['Rigo', 'Rangel'],      avatar: imgAvatar1 },
  { name: ['Magico and El...', '2 People'], avatarGroup: [imgAvatar3, imgAvatar2] },
  { name: ['Jenny', 'Court'],      avatar: imgAvatar4 },
  { name: ['Alejandra', 'Delgado'], avatar: imgAvatar5 },
]

const APP_ICONS = [
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%2300a8e8'/%3E%3Ccircle cx='30' cy='30' r='12' fill='none' stroke='white' strokeWidth='2.5'/%3E%3Ccircle cx='30' cy='30' r='5' fill='white'/%3E%3C/svg%3E", label: 'AirDrop' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%2334c759'/%3E%3Crect x='12' y='16' width='36' height='28' rx='5' fill='white'/%3E%3Cpath d='M12 21 L30 32 L48 21' stroke='%2334c759' strokeWidth='2.5' fill='none'/%3E%3C/svg%3E", label: 'Messages' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%230a84ff'/%3E%3Crect x='12' y='16' width='36' height='28' rx='5' fill='white'/%3E%3Cpath d='M12 21 L30 32 L48 21' stroke='%230a84ff' strokeWidth='2.5' fill='none'/%3E%3C/svg%3E", label: 'Mail' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%23fecc02'/%3E%3Crect x='14' y='12' width='32' height='38' rx='4' fill='white'/%3E%3Crect x='18' y='22' width='24' height='2.5' rx='1.25' fill='%23f0a500'/%3E%3Crect x='18' y='28' width='20' height='2.5' rx='1.25' fill='%23f0a500'/%3E%3C/svg%3E", label: 'Notes' },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' rx='14' fill='%23ff3b30'/%3E%3Ccircle cx='30' cy='22' r='8' fill='white'/%3E%3Crect x='18' y='34' width='24' height='4' rx='2' fill='white'/%3E%3Crect x='18' y='42' width='18' height='4' rx='2' fill='white'/%3E%3C/svg%3E", label: 'Reminders' },
]

const ROUND_ACTIONS = [
  { Icon: CopySimple,  label: 'Copy' },
  { Icon: Star,        label: 'Add to Favorites' },
  { Icon: Eyeglasses,  label: 'Add to Reading List' },
  { Icon: BookOpen,    label: 'Add Bookmark' },
]

const LIST_GROUP_1 = [
  { Icon: Eyeglasses,  label: 'Add to Reading List' },
  { Icon: BookOpen,    label: 'Add Bookmark' },
  { Icon: Star,        label: 'Add to Favorites' },
  { Icon: PlusSquare,  label: 'Add to Home Screen' },
]

const LIST_GROUP_2 = [
  { Icon: PencilSimple, label: 'Markup' },
  { Icon: Printer,      label: 'Print' },
]

export default function NativeShareSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [collaborated, setCollaborated] = useState(false)

  return (
    <>
      <div className={`ns-scrim${visible ? ' ns-scrim--visible' : ''}`} onClick={onClose} />
      <div className={`ns-sheet${visible ? ' ns-sheet--visible' : ''}`}>

        {/* Grabber row — titles centered here */}
        <div className="ns-grabber-row">
          <div className="ns-grabber" />
          <div className="ns-grabber-titles">
            <p className="ns-header-title">WSJ</p>
            <p className="ns-header-subtitle">wsj.com</p>
          </div>
        </div>

        {/* Header */}
        <div className="ns-header">
          <div className="ns-header-thumb">
            <img src={imgThumbnail} alt="" className="ns-thumb-img" />
          </div>
          <div className="ns-header-middle">
            <div className="ns-header-titles" />
            <button className="ns-collaborate-btn" onClick={() => setCollaborated(!collaborated)}>
              <Users size={15} weight="fill" color="#222222" />
              <span className="ns-collaborate-label">Collaborate</span>
              <CaretRight size={13} weight="bold" color="#727272" />
            </button>
            <p className="ns-header-hint">Only invited people can edit. <CaretRight size={11} weight="bold" color="#bfbfbf" /></p>
          </div>
          <button className="ns-close-btn" onClick={onClose}>
            <div className="ns-close-pill">
              <X size={17} weight="bold" color="#222222" />
            </div>
          </button>
        </div>

        <div className="ns-separator" />

        {/* Contacts row */}
        <div className="ns-contacts-row">
          {CONTACTS.map((c, i) => (
            <div key={i} className="ns-contact">
              {c.avatarGroup ? (
                <div className="ns-avatar-group">
                  <img src={c.avatarGroup[0]} alt="" className="ns-avatar-group-back" />
                  <img src={c.avatarGroup[1]} alt="" className="ns-avatar-group-front" />
                </div>
              ) : (
                <img src={c.avatar} alt="" className="ns-avatar" />
              )}
              <img src={APP_ICONS[1].src} alt="" className="ns-contact-badge" />
              <div className="ns-contact-name">
                {c.name.map((line, j) => <p key={j}>{line}</p>)}
              </div>
            </div>
          ))}
        </div>

        <div className="ns-separator" />

        {/* App icons row */}
        <div className="ns-app-row">
          {APP_ICONS.map(({ src, label }) => (
            <div key={label} className="ns-app-item">
              <img src={src} alt={label} className="ns-app-icon" />
              <p className="ns-app-label">{label}</p>
            </div>
          ))}
        </div>

        <div className="ns-separator" />

        {/* Round actions */}
        <div className="ns-round-actions-row">
          {ROUND_ACTIONS.map(({ Icon, label }) => (
            <div key={label} className="ns-round-action-item">
              <div className="ns-round-action-btn">
                <Icon size={24} weight="regular" color="#222222" />
              </div>
              <p className="ns-round-action-label">{label}</p>
            </div>
          ))}
        </div>

        {/* List actions */}
        <div className="ns-list-actions">
          <div className="ns-action-group">
            {LIST_GROUP_1.map(({ Icon, label }, i) => (
              <div key={label} className="ns-action-row">
                <Icon size={22} weight="regular" color="#222222" className="ns-action-icon" />
                <div className="ns-action-text">
                  {i > 0 && <div className="ns-action-divider" />}
                  <p className="ns-action-label">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ns-action-group">
            {LIST_GROUP_2.map(({ Icon, label }, i) => (
              <div key={label} className="ns-action-row">
                <Icon size={22} weight="regular" color="#222222" className="ns-action-icon" />
                <div className="ns-action-text">
                  {i > 0 && <div className="ns-action-divider" />}
                  <p className="ns-action-label">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Actions */}
          <div className="ns-edit-actions-row">
            <button className="ns-edit-actions-btn">Edit Actions</button>
          </div>
        </div>

      </div>
    </>
  )
}
