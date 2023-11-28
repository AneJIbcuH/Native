import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

const Main: React.FC = () => {
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const shareTicker = "AAPL";

  useEffect(() => {
    axios
      .get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${shareTicker}&token=cjsv2mpr01qgcbapfhj0cjsv2mpr01qgcbapfhjg`
      )
      .then((resp) => {
        setData(resp.data);
        console.log(resp.data.logo);
      });
    axios
      .get(
        `https://finnhub.io/api/v1/quote?symbol=${shareTicker}&token=cjsv2mpr01qgcbapfhj0cjsv2mpr01qgcbapfhjg`
      )
      .then((resp) => {
        setData1(resp.data);
      });
  }, []);

  return (
    <View>
      <Text>Main Screen</Text>
      <Text>{data.name}</Text>
      <Text>Сайт: {data.weburl}</Text>
      <Text>Связать по номеру телефона: {Math.round(data.phone)}</Text>
      <Image
        source={{
          width: 200,
          height: 150,
          uri: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.svg',
          // uri: `${data.logo}`,
          
        }}
      />
      <Text>
        Капитализация: {Math.round(data.marketCapitalization / 1000)} млрд.$
      </Text>
      <Text>Акций в обращении: {Math.round(data.shareOutstanding)} млн.</Text>
      <Text>Дата IPO: {data.ipo}</Text>
      <Text>------------------------</Text>
      <Text>Текущая цена за акцию: {data1.c}$</Text>
      <Text>Изменение цены с предыдущим днем: {data1.d}$</Text>
      <Text>Изменение цены с предыдущим днем: {data1.dp}%</Text>
      <Text>Максимальная цена акции за день: {data1.h}$</Text>
      <Text>Минимальная цена акции за день: {data1.l}$</Text>
      <Text>Цена акции на открытии: {data1.o}$</Text>
      <Text>Цена акции на закрытии прошлого дня: {data1.pc}$</Text>
    </View>
  );
};

export default Main;
