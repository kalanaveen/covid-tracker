import { Map as LeafletMap, TileLayer } from "react-leaflet";
import './Maps.css';
import { showDataOnMap } from "./util";
function Maps({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                 {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}
export default Maps;