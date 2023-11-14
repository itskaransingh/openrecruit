import React from 'react'
import { TouchableOpacity, Image, Text, View } from 'react-native'

import styles from './nearbyjobcard.style'
import { checkImageURL } from '../../../../utils'

type Props = {
  job: any,
  handleNavigation: (item:any) => void
}

const NearbyJobCard = ({job, handleNavigation}:Props) => {
  return (
     <TouchableOpacity
       onPress={() => handleNavigation(job)}
       style={styles.container}
      
     >

      <TouchableOpacity style={styles.logoContainer}>
        <Image source={{
          uri: checkImageURL(job.employer_logo) ? job.employer_logo : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
        }}
        resizeMode='contain'
        style={styles.logoImage}
        />
      </TouchableOpacity>

  
     <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType} numberOfLines={1}>
          {job.job_employment_type} - {job.job_is_remote ? "Remote" : "On site"}
        </Text>
         
      </View>


     </TouchableOpacity>
  )
}

export default NearbyJobCard