import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const GeoJsonLayer = ({ countryCode }: { countryCode?: string }) => {
    const map = useMap();
    const [geoJsonData, setGeoJsonData] = useState(null);

    useEffect(() => {
        const fetchGeoJson = async() => {
            try {
                const response = await fetch(`/geojson/${countryCode}.json`);
                if (!response.ok) throw new Error('GeoJson file not found');
                
                const data = await response.json();
                setGeoJsonData(data);

                if (data) {
                    const geojsonlayer = L.geoJSON(data);
                    map.fitBounds(geojsonlayer.getBounds());
                }

                const enableScrollZoom = () => map.scrollWheelZoom.enable();
                const disableScrollZoom = () => map.scrollWheelZoom.disable();

                window.addEventListener('keydown', (event) => {
                    if (event.key === 'Control') enableScrollZoom();
                });
                
                window.addEventListener('keyup', (event) => {
                    if (event.key === 'Control') disableScrollZoom();
                });

                return () => {
                    window.removeEventListener('keydown', enableScrollZoom);
                    window.removeEventListener('keyup', disableScrollZoom);
                }

            } catch (error) {
                console.error('Error loading GeoJSON data', error);
            }
        }

        fetchGeoJson();
    }, [countryCode, map])


    return geoJsonData ? (
        <GeoJSON 
            data={geoJsonData}
            style={{
                color: '#FF0000',
                weight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
            }}
        />
    ) : null;
}

const GeoJsonMap = ({ countryCode }: { countryCode?: string }) => {
    return (
        <MapContainer
            className='map-container'
            center={[0, 0]}
            zoom={2}
            scrollWheelZoom={false}
        >
            <TileLayer
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <GeoJsonLayer countryCode={countryCode}/>
        </MapContainer>
    )
}

export default GeoJsonMap;