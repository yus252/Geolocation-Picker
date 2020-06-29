import React, { Component } from 'react';
import AddressItem from './AddressItem';

class AddressInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="card"><div className="card-body">
      <AddressItem label="City" id="city" value={this.props.city} placeholder="" />
      <AddressItem label="State" id="state" value={this.props.state}  placeholder="" />
      <AddressItem label="Country" id="country" value={this.props.country} placeholder="" />
      </div></div>
    );
  }
}

export default AddressInput;
