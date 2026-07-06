import { Check, X } from '@phosphor-icons/react'
import './SearchFilterSheet.css'

function Divider() {
  return <div className="sfs-divider" />
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="sfs-section-header">
      <span className="sfs-section-label">{label}</span>
    </div>
  )
}

function Item({ label, checked, first }: { label: string; checked?: boolean; first?: boolean }) {
  return (
    <div className={`sfs-item${first ? ' sfs-item--first' : ''}`}>
      <span className="sfs-item-label">{label}</span>
      {checked && (
        <div className="sfs-item-check">
          <Check size={18} weight="bold" color="#222222" />
        </div>
      )}
    </div>
  )
}

export default function SearchFilterSheet({ visible, onClose }: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <>
      <div
        className={`sfs-scrim${visible ? ' sfs-scrim--visible' : ''}`}
        onClick={onClose}
      />
      <div className={`sfs-sheet${visible ? ' sfs-sheet--visible' : ''}`}>
        {/* Toolbar */}
        <div className="sfs-toolbar">
          <div className="sfs-grabber" />
          <div className="sfs-toolbar-row">
            <span className="sfs-title">Date Range and Sorting</span>
            <button className="sfs-close-btn" onClick={onClose}>
              <div className="sfs-close-glass">
                <X size={20} weight="bold" color="#222222" />
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="sfs-content">
          {/* Date Range */}
          <SectionHeader label="Date Range" />
          <Item label="Past Day" checked first />
          <Divider />
          <Item label="Past Week" />
          <Divider />
          <Item label="Past Month" />
          <Divider />
          <Item label="Past Year" />
          <Divider />
          <Item label="All" />

          {/* Spacer */}
          <div className="sfs-spacer" />

          {/* Sort */}
          <div className="sfs-sort-section">
            <SectionHeader label="Sort" />
            <Item label="Relevance" checked first />
            <Divider />
            <Item label="Newest to oldest" />
            <Divider />
            <Item label="Oldest to newest" />
            <Divider />
          </div>
        </div>
      </div>
    </>
  )
}
