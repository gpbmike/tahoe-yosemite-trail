import React, { Component } from 'react';
import { Map, TileLayer, Polyline, FeatureGroup, Marker, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import sectionI from './pct-california-section-i';
import sectionJ from './pct-california-section-j';
import sectionK from './pct-california-section-k';
import './App.css'

// import chunk from 'lodash/chunk';

const flipIt = (coordinates) => [coordinates[1], coordinates[0]];
const positions = sectionI.features[0].geometry.coordinates.map(flipIt)
  .concat(sectionJ.features[0].geometry.coordinates.map(flipIt))
  .concat(sectionK.features[0].geometry.coordinates.map(flipIt));

// const chunks = chunk(positions, 50);

const start = [39.03638, -120.12295];
const end = [37.8770367, -119.3530855];

/*
  Notes:
    - route can be a single array of coordinates
    - changing to edit mode must chunk the array into ~100 point arrays to not kill browser
      - chunks must overlap, last point of previous chunk must be first point of next so there are no gaps
*/

class App extends Component {

  _onEditPath(e) {
    console.log("Path edited !");
  }

  _onCreate(e) {
    // polyline = e.layer;
    // To edit this polyline call : polyline.handler.enable()
    console.log("Path created !");
  }

  _onDeleted(e) {
    console.log('Path deleted !')
  }

  _mounted(drawControl) {

  }

  render() {
    return (
      <Map bounds={[start, end]}>
        {/* <TileLayer url='http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}' attribution='&copy; <a href="http://www.esri.com/">Esri</a>, National Geographic Society, i-cubed' /> */}
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

        <Polyline positions={positions} />

        <FeatureGroup>
          <EditControl
            position='topright'
            onEdited={this._onEditPath}
            onCreated={this._onCreate}
            onDeleted={this._onDeleted} />

          <Marker position={start}>
            <Popup>
              <span>Start</span>
            </Popup>
          </Marker>

          <Marker position={end}>
            <Popup>
              <span>End</span>
            </Popup>
          </Marker>

          {/* {chunks.map((chunk) => (
            <Polyline positions={chunk} />
          ))} */}
        </FeatureGroup>
      </Map>
    );
  }
}

export default App;
