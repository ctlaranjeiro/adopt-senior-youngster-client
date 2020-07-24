import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NodeGeocoder from 'node-geocoder';

const mapStyles = {
  width: '800px',
  height: '500px'
};

export class MapContainer extends Component {
    state = {
        places: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    componentDidMount(){
        const options = {
            provider: 'google',
            apiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
            formatterPattern: 'string'
          };
           
          const geocoder = NodeGeocoder(options);
           
          // Using callback
          const res = geocoder.geocode('29 champs elysée paris');

          console.log('res', res);
    }

    displayMarkers = () => {
        return this.state.places.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
            onClick={this.onMarkerClick} />
        })
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };

    render() {
        console.log('userLocation:', this.props.userLocation);
        console.log('volLocation:', this.props.volLocation);
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                lat: 38.7104766,
                lng: -9.1476696
                }}>
                {this.displayMarkers()}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                        <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                </InfoWindow>
            </Map>
            
        );
    }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(MapContainer);