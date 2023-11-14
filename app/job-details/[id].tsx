
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { Text, View, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import { COLORS, SIZES, icons } from '../../constants'
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import useFetch from '../../hook/useFetch'
import { useState } from 'react'

type Props = {}

const tabs = ["About", "Qualifications", "Responsibilities"]

const JobDetails = (props: Props) => {
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState(tabs[0])
  const router = useRouter()
  const params = useGlobalSearchParams()
  console.log({ params })

  const { data, error, loading, refetch } = useFetch(`job-details`, {
    job_id: params.id,
    extended_publisher_details: 'false'
  })

  console.log({ data: data[0]?.job_highlights ?? ["N/A"] })

  const displayContent = () => {
    switch (activeTab) {
      case "About":
        return <JobAbout data={data[0]?.job_description ?? "No Data Provided"}  />
      case "Qualifications":
        return <Specifics title={"Qualifications"} data={data[0]?.job_highlights?.Qualifications ?? ['N/A']} />
      case "Responsibilities":
        return <Specifics title={"Responsibilities"} data={data[0]?.job_highlights?.Responsibilities ?? ['N/A']} />
      default:
        break;
    }
  }


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
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company jobTitle={data[0]?.job_title} logo={data[0]?.employer_logo} companyName={data[0]?.employer_name} location={data[0]?.job_country} />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayContent()}
            </View>
          )}
        </View>
      </ScrollView>

      <JobFooter url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"} />

    </SafeAreaView>
  )

}

export default JobDetails