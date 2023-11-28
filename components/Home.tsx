import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { StatusBar } from "expo-status-bar";

const Home: React.FC = () => {
  const navigation = useNavigation();

  function toInfo() {
    navigation.navigate("Info");
  }

  function toMain() {
    navigation.navigate("Main");
  }

  const [ip, setIp] = useState();
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();
  const [newCity, setNewCity] = useState<string>();
  const [newWeather, setNewWeather] = useState();

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then((resp) => {
      console.log(resp.data);
      setIp(resp.data.ip);
    });

    axios.get(`https://ipinfo.io/${ip}?token=f0254e572c43ee`).then((resp) => {
      console.log(resp.data.city);
      setCity(resp.data.city);
    });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fe6a245b977754770c24f7fb45c3004f`
      )
      .then((resp) => {
        console.log(resp.data.main);
        setWeather(resp.data.main);
      });
  }, [ip, city]);

  function getWeather() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=fe6a245b977754770c24f7fb45c3004f`
      )
      .then((resp) => {
        console.log('новая погода', resp.data.main);
        setNewWeather(resp.data.main);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Вычислил твой IP {ip}!</Text>
      <Text>Ты в городе: {city}</Text>
      <Text>Влажность в городе: {weather?.humidity}%</Text>
      <Text>Температура в городе: {weather?.temp}</Text>
      <StatusBar style="auto" />

      <TextInput style={styles.change} onChangeText={(text) => setNewCity(text)}/>
      <TouchableOpacity onPress={getWeather} style={styles.btn}>
        <Text style={styles.btnText}>Узнать погоду</Text>
      </TouchableOpacity>

      <Text>{newWeather?.temp}</Text>

      <View style={styles.btns}>
        <Button title="Info" onPress={toInfo} />
        <Button title="Main" onPress={toMain} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "space-around",
  },
  change: {
    backgroundColor: "gray",
    borderRadius: 5,
    width: '90%',
    height: 50,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 150,
    height: 150,
  },
  btn: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10
  },
  btnText: {
    fontSize: 20,
  },
});
