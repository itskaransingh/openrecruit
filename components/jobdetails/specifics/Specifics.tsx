import React from 'react'
import { View, Text } from 'react-native'

import styles from './specifics.style'

const Specifics = ({
  title, 
  data
}:{
  title: string,
  data: string[]
}) => {

  console.log(data)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
    <View style={styles.pointsContainer}>
       {
         data.map((item, index) => (
            <View key={item + index} style={styles.pointWrapper}>
              <View style={styles.pointDot}></View>
              <Text style={styles.pointText}>{item}</Text>
            </View>
         ))
       }
    </View>
    </View>
  )
}

export default Specifics