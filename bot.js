require('dotenv').config();
const pm2 = require('pm2');
const shell = require('shelljs');

const status = {
  online: "\u{2705}",
  stopping: "\u{1F6AB}",
  stopped: "\u{1F6AB}",
  launching: "\u{267B}",
  errored: "\u{1F198}",
};

function timeSince(timestamp) {
  let diff = (new Date().getTime() - parseInt(timestamp)) / 1000;
  let seconds = diff;
  let minutes = 0;
  let hours = 0;
  let days = 0;
  let str = `${Math.abs(Math.round(seconds))}s`;
  if (seconds > 60) {
    seconds = Math.abs(Math.round(diff % 60));
    minutes = Math.abs(Math.round((diff /= 60)));
    str = `${minutes}m ${seconds}s`;
  }
  if (minutes > 60) {
    minutes = Math.abs(Math.round(diff % 60));
    hours = Math.abs(Math.round(diff / 60));
    str = `${hours}h ${minutes}m`;
  }
  if (hours > 24) {
    days = Math.abs(Math.round(hours / 24));
    hours = Math.abs(Math.round(hours % 24));
    str = `${days}d ${hours}h`;
  }
  return str;
}


function pad(strings, key) {
  const maxLength = 12;
  strings = [...strings];
  let start = strings.splice(0, 1)[0].trim();
  return ` ${start.padEnd(maxLength)}${key}${strings.pop() || ""}`;
}




const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN) //сюда помещается токен, который дал botFather
bot.start((ctx) => ctx.reply('Welcome to phot platform')) //ответ бота на команду /start
bot.help((ctx) => ctx.reply('Send me a sticker')) //ответ бота на команду /help
bot.on('sticker', (ctx) => ctx.reply('')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
bot.hears('hi', (ctx) => ctx.reply('Hey there')) // bot.hears это обработчик конкретного текста, данном случае это - "hi"



bot.hears('ls', ctx => {
  pm2.connect(false, (err) => {
    if (!err) {

      pm2.list((err, processDescriptionList) => {
        if (!err) {
          body = [];
          for (const proc of processDescriptionList) {
            body.push(
                [
                  `<b>${proc.name}</b> ${status[proc.pm2_env.status] || ""}<pre>`,
                  pad`ID: ${proc.pm_id}`,
                  pad`MEM: ${Math.round(proc.monit.memory / 1024 / 1024)}Mb`,
                  pad`CPU: ${proc.monit.cpu} %`,
                  pad`UPTIME: ${timeSince(proc.pm2_env.pm_uptime)}`,
                  pad`RESTARTS: ${proc.pm2_env.restart_time}`,
                  pad`STATUS: ${proc.pm2_env.status}`,
                  "</pre>",
                ].join("\n")
                );
          }

          ctx.replyWithHTML(body.join("\n"));
        }
      });
    }
  });
})


bot.hears('up', ctx => {
  pm2.start("./srv.js", err => {
    if (err) { 
      ctx.reply("Вероятно уже запущен! Смотри статус!");
    } else {
      ctx.reply("Started");
    }
  });
})


bot.hears('sys', ctx => {
  si.mem()
    .then(data => console.log(data))
    .catch(e => console.log(e))

  si.memLayout()
    .then(data => console.log(data))
    .catch(e => console.log(e))


  si.currentLoad()
    .then(data => ctx.reply(data))
    .catch(e => console.log(e))


  si.diskLayout()
    .then(data => console.log(data))
    .catch(e => console.log(e))



})


const si = require('systeminformation');







bot.launch() // запуск бота

