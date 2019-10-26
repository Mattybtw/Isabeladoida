const SteamUser = require('steam-user');
const account = new SteamUser();
const config = require('./config.json');

const colors = {
	reset: "\x1b[0m",
	black: "\x1b[30m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
	white: "\x1b[37m"
};

let _consolelog = console.log;
console.log = (color, ...args) => {
	args.unshift(colors[color] ? colors[color] : color);
	args.push(colors.reset);
	_consolelog(...args);
}

const logOnInformation = {
	accountName: config.usuario,
	password: config.senha  
};

account.logOn(logOnInformation);

account.on('loggedOn', () => {
        console.log("green",'[STEAM] Logado');
	account.setPersona(SteamUser.EPersonaState.Online);
	//account.gamesPlayed(config.gameAppId);
	//console.log('O Jogo foi iniciado ' + config.gameAppId);
        account.gamesPlayed([730, 550, 440, 570]);
});

account.on('friendMessage', function(steamID, message) {
		console.log("[" + this.username + "] Mensagem de " + steamID+ ": " + message);
	});


account.on('error', function(e) {
console.log("red",'[STEAM] Falha no login');
    if (e.eresult == SteamUser.EResult.InvalidPassword)
    {
    console.log("white",'Senha incorreta');
    }
    else if (e.eresult == SteamUser.EResult.AlreadyLoggedInElsewhere)
    {
    console.log("white",'Já está logado em outro lugar');
    }
    else if (e.eresult == SteamUser.EResult.AccountLogonDenied)
    {
    console.log("white",'Login Negado - Steam Guard necessário');
    }
});
