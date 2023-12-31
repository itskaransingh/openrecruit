import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { SIZES, icons } from "../../../constants";
import { useRouter } from "expo-router";

const jobType = [
  "Full Time",
  "Part Time",
  "Internship",
  "Freelance",
  "Contract",
  "Remote",
];

const Welcome = () => {
  const [activeJobType, setActiveJobType] = useState(jobType[0]);
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hi Karan Singh</Text>
        <Text style={styles.welcomeMessage}>Welcome To Your Job Heaven</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            onChangeText={(text) => setSearchTerm(text)}
            style={styles.searchInput}
            placeholder="What are you looking for ?"
          />
        </View>

        <TouchableOpacity onPress={() => router.push(`/search/${searchTerm}`)} style={styles.searchBtn}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={jobType}
          horizontal
          keyExtractor={(item) => item}
          contentContainerStyle={{
            columnGap: SIZES.small,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
              style={styles.tab(activeJobType, item)}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Welcome;
