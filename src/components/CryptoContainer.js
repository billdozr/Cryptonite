import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
  TouchableWithoutFeedback
} from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay'

import FetchCoinData from '../Actions/FetchCoinData'
import CoinCard from './CoinCard'
import CoinDetail from './CoinDetail'

const {height, width} = Dimensions.get('window')

class CryptoContainer extends Component {
  state = {
    selectedId: null,
    openProgress: new Animated.Value(1),
    showClose: false
  }

  componentDidMount() {
    this.props.FetchCoinData()
  }

  _sortedIdsByRank(data) {
    const idsWithRanks = Object.keys(data).map((key) => [key, data[key].rank])
    idsWithRanks.sort((a, b) => a[1] - b[1])
    const ids = idsWithRanks.map((a) => a[0])
    return ids
  }

  renderCoinCard() {
    const { crypto } = this.props
    return this._sortedIdsByRank(crypto.data).map((key) => {
      let coin = crypto.data[key]
      return (
        <TouchableWithoutFeedback
          key={key}
          onPress={() => {
            Animated.timing(
              this.state.openProgress,
              {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
              }
            ).start(() => this.setState({selectedId: key, showClose: false}))
          }}>
          <View>
            <CoinCard
              coin_name={coin.name}
              symbol={coin.symbol}
              price_usd={coin.quotes.USD.price}
              percent_change_24h={coin.quotes.USD.percent_change_24h}
              percent_change_7d={coin.quotes.USD.percent_change_7d}
            />
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }

  renderCoinDetail(id) {
    const { crypto } = this.props
    if (Object.keys(crypto.data).length === 0) {
      return null
    }
    let coin = crypto.data[id]
    if (!coin) {
      return null
    }
    return (
      <CoinDetail
        id={coin.id}
        coin_name={coin.name}
        symbol={coin.symbol}
        price_usd={coin.quotes.USD.price}
        percent_change_24h={coin.quotes.USD.percent_change_24h}
        percent_change_7d={coin.quotes.USD.percent_change_7d}
        total_supply={coin.total_supply}
        max_supply={coin.max_supply}
        showClose={this.state.showClose}
        onClose={(id) => this.setState({selectedId: null})}
      />
    )
  }

  render () {
    if (this.props.crypto.isFetching) {
      return (
        <View>
          <Spinner
            visible={this.props.crypto.isFetching}
            textContent={"Loading..."}
            textStyle={{color: '#253145'}}
            animation="fade"
          />
        </View>
      )
    } else {
      if (this.state.selectedId) {
        Animated.timing(
          this.state.openProgress,
          {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
          }
        ).start(() => this.setState({showClose: true}))
        return (
          <Animated.View style={{
            opacity: this.state.openProgress,
            transform: [{
              translateY: this.state.openProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [height / 2, 0]
              })
            }]
          }}>
            {this.renderCoinDetail(this.state.selectedId)}
          </Animated.View>
        )
      } else {
        return (
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.props.crypto.isFetching}
                onRefresh={() => setTimeout(this.props.FetchCoinData, 600)}
              />
            }>
            <Animated.View style={{opacity: this.state.openProgress}}>
              {this.renderCoinCard()}
            </Animated.View>
          </ScrollView>
        )
      }
    }
  }
}

const styles = {
  contentContainer: {
    paddingBottom: 110,
    paddingTop: 20
  }
}

function mapStateToProps(state) {
  return {
    crypto: state.crypto
  }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)
