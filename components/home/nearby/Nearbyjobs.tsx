import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

import { useRouter } from 'expo-router'
import { COLORS } from '../../../constants'
import useFetch from '../../../hook/useFetch'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import styles from './nearbyjobs.style'

const Nearbyjobs = () => {
  const router = useRouter()

  const { data, error, loading, refetch } = useFetch('search', {
    query: 'Python developer in Texas, USA',
    num_pages: '1'
  })


  const handleNavigation = (item:any) => {
     router.push(`/job-details/${item.job_id}`)
  }
   
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity >
          <Text style={styles.headerBtn}>Show More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading ? <ActivityIndicator size={"large"} color={COLORS.primary} /> : error ? (
          <Text>Something Went Wrong</Text>
        ) : data?.map((job:any) => (
          <NearbyJobCard key={`nearbyjobs-${job.job_id}`} handleNavigation={handleNavigation} job={job} />
        ))}
      </View>

    </View>
  )
}

export default Nearbyjobs