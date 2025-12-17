import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { gpx as gpxToGeoJSON } from '@tmcw/togeojson'
import { useMapEvents } from 'react-leaflet'

function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng)
        },
    })

    return null
}


function FitBounds({ route }) {
    const map = useMap()

    useEffect(() => {
        if (route.length > 0) {
            map.fitBounds(route)
        }
    }, [route, map])

    return null
}


const TrailMap = ({ latitude, longitude, gpxUrl, pois,  onMapClick = [] }) => {

    const [route, setRoute] = useState([])
   

    useEffect(() => {
        if (!gpxUrl) return

        const loadGpx = async () => {
            try {
                const res = await fetch(gpxUrl)
                const text = await res.text()

                const parser = new DOMParser()
                const xml = parser.parseFromString(text, 'application/xml')

                const geojson = gpxToGeoJSON(xml)

                const coords =
                    geojson.features[0].geometry.coordinates.map(
                        ([lng, lat]) => [lat, lng]
                    )

                setRoute(coords)
            } catch (err) {
                console.error('Failed to load GPX', err)
            }
        }

        loadGpx()
    }, [gpxUrl])

    // Safety check (important for real apps)
    if ((!latitude || !longitude) && route.length === 0) {
        return <p>Map location unavailable.</p>
    }



    const center = route.length > 0
        ? route[0]
        : [latitude, longitude]



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

            {route.length > 0 && (
                <>
                    <Polyline positions={route} />
                    <FitBounds route={route} />
                </>
            )}

            {route.length === 0 && latitude && longitude && (
                <Marker position={[latitude, longitude]}>
                    <Popup>Trail start</Popup>
                </Marker>
            )}





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



            <MapClickHandler onMapClick={onMapClick} />


        </MapContainer>
    )
}

export default TrailMap
