"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const { Client } = require("whatsapp-web.js");
const openweather_api_node_1 = __importDefault(require("openweather-api-node"));
const qrcode = require("qrcode-terminal");
const weather = new openweather_api_node_1.default({
    key: "2c3321a0d4316ec39f5a4f7ca3d32465",
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
const server = app_1.default.listen(app_1.default.get("port"), () => {
    client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
    });
    client.on("ready", () => {
        console.log("Client is ready!");
    });
    client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg.body == "!hoodie?") {
            const currentWeather = yield weather.getCurrent();
            msg.reply(currentWeather.weather.temp.cur < 18
                ? "Sí abrigate"
                : "No, no es tiempo para una hoodie");
        }
    }));
    client.initialize();
});
exports.default = server;
//# sourceMappingURL=server.js.map