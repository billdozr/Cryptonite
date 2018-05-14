import React from 'react'
import {
  View,
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import moment from 'moment'

const Post = ({item}) => {
  return (
    <View style={styles.post}>
      <Text>
        <Text style={styles.publishedAt}>{moment(item.published_at).fromNow()} </Text>
        <Text style={styles.title}>{item.title} </Text>
        <Text style={styles.path}>{item.source.path}</Text>
      </Text>
    </View>
  )
}

const CoinRelatedNews = ({posts}) => {
  return (
    <View style={styles.container}>
      {posts.length > 0 ?
        <View style={styles.heading}>
          <Text style={styles.headingTitle}>Related News</Text>
          <Text style={styles.newsSource}>via cryptopanic</Text>
        </View>: null}
      {posts.map((post) => {
        return (
          <TouchableOpacity key={post.id} onPress={() => Linking.openURL(post.url)}>
            <Post item={post} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 20,
    padding: 20,
    borderTopColor: "#e5e5e5",
    borderTopWidth: 1
  },
  heading: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  headingTitle: {
    fontSize: 16,
    color: "#000"
  },
  newsSource: {
    fontSize: 13,
    color: "#75787b"
  },
  post: {
    marginTop: 10,
    padding: 10
  },
  title: {
    color: "#75787b"
  },
  path: {
    color: "#000"
  },
  publishedAt: {
    color: "#000"
  }
})

export default CoinRelatedNews
