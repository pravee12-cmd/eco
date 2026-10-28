import { Globe2, Layers3, Info, ShieldAlert } from 'lucide-react'
import { LayerSelector } from '../layers/LayerSelector'
import { layerById } from '../../data/environmentLayers'

export function Sidebar({ selectedLayer, onSelectLayer }) {
  const activeLayer = layerById[selectedLayer]

  return (
    <aside className="sidebar-panel">
      <div className="brand-block">
        <div className="brand-icon" aria-hidden="true">
          <Globe2 size={24} />
        </div>
        <div>
          <div className="brand-eyebrow">Environmental Intelligence</div>
          <h1 className="brand-title">EcoScope</h1>
          <p className="brand-subtitle">India Explorer • Phase 1</p>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="section-title">
          <Layers3 size={15} />
          <span>Environmental Layers</span>
          <span className="layer-count-badge">7</span>
        </div>
        <LayerSelector selectedLayer={selectedLayer} onSelectLayer={onSelectLayer} />
      </div>

      {activeLayer && (
        <div className="layer-context-card">
          <div className="context-card-header">
            <Info size={14} />
            <span>Category Metadata</span>
          </div>
          <div className="context-card-body">
            <p className="context-desc">{activeLayer.description}</p>
            <div className="sub-indicator-pills">
              {activeLayer.subIndicators?.map((sub) => (
                <span key={sub} className="sub-pill">{sub}</span>
              ))}
            </div>
            <div className="context-meta-row">
              <span className="meta-label">Optimization:</span>
              <span className="meta-val">
                {activeLayer.betterDirection === 'lower' ? 'Lower is favorable' : 'Higher is favorable'}
              </span>
            </div>
            <div className="context-meta-row">
              <span className="meta-label">Period:</span>
              <span className="meta-val">{activeLayer.reportingPeriod}</span>
            </div>
          </div>
        </div>
      )}

      <div className="demo-disclaimer-banner">
        <div className="banner-title">
          <ShieldAlert size={14} />
          <span>Demonstration Notice</span>
        </div>
        <p>
          Boundary shapes and environmental indicators shown are illustrative demo datasets for Phase 1 interface evaluation and are not verified statutory environmental records.
        </p>
      </div>
    </aside>
  )
}
