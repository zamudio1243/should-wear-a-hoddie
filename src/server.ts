import { getCurrentTemp } from "./OpenWeather";
import { weatherBot } from "./WhatsappClient";
import app from "./app";

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), async () => {
  weatherBot();
});

export default server;
