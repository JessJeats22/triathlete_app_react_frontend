import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const TrailMap = ({ latitude, longitude, gpxUrl, pois = [] }) => {
  // Safety check (important for real apps)
  if (!latitude || !longitude) {
    return <p>Map location unavailable.</p>
  }

  const center = [latitude, longitude]

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', borderRadius: '16px' }}
    >
    
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      
      <Marker position={center}>
        <Popup>
          Trail start
        </Popup>
      </Marker>

    
      {pois.map(poi => (
        <Marker
          key={poi.id}
          position={[poi.latitude, poi.longitude]}
        >
          <Popup>
            <strong>{poi.name}</strong>
            {poi.description && <p>{poi.description}</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default TrailMap
