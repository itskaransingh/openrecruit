import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'

import styles from './welcome.style'
import { SIZES, icons } from '../../../constants'

const jobType = ['Full Time', 'Part Time', 'Internship', 'Freelance', 'Contract', 'Remote', 'Others' ]

const Welcome = () => {
  const [activeJobType, setActiveJobType] = useState(jobType[0])
  return (
    <View >

      <View style={styles.container}>
        <Text style={styles.userName}>Hi Karan Singh</Text>
        <Text style={styles.welcomeMessage}>Welcome To Your Job Heaven</Text>
      </View>

      <View style={styles.searchContainer}>

        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput} placeholder="What are you looking for ?" />
        </View>

        <TouchableOpacity style={styles.searchBtn}>
          <Image source={icons.search} resizeMode='contain' style={styles.searchBtnImage} />
        </TouchableOpacity>

      </View>
      <View style={styles.tabsContainer}>

        <FlatList showsHorizontalScrollIndicator={false} data={jobType} horizontal keyExtractor={item => item} contentContainerStyle={{
          columnGap: SIZES.small
        }} renderItem={
          ({ item }) => (
            <TouchableOpacity onPress={() => {
              setActiveJobType(item)
            }} style={styles.tab(activeJobType, item)} >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )
        } />

      </View>

    </View>
  )
}

export default Welcome