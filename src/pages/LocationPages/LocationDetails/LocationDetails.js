import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LocationDetails.css'
import LocationOnMap from '../../../components/LocationCMP/LocationOnMap/LocationOnMap'
import { observer, inject } from 'mobx-react';


@inject('store')
@observer
class LocationDetails extends Component {
  state ={
    showMap:false
  }

  locationStore = this.props.store.locationModule;

  async componentDidMount() {
    const locationId = this.props.match.params._id;
    this.locationStore.getLocationById(locationId)
  }
  toggleMap =()=>{
    let copyOfShowMap = { ...this.state.showMap };
    copyOfShowMap = !(this.state.showMap);
        this.setState({
            showMap: copyOfShowMap
        });
  }

  render() {
    const { location } = this.locationStore;

    return (
      <div className="location-details">
        <div className="details-links"><Link to={`/location`}>Back</Link>
          <Link to={`/locationEdit/${location._id}`}>Edit</Link>
        </div>
        <div className="location-details-body">
          <div className="location-details-row">{location.name}</div>
          <div className="location-details-row">{location.adress}</div>
          <div className="location-details-row">{location.lat}</div>
          <div className="location-details-row">{location.long}</div>
          <div className="location-details-row">{location.category}</div>
          <button onClick={this.toggleMap}>show location on map</button>
          
        {(this.state.showMap? 
        <LocationOnMap googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAT6kgeeG5OSYsEuffWJVuFeRPhnOa0Di0"
        loadingElement={<div style={{ height: `80%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `80%` }} />}
        lat={location.lat}
        long={location.long}
        isMarkerShown={true}/>
        :<div/>)}
        </div>
      </div>
    )
  }
}

export default LocationDetails;
