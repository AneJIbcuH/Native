import React from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const Info: React.FC = () => {
  const [ticker, setTicker] = useState<string>("AAPL");
  const [frame, setFrame] = useState<string | number>("D");
  const [startPeriod, setStartPeriod] = useState<number>(Math.round(Date.now() / 1000 - 31556926));
  const [endPeriod, setEndPeriod] = useState<number>(Math.round(Date.now() / 1000));

  const [xData, setXData] = useState(["January", "February", "March", "April", "May", "June"])
  const [yData, setYData] = useState([20, 45, 28, 80, 99, 43]);

  useEffect(() => {
    axios
    .get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${frame}&from=${startPeriod}&to=${endPeriod}&token=cjsv2mpr01qgcbapfhj0cjsv2mpr01qgcbapfhjg`
    )
    .then((response) => {
      console.log(response.data);
      setXData(response.data.t.map((el: any) =>
        new Date(el * 1000).toLocaleString()
      ))
      setYData(response.data.h);
    });
  }, [frame])

  const data = {
    // labels: xData,
    datasets: [
      {
        data: yData,
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width;
  const screenHeigth = Dimensions.get("window").height;

  return (
    <View>
      <Text>График акций эпл за последний год на дневном таймфрейме</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={550}
        chartConfig={{
          backgroundColor: "orange",
          backgroundGradientFrom: "pink",
          backgroundGradientTo: "orange",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        yAxisLabel={'$'}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <TouchableOpacity style={styles.btns}>
        <Text style={styles.btn} onPress={() => setFrame('D')}>День</Text>
        <Text style={styles.btn} onPress={() => setFrame('W')}>Неделя</Text>
        <Text style={styles.btn} onPress={() => setFrame('M')}>Месяц</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: "coral",
    borderRadius: 10,
    padding: 10
  },
});