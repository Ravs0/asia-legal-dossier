import { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { legalSystems } from '../data/dossierData';

// Map legal system IDs to ISO country codes
const isoMap: Record<string, string> = {
  saudi: 'SAU',
  uae: 'ARE',
  china: 'CHN',
  hongkong: 'HKG',
  singapore: 'SGP',
  vietnam: 'VNM',
  indonesia: 'IDN',
  philippines: 'PHL',
  japan: 'JPN',
  southkorea: 'KOR',
  india: 'IND',
  malaysia: 'MYS',
  thailand: 'THA',
  australia: 'AUS',
};

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface Props {
  onSelect: (id: string) => void;
  selected: string | null;
  highlighted?: string[];
}

export function MapView({ onSelect, selected }: Props) {
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);
  const [position, setPosition] = useState({ coordinates: [90, 20], zoom: 1.2 });

  const systemMap = useMemo(() => {
    const map: Record<string, typeof legalSystems[0]> = {};
    legalSystems.forEach(sys => {
      const iso = isoMap[sys.id];
      if (iso) map[iso] = sys;
    });
    return map;
  }, []);

  const handleMoveEnd = (pos: { coordinates: number[]; zoom: number }) => {
    setPosition({ coordinates: pos.coordinates as [number, number], zoom: pos.zoom });
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-dossier-border/50 bg-dossier-bg">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 180,
          center: [90, 20],
        }}
        className="w-full h-full"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates as [number, number]}
          onMoveEnd={handleMoveEnd}
          maxZoom={4}
          minZoom={0.8}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Array<{ rsmKey: string; properties: { ISO_A3: string }; [key: string]: any }> }) =>
              geographies.map((geo: { rsmKey: string; properties: { ISO_A3: string }; [key: string]: any }) => {
                const isoCode = geo.properties.ISO_A3;
                const system = systemMap[isoCode];
                const isSelected = selected && system?.id === selected;
                const hasSystem = !!system;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => system && onSelect(system.id)}
                    onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                      if (system) {
                        const rect = (e.target as Element).getBoundingClientRect();
                        setTooltip({
                          content: `${system.name} • Momentum: ${system.momentum}/10`,
                          x: e.clientX,
                          y: e.clientY - 40,
                        });
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        fill: hasSystem ? `${system.color}30` : '#1f2937',
                        stroke: hasSystem ? system.color : '#374151',
                        strokeWidth: hasSystem ? 1.5 : 0.5,
                        outline: 'none',
                        cursor: hasSystem ? 'pointer' : 'default',
                      },
                      hover: {
                        fill: hasSystem ? `${system.color}60` : '#1f2937',
                        stroke: hasSystem ? system.color : '#374151',
                        strokeWidth: hasSystem ? 2 : 0.5,
                        outline: 'none',
                      },
                      pressed: {
                        fill: hasSystem ? system.color : '#1f2937',
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          
          {/* Pulse markers for high-momentum systems */}
          {legalSystems.filter(s => s.momentum >= 8).map(system => {
            const centroid = getCentroid(system.id);
            if (!centroid) return null;
            return (
              <Marker key={system.id} coordinates={centroid}>
                <circle
                  r={4}
                  fill={system.color}
                  className="animate-pulse"
                  style={{ filter: `drop-shadow(0 0 6px ${system.color})` }}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-3 py-2 text-xs font-medium bg-dossier-panel/95 backdrop-blur border border-dossier-border rounded-lg shadow-xl pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setPosition(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.3, 4) }))}
          className="w-10 h-10 flex items-center justify-center bg-dossier-panel/90 backdrop-blur border border-dossier-border rounded-lg hover:bg-dossier-panelHover transition-colors"
        >
          <span className="text-lg">+</span>
        </button>
        <button
          onClick={() => setPosition(prev => ({ ...prev, zoom: Math.max(prev.zoom / 1.3, 0.8) }))}
          className="w-10 h-10 flex items-center justify-center bg-dossier-panel/90 backdrop-blur border border-dossier-border rounded-lg hover:bg-dossier-panelHover transition-colors"
        >
          <span className="text-lg">−</span>
        </button>
        <button
          onClick={() => setPosition({ coordinates: [90, 20], zoom: 1.2 })}
          className="w-10 h-10 flex items-center justify-center bg-dossier-panel/90 backdrop-blur border border-dossier-border rounded-lg hover:bg-dossier-panelHover transition-colors text-xs"
        >
          ⟲
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 p-3 bg-dossier-panel/90 backdrop-blur border border-dossier-border rounded-lg">
        <p className="text-[10px] font-mono uppercase tracking-wider text-dossier-textDim mb-2">Legal Momentum</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-dossier-accent animate-pulse" />
            <span className="text-xs">High (8-10)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-xs">Medium (6-7)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-dossier-textDim" />
            <span className="text-xs">Emerging (5)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Approximate centroids for our legal systems
function getCentroid(id: string): [number, number] | null {
  const centroids: Record<string, [number, number]> = {
    saudi: [45, 24],
    uae: [54, 24],
    china: [104, 35],
    hongkong: [114, 22],
    singapore: [104, 1],
    vietnam: [108, 14],
    indonesia: [120, -5],
    philippines: [122, 13],
    japan: [138, 36],
    southkorea: [128, 36],
    india: [78, 22],
    malaysia: [102, 4],
    thailand: [100, 15],
    australia: [134, -25],
  };
  return centroids[id] || null;
}
