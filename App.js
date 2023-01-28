import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
console.log(SCREEN_WIDTH);
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Suwon</Text>
      </View>
      <ScrollView
        horizontal
        //페이지 스크롤에 탄력이 생김
        pagingEnabled
        // showsHorizontalScrollIndicator={false} 하단에 스크롤 바 숨기고 싶을 떄, 나는 보이게 함
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descript}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descript}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descript}>Sunny</Text>
        </View>

        <View></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 48,
    fontWeight: "500",
  },
  weather: {},
  day: {
    //day 하나당 화면 하나에 채우고 싶어서 dementions api 사용함. 변수화해서 가져옴
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "orange",
  },
  temp: {
    marginTop: 50,
    fontSize: 170,
  },
  descript: {
    marginTop: -30,
    fontSize: 60,
  },
});
