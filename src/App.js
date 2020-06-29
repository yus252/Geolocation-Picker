import React, { Component } from 'react';
import './App.css';
import AddressForm from './AddressForm';


class App extends Component {
  render() {
    return (

      <div className="container">
        <div className="row">
          <h2>Forward Geocoding</h2>
        </div>

        <AddressForm />

      </div>

    );
  }
}

export default App;
