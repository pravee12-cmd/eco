import { ChevronRight, RotateCcw, MapPin } from 'lucide-react'

export function Topbar({
  selectedState,
  selectedDistrict,
  onSelectIndia,
  onSelectState,
  onResetMap,
}) {
  const breadcrumbs = [
    { label: 'India', active: !selectedState && !selectedDistrict, onClick: onSelectIndia },
  ]

  if (selectedState) {
    breadcrumbs.push({
      label: selectedState,
      active: selectedState && !selectedDistrict,
      onClick: () => onSelectState(selectedState),
    })
  }

  if (selectedDistrict) {
    breadcrumbs.push({
      label: selectedDistrict,
      active: true,
      onClick: () => {},
    })
  }

  const currentLevelLabel = selectedDistrict
    ? 'District Level'
    : selectedState
      ? 'State Level'
      : 'National Level'

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="level-badge" aria-label="Geographic hierarchy level">
          <MapPin size={13} />
          <span>{currentLevelLabel}</span>
        </div>

        <nav className="breadcrumbs" aria-label="Geographic breadcrumb navigation">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1
            return (
              <span key={crumb.label} className="breadcrumb-segment">
                {idx > 0 && <ChevronRight size={14} className="breadcrumb-separator" />}
                <button
                  type="button"
                  className={`breadcrumb-btn ${crumb.active ? 'active' : ''}`}
                  onClick={crumb.onClick}
                  disabled={crumb.active && isLast}
                  aria-current={crumb.active && isLast ? 'page' : undefined}
                >
                  {crumb.label}
                </button>
              </span>
            )
          })}
        </nav>
      </div>

      <div className="topbar-actions">
        {(selectedState || selectedDistrict) && (
          <button
            type="button"
            className="action-btn secondary"
            onClick={onResetMap}
            title="Reset map view to National Level (India)"
          >
            <RotateCcw size={14} />
            <span>Reset Map</span>
          </button>
        )}
      </div>
    </header>
  )
}
