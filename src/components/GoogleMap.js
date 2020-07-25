import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '450px',
};

export class GoogleMap extends Component {
    state = {
        places: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    componentDidMount(){
        this.googleAPIGeocodingRequest();
    }

    componentDidUpdate(prevProps){
        if (this.props !== prevProps) {
            this.googleAPIGeocodingRequest();
        }
        // if(this.state.)
    }


    googleAPIGeocodingRequest = () => {
        if(this.props.userLocation && this.props.volLocation){
        const userAddress = this.props.userLocation;
        const userFormattedAddress = userAddress.split(' ').join('+');
        const volAddress = this.props.volLocation;
        const volFormattedAddress = volAddress.split(' ').join('+');
        // console.log('address', address);
        // console.log('formatedAdress', userFormattedAddress);

        let places = [];

        //USER GEOCODING
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${userFormattedAddress}&key=${process.env.REACT_APP_GOOGLE_GEOCODING_API}`)
            .then(userGeocoding => {
                // console.log('axios get google API', userGeocoding.data.results[0].geometry.location);
                const lat = userGeocoding.data.results[0].geometry.location.lat;
                const lng = userGeocoding.data.results[0].geometry.location.lng;

                places.push({lat: lat, lng: lng, name:'Your location'});

                //VOLUNTEER GEOCODING
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${volFormattedAddress}&key=${process.env.REACT_APP_GOOGLE_GEOCODING_API}`)
                    .then(volGeocoding => {
                        const lat = volGeocoding.data.results[0].geometry.location.lat;
                        const lng = volGeocoding.data.results[0].geometry.location.lng;

                        places.push({lat: lat, lng: lng, name:`${this.props.volName}'s location`});

                        // console.log('places', places);

                        this.setState({
                            places: places
                        })
                    })

            })
            .catch(err => {
                console.log('Error while getting info from Google API', err);
            })
        }
    }

    displayMarkers = () => {
        return this.state.places.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.lat,
                lng: store.lng
            }} 
            name={store.name}
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
        return (
            <Map className="maps"
                google={this.props.google}
                zoom={9}
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
                        <h6>{this.state.selectedPlace.name}</h6>
                        </div>
                </InfoWindow>
            </Map>
            
        );
    }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(GoogleMap);