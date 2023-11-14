import axios from 'axios'
import { useGlobalSearchParams, useRouter, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { COLORS, SIZES, icons } from '../../constants'
import styles from '../../styles/search'
import { NearbyJobCard, ScreenHeaderBtn } from '../../components'

const JobSearch = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()

    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState<null|any>(null);
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([])

        try {
            const options = {
                method: "GET",
                url: `https://jsearch.p.rapidapi.com/search`,
                headers: {
                    "X-RapidAPI-Key":  process.env.EXPO_PUBLIC_API_KEY,
                    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
                },
                params: {
                    query: params.query,
                    page: page.toString(),
                },
            };

            const response = await axios.request(options);
            setSearchResult(response.data.data);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };

    const handlePagination = (direction: 'left' | 'right') => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            handleSearch()
        } else if (direction === 'right') {
            setPage(page + 1)
            handleSearch()
        }
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension='60%'
                        onPress={() => router.back()}
                    />
                ),
                headerTitle: "",
            }}
        />

        <FlatList
            data={searchResult}
            renderItem={({ item }) => (
                <NearbyJobCard
                    job={item}
                    handleNavigation={() => router.push(`/job-details/${item?.job_id}`)}
                />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
            ListHeaderComponent={() => (
                <>
                    <View style={styles.container}>
                        <Text style={styles.searchTitle}>{params.query}</Text>
                        <Text style={styles.noOfSearchedJobs}>{searchLoader? "Counting" :searchResult.length} Job Opportunities</Text>
                    </View>
                    <View style={styles.loaderContainer}>
                        {searchLoader ? (
                            <ActivityIndicator size='large' color={COLORS.primary} />
                        ) : searchError && (
                            <Text>Oops something went wrong</Text>
                        )}
                    </View>
                </>
            )}
            ListFooterComponent={() => (
                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        style={styles.paginationButton}
                        onPress={() => handlePagination('left')}
                    >
                        <Image
                            source={icons.chevronLeft}
                            style={styles.paginationImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <View style={styles.paginationTextBox}>
                        <Text style={styles.paginationText}>{page}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.paginationButton}
                        onPress={() => handlePagination('right')}
                    >
                        <Image
                            source={icons.chevronRight}
                            style={styles.paginationImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            )}
        />
    </SafeAreaView>
    )
}

export default JobSearch