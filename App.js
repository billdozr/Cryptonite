import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'

import Store from './src/Store'
import {
  CryptoContainer
} from './src/components'

export default class App extends Component {
  render() {
    return (
      <Provider store={Store({})}>
        <CryptoContainer />
      </Provider>
    )
  }
}
