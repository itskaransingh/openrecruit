import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import styles from './popularjobs.style'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { COLORS, SIZES } from '../../../constants'
import useFetch from '../../../hook/useFetch'
import { useRouter } from 'expo-router'

const Popularjobs = () => {

  const router = useRouter()

  const { data, error, loading, refetch } = useFetch('search', {
    query: 'Python developer in Texas, USA',
    num_pages: '1'
  })

  const [selectedJob, setSelectedJob] = useState('')

  const handlePress = (item:any) => {
    setSelectedJob(item.job_id)
    router.push(`/job-details/${item.job_id}`)
  }
   
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity >
          <Text style={styles.headerBtn}>Show More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading ? <ActivityIndicator size={"large"} color={COLORS.primary} /> : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          <FlatList data={data} contentContainerStyle={{
            columnGap: SIZES.small
          }} horizontal renderItem={({ item }) => (
            <PopularJobCard handlePress={handlePress} selectedJob={selectedJob} job={item} />
          )} />
        )}
      </View>

    </View>
  )
}

export default Popularjobs