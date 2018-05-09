import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Header = ({title, leftButton, rightButton}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftButton}>{leftButton}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightButton}>{rightButton}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    paddingTop: 45,
    paddingBottom: 20,
    borderBottomWidth: 2,
    backgroundColor: '#d3d3d3',
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
  title: {
    color: '#009900',
    fontWeight: "bold",
    fontSize: 20
  },
  leftButton: {
    position: 'absolute',
    top: 40,
    left: 20
  },
  rightButton: {
    position: 'absolute',
    top: 40,
    right: 20
  }
});

export default Header
