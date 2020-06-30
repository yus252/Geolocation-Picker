import React, { Component } from 'react';
import AddressSuggest from './AddressSuggest';
import AddressInput from './AddressInput';
import axios from 'axios';

const MAPBOX_APIKEY = 'pk.eyJ1IjoieXVzMjUyIiwiYSI6ImNrYTZhM2VlcjA2M2UzMm1uOWh5YXhvdGoifQ.ZIzOiYbBfwJsV168m42iFg'

class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    // User has entered something in the address bar
    this.onQuery = this.onQuery.bind(this);

    // User has clicked the clear button
    this.onClear = this.onClear.bind(this);
  }

  onQuery(evt) {
    const query = evt.target.value;

    if (!query.length > 0) {
      this.setState(this.getInitialState());
      return;
    }

    const self = this;
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + query  + '.json?access_token=' + MAPBOX_APIKEY;
    axios.get(url).then(function (response) {
      if(response.data.features.length > 0){
        const place = response.data.features[0];
        const place_name = place.place_name;
        var address = place_name.split(',');
        var city = query;
        var state = '';
        var country = '';
        if(address.length > 0){
          country = address[address.length - 1].trim();
        }

        if(address.length > 1){
          state = address[address.length - 2].trim().split(" ")[0];
        }

        if(address.length > 2){
          city = address[address.length - 3].trim();
        }

        self.setState({
          'address' : {
            'city': city,
            'state': state,
            'country': country
          }
        })
      } else {
        const state = self.getInitialState();
        self.setState(state);
      }
    });
  }

  getInitialState() {
    return {
      query: '',
      address: {
        city: '',
        state: '',
        country: ''
      }
    }
  }

  onClear(evt) {
    console.log(this.state);
    const state = this.getInitialState();
    this.setState(state);
  }


  render() {
    return (
        <div className="container">
          <AddressSuggest
            query={this.state.query}
            onChange={this.onQuery}
            />
          <AddressInput
            street={this.state.address.street}
            city={this.state.address.city}
            state={this.state.address.state}
            country={this.state.address.country}
            />
          <br/>

          <button type="submit" className="btn btn-outline-secondary" onClick={this.onClear}>Clear</button>
        </div>
      );
  }
}

export default AddressForm;
