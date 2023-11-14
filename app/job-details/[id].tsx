
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { Text, View, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import { COLORS, SIZES, icons } from '../../constants'
import { Company, JobTabs, ScreenHeaderBtn } from '../../components'
import useFetch from '../../hook/useFetch'
import { useState } from 'react'

type Props = {}

const JobDetails = (props: Props) => {
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()
  const params = useGlobalSearchParams()
  console.log({ params })

  const { data, error, loading, refetch } = useFetch(`job-details`, {
    job_id: params.id,
    extended_publisher_details: 'false'
  })

  console.log({ data })


  const onRefresh = () => {

  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.lightWhite
          },
          headerLeft: () => (
            <ScreenHeaderBtn onPress={() => router.back()} iconUrl={icons.left} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn onPress={() => router.back()} iconUrl={icons.share} dimension='60%' />
          ),
          headerBackVisible: false,
          headerTitle: ''
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium
          }}
        >
          {loading ? <ActivityIndicator size={"large"} color={COLORS.primary} /> : error ? <Text>Something went wrong</Text> : (
            <>
            <Company jobTitle={data[0]?.job_title} logo={data[0]?.employer_logo} companyName={data[0]?.employer_name} location={data[0]?.job_country} />
            <JobTabs />
            </>
            )}
        </View>
      </ScrollView>



    </SafeAreaView>
  )

}

export default JobDetails