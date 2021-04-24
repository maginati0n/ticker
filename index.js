const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
const fs = require('fs');
var request = require("request");
const convertRupiah = require('rupiah-format')
var moment = require('moment'); // require
let url = 'https://vip.bitcoin.co.id/api/btc_idr/ticker'
//var moment = require('moment-timezone');

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    //console.log('QR RECEIVED', qr);
qrcode.generate(qr, function (qrcode) {
    console.log(qrcode);
});

});
client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!watchlist') {
        fs.readFile('./test.txt', 'utf8', function (err,data) {
        msg.reply(data)
if (err) {
    return console.log(err);
  }
})
    }
    if (msg.body == '!cmd') {
        fs.readFile('./command.txt', 'utf8', function (err,data) {
        msg.reply(data)
if (err) {
    return console.log(err);
  }
})
    }
    if (msg.body == '!help') {
        fs.readFile('./help.txt', 'utf8', function (err,data) {
        msg.reply(data)
if (err) {
    return console.log(err);
  }
}) 
    }
//here
if (msg.body == '!btc') {
    request({'url':url, 'json': true }, function (error, response, body) {
        let date = moment.unix(body.ticker.server_time).format('dddd, MMMM Do, YYYY h:mm:ss A'); 
        let high = convertRupiah.convert(body.ticker.high)
        let low = convertRupiah.convert(body.ticker.low)
        let vol_btc = convertRupiah.convert(body.ticker.vol_btc)
        let last = convertRupiah.convert(body.ticker.last)
      	let time = Date();
const txt = `*BTC Update Check*

Last Price : *${last}* 
Highest Price : *${high}*
Lowest Price: *${low}* 
Volume  : *${body.ticker.vol_btc}* 
Time : *${date}*
`
        msg.reply(txt)
      });
}
});

client.initialize();
