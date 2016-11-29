if (!process.env) {
  require('dotenv').config();
}

var request = require('request');
var slackbot = require('./slackbot-new');
var fs = require('fs');

var botKey = process.env.SLACK_BOT_KEY;
var taIDs = process.env.SLACK_USER_IDS.split(',');

var bot = new slackbot(botKey);

var askrafiki = require('./core-bot-functions')(bot, taIDs);
var easterEggs = require('./easter-eggs')(bot, taIDs);

bot.use(askrafiki);

for (var key in easterEggs) {
	bot.use(easterEggs[key]);
}

bot.connect();
