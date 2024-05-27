const { text } = require("stream/consumers");
const { Telegraf } = require("telegraf");
const { keyboard } = require("telegraf/markup");

const TOKEN = "7145951033:AAGrFtDvLIahumKuV4ryLxO0D_Mwg1X6JvA";
const bot = new Telegraf(TOKEN);
bot.start((ctx) => ctx.reply("ooooooooo"), {
  reply_markup: {
    keyboard: [
      [
        {
          text: "milad app",
          web_app: {
            url: "https://www.google.com/search?q=google+docs&oq=google+docs&aqs=chrome.0.69i59j0i20i263i512j0i131i433i512j0i512l3j0i433i512j69i60.3659j0j1&sourceid=chrome&ie=UTF-8",
          },
        },
      ],
    ],
  },
});

bot.launch();
