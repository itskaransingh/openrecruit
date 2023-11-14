import React from 'react'
import { TouchableOpacity, Image, Text, View } from 'react-native'

import styles from './popularjobcard.style'
import { checkImageURL } from '../../../../utils'

type Props = {
  job: any,
  selectedJob: string,
  handlePress: (item:any) => void
}

const PopularJobCard = ({job, selectedJob, handlePress}:Props) => {
  return (
     <TouchableOpacity
       onPress={() => handlePress(job)}
       style={styles.container(selectedJob, job)}
      
     >

      <TouchableOpacity style={styles.logoContainer(selectedJob, job)}>
        <Image source={{
          uri: checkImageURL(job.employer_logo) ? job.employer_logo : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
        }}
        resizeMode='contain'
        style={styles.logoImage}
        />
      </TouchableOpacity>

     <Text style={styles.companyName} numberOfLines={1}>
         {job.employer_name}
     </Text>

     <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, job)} numberOfLines={1}>
          {job.job_title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedJob, job)}>
            {job?.job_publisher} -
          </Text>
          <Text style={styles.location}> {job.job_country}</Text>
        </View>
      </View>


     </TouchableOpacity>
  )
}

export default PopularJobCard