const express = require("express");
const app = express();
const cors = require("cors");
const Telegraf = require("telegraf");

const api = require("./api/api");

const PORT = process.env.PORT || 5001;
const BOT_TOKEN = "1501021223:AAEvC_x8zfjBldAa2KzgXyMiNVHGgISZZVU";

const tg = new Telegraf(BOT_TOKEN);

app.use(cors());

const http = require("http");
const server = http.Server(app);

app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

tg.start((ctx) => ctx.replyWithMarkdown("Hey there...\n"));

tg.hears("hi", (ctx) => {
  ctx.replyWithMarkdown("Hi, " + ctx.from.first_name);
});

tg.hears("updates", async (ctx) => {
  let _data = await api.getUpdates();
  var _msg =
    "*CoViD19 Updates - Global*\n\n" +
    "`Updated time` : " +
    _data.data.update_date_time +
    "\n\n`Deaths`: " +
    _data.data.global_deaths +
    "\n`Recovered`: " +
    _data.data.global_recovered +
    "\n`New Cases`: " +
    _data.data.global_new_cases +
    "\n`Total Cases`: " +
    _data.data.global_total_cases;
  ctx.replyWithMarkdown(_msg);
});

tg.launch();

server.listen(PORT, () => {
  console.log("Telegram app listening on : http://127.0.0.1:" + PORT);
});
