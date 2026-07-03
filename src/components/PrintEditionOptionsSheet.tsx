import { useState } from 'react'
import { CaretLeft, CaretRight, CaretLineLeft, CaretLineRight } from '@phosphor-icons/react'
import './PrintEditionOptionsSheet.css'
import PrintEditionPagesSheet from './PrintEditionPagesSheet'
import PrintEditionSectionsSheet from './PrintEditionSectionsSheet'

export default function PrintEditionOptionsSheet({ visible, onClose }: {
  visible: boolean
  onClose: () => void
}) {
  const [pagesVisible, setPagesVisible] = useState(false)
  const [sectionsVisible, setSectionsVisible] = useState(false)

  return (
    <>
      <div className={`peos-sheet${visible ? ' peos-sheet--visible' : ''}`}>

        {/* Page navigation controls */}
        <div className="peos-reader-controls">
          <button className="peos-nav-btn peos-shift-down">
            <CaretLineLeft size={20} color="#c0c5cb" />
          </button>
          <button className="peos-nav-btn peos-shift-down">
            <CaretLeft size={20} color="#c0c5cb" />
          </button>
          <div className="peos-page-label peos-shift-down">Page 1/29</div>
          <button className="peos-nav-btn peos-shift-down">
            <CaretRight size={20} color="#28333f" />
          </button>
          <button className="peos-nav-btn peos-shift-down">
            <CaretLineRight size={20} color="#28333f" />
          </button>
        </div>

        <div className="peos-divider" />

        {/* Pages + Sections buttons */}
        <div className="peos-row">
          <button className="peos-btn peos-btn--solid" onClick={() => { setSectionsVisible(false); setPagesVisible(true) }}>Pages</button>
          <button className="peos-btn peos-btn--solid" onClick={() => { setPagesVisible(false); setSectionsVisible(true) }}>Sections</button>
        </div>

        {/* Reset zoom */}
        <div className="peos-row peos-row--center">
          <button className="peos-btn peos-btn--minimal">Reset Zoom</button>
        </div>
      </div>

      <PrintEditionPagesSheet visible={pagesVisible} onClose={() => { setPagesVisible(false); onClose() }} />
      <PrintEditionSectionsSheet visible={sectionsVisible} onClose={() => { setSectionsVisible(false); onClose() }} />
    </>
  )
}
