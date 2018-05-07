import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Cryptocurrency</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    paddingTop: 45,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#edecea',
    alignItems: "center",
    shadowColor: "#edecea",
    elevation: 2,
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  header: {
    fontWeight: "bold",
    fontSize: 20
  }
});

export default Header
