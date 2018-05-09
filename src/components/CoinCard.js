import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import { images } from '../Utils/CoinIcons'

const CoinCard = ({symbol, coin_name, price_usd, percent_change_24h, percent_change_7d}) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <Image
          style={styles.image}
          source={{uri: images[symbol]}} />
        <Text style={styles.coinSymbol}>{symbol}</Text>
        <Text style={styles.seperator}>|</Text>
        <Text style={styles.coinName}>{coin_name}</Text>
        <Text style={styles.coinPrice}>{price_usd}
            <Text style={styles.moneySymbol}> $ </Text>
        </Text>
      </View>
      <View style={styles.statisticsContainer}>
        <Text>24h:
          <Text style={percent_change_24h < 0 ? styles.percentChangeMinus : styles.percentChangePlus }> {percent_change_24h} % </Text>
        </Text>
        <Text>7d:
          <Text style={percent_change_7d < 0 ? styles.percentChangeMinus : styles.percentChangePlus }> {percent_change_7d} % </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      display: "flex",
      marginBottom: 20,
      borderBottomColor: "#e5e5e5",
      borderBottomWidth: 1,
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
      fontWeight: "bold",        
  },
  coinName: {
      marginTop: 10,
      marginLeft: 5,
      marginRight: 20
  },
  seperator: {
      marginTop: 10,
  },
  coinPrice: {
      marginTop: 10,
      marginLeft: "auto",
      marginRight: 10,
      fontWeight: "bold",        
  },
  image: {
      width: 35,
      height: 35,
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
      color: "#009900",
      fontWeight: "bold",
      marginLeft: 5
  },
  percentChangeMinus: {
      color: "#DD2C00",
      fontWeight: "bold",
      marginLeft: 5
  }
})

export default CoinCard
