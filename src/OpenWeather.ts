import fetch from "node-fetch";

export const getCurrentTemp = async () => {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=22.7753891&lon=-102.5722706&appid=2c3321a0d4316ec39f5a4f7ca3d32465&units=metric"
  );
  const res = await response.json();

  return res;
};
