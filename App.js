import React, {Component} from 'react';
import {Root} from 'native-base';
import Home from '@custom_components/Home';

export default class App extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <Root>
        <Home />
      </Root>
    );
  }
}
