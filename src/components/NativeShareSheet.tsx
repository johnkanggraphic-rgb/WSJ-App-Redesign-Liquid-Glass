import { useState } from 'react'
import { X, CaretRight, Users, CopySimple, Star, Eyeglasses, BookOpen, PlusSquare, PencilSimple, Printer } from '@phosphor-icons/react'
import './NativeShareSheet.css'

const imgThumbnail  = 'https://www.figma.com/api/mcp/asset/c404890c-087c-43c1-99dc-1bdff08a5d76'
const imgAvatar0    = 'https://www.figma.com/api/mcp/asset/fc7e0d2d-7497-46af-93b2-94fafe2e80aa'
const imgAvatar1    = 'https://www.figma.com/api/mcp/asset/c4102b8b-d755-4370-8449-25ae3be87a8e'
const imgAvatar2    = 'https://www.figma.com/api/mcp/asset/518dc051-4d26-455f-8b1c-012ff8d785f4'
const imgAvatar3    = 'https://www.figma.com/api/mcp/asset/8f97f68b-dbac-4803-b687-38bc643dd1f7'
const imgAvatar4    = 'https://www.figma.com/api/mcp/asset/97195376-7224-451f-8c8d-b76d293d5eeb'
const imgAvatar5    = 'https://www.figma.com/api/mcp/asset/688dae69-2a78-456d-9aa0-a6acacfe4821'
const imgMessages   = 'https://www.figma.com/api/mcp/asset/6105b4b3-6bb3-4813-a095-fdeb5cd6bf91'
const imgAirdrop    = 'https://www.figma.com/api/mcp/asset/940b91bf-6726-439e-97ab-d8fe22b02de3'
const imgMail       = 'https://www.figma.com/api/mcp/asset/4ad7a9e2-4210-49b1-929e-7f3be11247af'
const imgNotes      = 'https://www.figma.com/api/mcp/asset/4df774b8-0858-412d-8071-d88666cfd3ee'
const imgReminders  = 'https://www.figma.com/api/mcp/asset/b45e60c8-bf2b-418e-8656-d0c5f9216fbf'

const CONTACTS = [
  { name: ['Herland', 'Antezana'], avatar: imgAvatar0 },
  { name: ['Rigo', 'Rangel'],      avatar: imgAvatar1 },
  { name: ['Magico and El...', '2 People'], avatarGroup: [imgAvatar3, imgAvatar2] },
  { name: ['Jenny', 'Court'],      avatar: imgAvatar4 },
  { name: ['Alejandra', 'Delgado'], avatar: imgAvatar5 },
]

const APP_ICONS = [
  { src: imgAirdrop,   label: 'AirDrop' },
  { src: imgMessages,  label: 'Messages' },
  { src: imgMail,      label: 'Mail' },
  { src: imgNotes,     label: 'Notes' },
  { src: imgReminders, label: 'Reminders' },
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

        {/* Grabber */}
        <div className="ns-grabber" />

        {/* Header */}
        <div className="ns-header">
          <div className="ns-header-thumb">
            <img src={imgThumbnail} alt="" className="ns-thumb-img" />
          </div>
          <div className="ns-header-middle">
            <div className="ns-header-titles">
              <p className="ns-header-title">WSJ</p>
              <p className="ns-header-subtitle">wsj.com</p>
            </div>
            <button className="ns-collaborate-btn" onClick={() => setCollaborated(!collaborated)}>
              <Users size={15} weight="fill" color="#1a1a1a" />
              <span className="ns-collaborate-label">Collaborate</span>
              <CaretRight size={13} weight="bold" color="#727272" />
            </button>
            <p className="ns-header-hint">Only invited people can edit. <CaretRight size={11} weight="bold" color="#bfbfbf" /></p>
          </div>
          <button className="ns-close-btn" onClick={onClose}>
            <div className="ns-close-pill">
              <X size={17} weight="bold" color="#1a1a1a" />
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
              <img src={imgMessages} alt="" className="ns-contact-badge" />
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
                <Icon size={24} weight="regular" color="#1a1a1a" />
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
                <Icon size={22} weight="regular" color="#1a1a1a" className="ns-action-icon" />
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
                <Icon size={22} weight="regular" color="#1a1a1a" className="ns-action-icon" />
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
