import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "2d9ebcd9cdf9b6b9a007f04426ef4ccb";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // console.log(permission); // granted:true-> 허락받음
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // console.log(location);
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(
      json.list.filter((weather) => {
        if (weather.dt_txt.includes("00:00:00")) {
          return weather;
        }
      })
    );
    // console.log(
    //   json.list.filter((weather) => {
    //     if (weather.dt_txt.includes("00:00:00")) {
    //       return weather;
    //     }
    //   })
    // );
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        //페이지 스크롤에 탄력이 생김
        pagingEnabled
        // showsHorizontalScrollIndicator={false} 하단에 스크롤 바 숨기고 싶을 떄, 나는 보이게 함
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.daily}>{day.dt_txt.substr(5, 5)}</Text>
              <Text style={styles.temp}>
                {parseFloat(day.main.temp).toFixed(1)}°C
              </Text>
              <Text style={styles.descript}>{day.weather[0].main}</Text>
              <Text style={styles.tinydes}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
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
  },
  daily: {
    marginTop: 10,
    fontSize: 60,
  },
  temp: {
    fontSize: 100,
  },
  descript: {
    marginTop: 0,
    fontSize: 60,
  },
  tinydes: {
    marginTop: 10,
    fontSize: 30,
  },
});
