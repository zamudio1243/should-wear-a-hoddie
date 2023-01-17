import app from "./app";
const { Client } = require("whatsapp-web.js");
import OpenWeatherAPI from "openweather-api-node";
const qrcode = require("qrcode-terminal");

const weather = new OpenWeatherAPI({
  key: "",
  units: "metric",
  coordinates: {
    lat: 22.776,
    lon: -102.572,
  },
});

const client = new Client();

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  client.on("qr", (qr: any) => {
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
