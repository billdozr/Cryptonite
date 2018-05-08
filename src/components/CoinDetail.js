import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { images } from '../Utils/CoinIcons'

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 20,
    padding: 20
  },
  upperRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15
  },
  coinSymbol: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 5,
    fontWeight: "bold"
  },
  coinName: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 20
  },
  seperator: {
    marginTop: 10
  },
  coinPrice: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: 10,
    fontWeight: "bold"
  },
  image: {
    width: 35,
    height: 35
  },
  moneySymbol: {
    fontWeight: "bold",
  },
  statisticsContainer: {
    display: "flex",
    borderTopColor: "#FAFAFA",
    borderTopWidth: 2,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  percentChangePlus: {
    color: "#00BFA5",
    fontWeight: "bold",
    marginLeft: 5
  },
  percentChangeMinus: {
    color: "#DD2C00",
    fontWeight: "bold",
    marginLeft: 5
  },
  supply: {
    fontWeight: "bold"
  },
  closeContainer: {
    position: 'absolute',
    top: -50,
    left: 10,
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
})

const { 
  container,
  image,
  moneySymbol,
  upperRow,
  coinSymbol,
  coinName,
  coinPrice,
  statisticsContainer,
  seperator,
  percentChangePlus,
  percentChangeMinus,
  supply,
  closeContainer,
  closeText,
  closeButton
} = styles

const CoinDetail = ({
  id, symbol, coin_name, price_usd, percent_change_24h, percent_change_7d,
  total_supply, max_supply, showClose, onClose
}) => {
  let closeButtonComp
  if (showClose) {
    closeButtonComp = (
      <View style={closeContainer}>
        <TouchableOpacity
          onPress={() => onClose(id)}
          style={closeButton}>
          <Text style={closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={container}>
      {closeButtonComp}
      <View style={upperRow}>
        <Image
          style={image}
          source={{uri: images[symbol]}} />
        <Text style={coinSymbol}>{symbol}</Text>
        <Text style={seperator}>|</Text>
        <Text style={coinName}>{coin_name}</Text>
        <Text style={coinPrice}>{price_usd}
            <Text style={moneySymbol}> $ </Text>
        </Text>
      </View>
      <View style={statisticsContainer}>
        <Text>24h:
          <Text style={percent_change_24h < 0 ? percentChangeMinus : percentChangePlus }> {percent_change_24h} % </Text>
        </Text>
        <Text>7d:
          <Text style={percent_change_7d < 0 ? percentChangeMinus : percentChangePlus }> {percent_change_7d} % </Text>
        </Text>
      </View>
      <View style={statisticsContainer}>
        <Text>
          Total supply: <Text style={supply}>{total_supply}</Text>
        </Text>
        <Text>
          Max: <Text style={supply}>{max_supply ? max_supply : 'undefined'}</Text>
        </Text>
      </View>
    </View>
  )
}

export default CoinDetail
