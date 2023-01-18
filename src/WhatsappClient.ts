import { getCurrentTemp } from "./OpenWeather";

const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const client = new Client();

export const weatherBot = () => {
  client.on("qr", (qr: any) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("message", async (msg: any) => {
    const currentWeather = await getCurrentTemp();
    console.log(msg.rawData);

    switch (msg.body) {
      case "me abrigo?":
        msg.reply(
          `Hola ${msg.rawData.notifyName} la temperatura en ${
            currentWeather.name
          } es de ${currentWeather.main.temp} mi recomendacion es que:${
            currentWeather.main.temp < 18
              ? "Sí abrigate"
              : "No, no es tiempo para una hoodie"
          }`
        );
        break;

      case "temperatura":
        let reply = `Hola ${msg.rawData.notifyName}la temperatura en ${currentWeather.name} es de ${currentWeather.main.temp}`;
        msg.reply(reply);
        break;

      default:
        break;
    }
  });

  client.initialize();
};
