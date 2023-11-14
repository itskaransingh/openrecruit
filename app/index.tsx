import { Stack } from "expo-router"
import { SafeAreaView, View, ScrollView } from "react-native"
import { ScreenHeaderBtn, Welcome, Nearbyjobs, Popularjobs } from "../components"
import { COLORS, SIZES, icons, images } from "../constants"

type Props = {}

const Home = (props: Props) => {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.lightWhite,
    }}>
      <Stack.Screen options={{
        headerStyle: {
          backgroundColor: COLORS.lightWhite
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn dimension="60%" iconUrl={icons.menu} />
        ),
        headerTitle: "",
        headerRight: () => (
          <ScreenHeaderBtn dimension="100%" iconUrl={images.profile} />
        )
      }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View 
           style={{
            flex:1,
            padding: SIZES.medium
           }}
        >
          <Welcome />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>

    </SafeAreaView>

  )
}

export default Home