import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay'

import FetchCoinData from '../Actions/FetchCoinData'
import CoinCard from './CoinCard'
import CoinDetail from './CoinDetail'
import CoinRelatedNews from './CoinRelatedNews'
import { Header } from '.';

const {height, width} = Dimensions.get('window')

class CryptoContainer extends Component {
  state = {
    selectedId: null,
    openProgress: new Animated.Value(1),
    showClose: false
  }

  coinsPosY = {}

  componentDidMount() {
    this.props.FetchCoinData()
  }

  _sortedIdsByRank(data) {
    const idsWithRanks = Object.keys(data || {}).map((key) => [key, data[key].rank])
    idsWithRanks.sort((a, b) => a[1] - b[1])
    const ids = idsWithRanks.map((a) => a[0])
    return ids
  }

  _newsByCoin(news, symbol) {
    return news.filter((post) => post.currencies.map((c) => c.code).includes(symbol))
  }

  renderCoinCards() {
    const { crypto } = this.props
    return this._sortedIdsByRank(crypto.data).map((key) => {
      let coin = crypto.data[key]
      return (
        <TouchableWithoutFeedback
          key={key}
          onLayout={(e) => this.coinsPosY[key] = e.nativeEvent.layout.y}
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
      />
    )
  }

  renderCoinCardsScreen() {
    return (
      <View>
        <Header title='Cryptonite'/>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.props.crypto.isFetching}
              onRefresh={() => setTimeout(this.props.FetchCoinData, 600)}
            />
          }>
          <Animated.View style={{opacity: this.state.openProgress}}>
            {this.renderCoinCards()}
          </Animated.View>
        </ScrollView>
      </View>
    )
  }

  renderCoinDetailScreen(id) {
    const { crypto } = this.props
    Animated.timing(
      this.state.openProgress,
      {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }
    ).start(() => this.setState({showClose: true}))

    const showClose = this.coinsPosY[this.state.selectedId] === 0 ? true : this.state.showClose
    return (
      <View style={{flex: 1}}>
        <Header
          title={showClose ? crypto.data[this.state.selectedId].name : 'Cryptonite'}
          leftButton={
            showClose ? (
              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({selectedId: null})}
                  style={styles.closeButton}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            ) : null
          } />
        <ScrollView>
          <Animated.View style={{
            opacity: this.state.openProgress,
            transform: [{
              translateY: this.state.openProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [Math.min(height, this.coinsPosY[this.state.selectedId]), 0]
              })
            }]
          }}>
            {this.renderCoinDetail(this.state.selectedId)}
          </Animated.View>
          <Animated.View style={{opacity: this.state.openProgress}}>
            <CoinRelatedNews
              posts={this._newsByCoin(crypto.news, crypto.data[this.state.selectedId].symbol)}
            />
          </Animated.View>
        </ScrollView>
      </View>
    )
  }

  render () {
    if (this.props.crypto.isFetching) {
      return (
        <View>
          <Header title='Cryptonite'/>
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
        return this.renderCoinDetailScreen(this.state.selectedId)
      } else {
        return this.renderCoinCardsScreen()
      }
    }
  }
}

const styles = {
  contentContainer: {
    paddingBottom: 110,
    paddingTop: 20
  },
  closeContainer: {
    opacity: 0.5
  },
  closeText: { color: 'white', backgroundColor: 'transparent' },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
    borderRadius: 5
  }
}

function mapStateToProps(state) {
  return {
    crypto: state.crypto
  }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)
