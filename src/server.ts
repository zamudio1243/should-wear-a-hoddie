import app from "./app";
const { Client } = require("whatsapp-web.js");
import OpenWeatherAPI from "openweather-api-node";
const qrcode = require("qrcode-terminal");

const weather = new OpenWeatherAPI({
  key: "2c3321a0d4316ec39f5a4f7ca3d32465",
  locationName: "Zacatecas City, MX",
  units: "metric",
});

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  const client = new Client();

  client.on("qr", (qr: any) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("message", async (msg: any) => {
    if (msg.body == "!hoodie?") {
      const currentWeather = await weather.getCurrent();

      msg.reply(
        currentWeather.weather.temp.cur < 18
          ? "Sí abrigate"
          : "No, no es tiempo para una hoodie"
      );
    }
  });

  client.initialize();
});

export default server;
