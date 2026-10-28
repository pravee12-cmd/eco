import { layerCatalog } from '../../data/environmentLayers'

export function LayerSelector({ selectedLayer, onSelectLayer }) {
  return (
    <div className="layer-selector" role="radiogroup" aria-label="Environmental category selector">
      <div className="layer-list">
        {layerCatalog.map((layer) => {
          const Icon = layer.icon
          const isSelected = selectedLayer === layer.id

          return (
            <button
              key={layer.id}
              type="button"
              className={`layer-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectLayer(layer.id)}
              role="radio"
              aria-checked={isSelected}
            >
              <div className="layer-icon-wrap" aria-hidden="true">
                <Icon size={18} />
              </div>
              <div className="layer-copy">
                <div className="layer-header-row">
                  <span className="layer-name">{layer.label}</span>
                  <span className="layer-unit-tag">{layer.unit}</span>
                </div>
                <span className="layer-indicator-label">{layer.indicator}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
