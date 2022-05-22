import { useEffect, useState } from "react";
const Weather = () => {
  const [todayWeather, setTodayWeather] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch("https://weather.io/current");
        setTodayWeather(await response.json());
      } catch (e) {
        throw new Error(e);
      } finally {
        setLoading(false);
      }
    };
    if (loading && !todayWeather) {
      getWeather();
    }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1> today weather: </h1>
      <p> {todayWeather} </p>
    </>
  );
};
