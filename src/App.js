import React, { Component } from 'react';
import { Map, TileLayer, GeoJson, Circle, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import sectionI from './pct-california-section-i';
import sectionJ from './pct-california-section-j';
import sectionK from './pct-california-section-k';
import './App.css'

const position = [39.03638, -120.12295];

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
      <Map center={position} zoom={13}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
        <GeoJson data={sectionK} />
        <GeoJson data={sectionJ} />
        <GeoJson data={sectionI} />
        <FeatureGroup>
          <EditControl
            position='topright'
            onEdited={this._onEditPath}
            onCreated={this._onCreate}
            onDeleted={this._onDeleted}
            draw={{
              rectangle: false
            }}
          />
          <Circle center={position} radius={200} />
        </FeatureGroup>
      </Map>
    );
  }
}

export default App;
