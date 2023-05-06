/*
JIKA ADA ERROR HARAP LAPOR
NOMOR CREATOR: wa.me/6287705048235
YOUTUBE CREATOR: https://youtube.com/@kangbotwhatsapp
*/

require(`./config.js`)
const { baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@adiwajshing/baileys")
const { getGroupAdmins, fetchJson, reSize, generateProfilePicture, sleep } = require("./functions.js")
const { exec, spawn, execSync } = require("child_process")
const cheerio = require("cheerio")
const chalk = require("chalk")
const util = require("util")
const axios = require("axios")
const fs = require("fs")
const syntaxerror = require("syntax-error")
const Jimp = require("jimp")
const PhoneNumber = require("awesome-phonenumber")
const speed = require("performance-now")
const moment = require("moment-timezone")
const owner = JSON.parse(fs.readFileSync("./owner.json"))

module.exports = client = async (client, msg, chatUpdate, store) => {
try {
const type = getContentType(msg.message)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const quoted = msg.quoted ? msg.quoted : msg
const mime = (quoted.msg || quoted).mimetype || ''
const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof msg.text == 'string' ? msg.text : '')
const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup? await client.groupMetadata(msg.chat).catch(e => {}) : ""
const groupName = isGroup? groupMetadata.subject : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const participants = isGroup? await groupMetadata.participants : ""
const groupAdmins = isGroup? await participants.filter(v => v.admin !== null).map(v => v.id) : ""
const groupMembers = isGroup? groupMetadata.participants : ""
const isGroupAdmins = isGroup? groupAdmins.includes(msg.sender) : false
const botNumber = await client.decodeJid(client.user.id)
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const sender = msg.key.fromMe ? (client.user.id.split(':')[0]+'@s.whatsapp.net' || client.user.id) : (msg.key.participant || msg.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = msg.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const isOwner = owner.includes(senderNumber) || isBot
const jamwib = await moment.tz('Asia/Jakarta').format('HH')
const menitwib = await moment.tz('Asia/Jakarta').format('mm')
const detikwib = await moment.tz('Asia/Jakarta').format('ss')
const kays = (`Jam: ${jamwib} Menit: ${menitwib} Detik: ${detikwib}`)

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

const parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) }

const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
    charactersLength));
    }
    return result
}

const reply = (teks) => {
client.sendMessage(from, { text : teks }, { quoted : msg })
}

if (isCmd && msg.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); 
}

if (isCmd && !msg.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); 
}

try {
ppuser = await client.profilePictureUrl(sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

let list = []
for (let i of owner) {
list.push({
displayName: await client.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await client.getName(i + '@s.whatsapp.net')}\n
FN:${await client.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}

function khususOwner() {
let izi = "Kamu Siapa? Owner Ku Bukan Kalau Bukan Jangan Gunain Command Ini Ya"
let buttons = [
{ buttonId: `${prefix}owner`, buttonText: { displayText: 'Owner' }, type: 1 }
]
client.sendButMessage(msg.chat, buttons, izi, ``, msg)
}

function khususGroup() {
reply("Maaf Fitur Ini Hanya Bisa Digunakan Di Group Chat")
}

const meki = await getBuffer(ppuser)

switch (command) {
case "menu": {
txt5 = `*BOT WHATSAPP BY ${nameGEDE}*

╭─▸ *LIST FITUR*
│⭔${prefix}owner
│⭔${prefix}idgroup
│⭔${prefix}join *linkgroup*
│⭔${prefix}pushkontak *idgroup|teks*
│⭔${prefix}pushkontakv2 *teks*
╰────────────˧`
await client.sendMessage(from, { image: thumb, caption: txt5, mentions:[sender] },{quoted:msg})
}
break
case "owner":{
const repf = await client.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Kontak`, 
contacts: list }}, { quoted: msg })
client.sendMessage(from,{text:`Hai Kak @${sender.split("@")[0]}, Itu Owner Ku Jangan Macam-macam Ya, Bytheway Jangan Galak-galak Ya.`,mentions:[sender]},{quoted:repf})
}
break
case "idgroup": {
if (!isOwner) return khususOwner()
const _0x5250a5=_0x55f7;(function(_0x99c41e,_0x3d2c03){const _0x51d3a7=_0x55f7,_0x14bb85=_0x99c41e();while(!![]){try{const _0x591b91=-parseInt(_0x51d3a7(0x1e7))/0x1+-parseInt(_0x51d3a7(0x1e2))/0x2+parseInt(_0x51d3a7(0x1d8))/0x3*(-parseInt(_0x51d3a7(0x1de))/0x4)+parseInt(_0x51d3a7(0x1e8))/0x5*(-parseInt(_0x51d3a7(0x1da))/0x6)+-parseInt(_0x51d3a7(0x1e3))/0x7*(parseInt(_0x51d3a7(0x1db))/0x8)+parseInt(_0x51d3a7(0x1d6))/0x9*(parseInt(_0x51d3a7(0x1dc))/0xa)+parseInt(_0x51d3a7(0x1d9))/0xb;if(_0x591b91===_0x3d2c03)break;else _0x14bb85['push'](_0x14bb85['shift']());}catch(_0x5272e6){_0x14bb85['push'](_0x14bb85['shift']());}}}(_0x485b,0x695ad));let getGroups=await client['groupFetchAllParticipating'](),groups=Object[_0x5250a5(0x1d4)](getGroups)['slice'](0x0)['map'](_0x2fef9a=>_0x2fef9a[0x1]),anu=groups[_0x5250a5(0x1e5)](_0x160363=>_0x160363['id']),teks=_0x5250a5(0x1ea)+anu['length']+_0x5250a5(0x1df);function _0x55f7(_0x3f5b17,_0x4b9605){const _0x485b36=_0x485b();return _0x55f7=function(_0x55f7d3,_0x5edae1){_0x55f7d3=_0x55f7d3-0x1d4;let _0x2eaa8d=_0x485b36[_0x55f7d3];return _0x2eaa8d;},_0x55f7(_0x3f5b17,_0x4b9605);}for(let x of anu){let metadata2=await client[_0x5250a5(0x1dd)](x);teks+=_0x5250a5(0x1d7)+metadata2[_0x5250a5(0x1e6)]+_0x5250a5(0x1e9)+metadata2['id']+'\x0a◉\x20Member\x20:\x20'+metadata2[_0x5250a5(0x1e4)][_0x5250a5(0x1d5)]+_0x5250a5(0x1e0);}function _0x485b(){const _0x52a7f3=['7801690ENXXoA','groupMetadata','4EQkBjR','\x20Group\x0a\x0a','\x0a\x0a────────────────────────\x0a\x0a','Untuk\x20Penggunaan\x20Silahkan\x20Ketik\x20Command\x20','67400XynmaW','1414wtJstj','participants','map','subject','157494pYFczC','252035LHVCiO','\x0a◉\x20ID\x20:\x20','⬣\x20*LIST\x20GROUP\x20DI\x20BAWAH*\x0a\x0aTotal\x20Group\x20:\x20','pushkontak\x20idgroup|teks\x0a\x0aSebelum\x20Menggunakan\x20Silahkan\x20Salin\x20Dulu\x20Id\x20Group\x20Nya\x20Di\x20Atas','entries','length','9rySxun','◉\x20Nama\x20:\x20','1337631tUiKSn','19551180bWbAAy','78sSQViL','33016bpawgY'];_0x485b=function(){return _0x52a7f3;};return _0x485b();}reply(teks+(_0x5250a5(0x1e1)+prefix+_0x5250a5(0x1eb)));
}
break
case "pushkontak":
if (!isOwner) return khususOwner()
// No Enc? Buy Di wa.me/6287705048235
// Harga? 15k Doang 
const _0x2fc610=_0x440f;(function(_0xe933f0,_0x2264a1){const _0x37b896=_0x440f,_0xbcfbc1=_0xe933f0();while(!![]){try{const _0x29688d=parseInt(_0x37b896(0x1b3))/0x1+parseInt(_0x37b896(0x1b1))/0x2*(-parseInt(_0x37b896(0x1b7))/0x3)+-parseInt(_0x37b896(0x1ae))/0x4*(-parseInt(_0x37b896(0x1b4))/0x5)+parseInt(_0x37b896(0x1af))/0x6+parseInt(_0x37b896(0x1b2))/0x7*(parseInt(_0x37b896(0x1bb))/0x8)+parseInt(_0x37b896(0x1b0))/0x9*(parseInt(_0x37b896(0x1bc))/0xa)+-parseInt(_0x37b896(0x1ba))/0xb;if(_0x29688d===_0x2264a1)break;else _0xbcfbc1['push'](_0xbcfbc1['shift']());}catch(_0x278080){_0xbcfbc1['push'](_0xbcfbc1['shift']());}}}(_0x17b6,0xdb47f));function _0x17b6(){const _0x3f80d8=['8iToVpZ','60PGaOrN','Penggunaan\x20Salah\x20Silahkan\x20Gunakan\x20Command\x20Seperti\x20Ini\x0a','\x20idgroup|tekspushkontak\x0aUntuk\x20Liat\x20Id\x20Group\x20Silahkan\x20Ketik\x20.idgroup','61060VIgoJS','550920cdkcfS','2592459vQsQAP','2CoeoHc','4053749MfwMsl','1067431uAdrRm','410NKDYSa','split','@s.whatsapp.net','1695711nNPsUh','groupMetadata','sendMessage','35804802sHuFwp'];_0x17b6=function(){return _0x3f80d8;};return _0x17b6();}function _0x440f(_0x1b8559,_0x7afc46){const _0x17b646=_0x17b6();return _0x440f=function(_0x440f5d,_0x168f63){_0x440f5d=_0x440f5d-0x1ae;let _0x43379f=_0x17b646[_0x440f5d];return _0x43379f;},_0x440f(_0x1b8559,_0x7afc46);}if(!q)return reply(_0x2fc610(0x1bd)+(prefix+command)+_0x2fc610(0x1be));await reply('Otw\x20Boskuuu');const metadata2=await client[_0x2fc610(0x1b8)](q[_0x2fc610(0x1b5)]('|')[0x0]),halss=metadata2['participants'];for(let mem of halss){client[_0x2fc610(0x1b9)](''+mem['id']['split']('@')[0x0]+_0x2fc610(0x1b6),{'text':q[_0x2fc610(0x1b5)]('|')[0x1]}),await sleep(0x1388);}
break
case "pushkontakv2":
if (!isOwner) return khususOwner()
// No Enc? Buy Di wa.me/6287705048235
// Harga? 15k Doang
const _0x101d84=_0xa316;(function(_0x2ae31f,_0x4d7965){const _0x3a5ac7=_0xa316,_0x24ec8d=_0x2ae31f();while(!![]){try{const _0x8c7646=-parseInt(_0x3a5ac7(0xd4))/0x1+parseInt(_0x3a5ac7(0xd9))/0x2*(parseInt(_0x3a5ac7(0xcb))/0x3)+-parseInt(_0x3a5ac7(0xd8))/0x4+parseInt(_0x3a5ac7(0xcf))/0x5*(parseInt(_0x3a5ac7(0xd6))/0x6)+-parseInt(_0x3a5ac7(0xd3))/0x7+parseInt(_0x3a5ac7(0xd1))/0x8+parseInt(_0x3a5ac7(0xce))/0x9;if(_0x8c7646===_0x4d7965)break;else _0x24ec8d['push'](_0x24ec8d['shift']());}catch(_0x51003e){_0x24ec8d['push'](_0x24ec8d['shift']());}}}(_0x2964,0x52070));if(!msg['isGroup'])return reply(_0x101d84(0xd7)+(prefix+command)+_0x101d84(0xcc));function _0x2964(){const _0x524b9d=['sendMessage','split','118797hPLnNE','\x20Hanya\x20Bisa\x20Di\x20Gunakan\x20Di\x20Dalam\x20Group\x0aUntuk\x20Memasukan\x20Bot\x20Ke\x20Dalam\x20Group\x20Yang\x20Di\x20Ingin\x20Kan\x0aSilahkan\x20Ketik\x20Command\x20.join\x20linkgroup','Otw\x20Boskuuu','2052972hSXudG','2308835WSARUp','\x20teks','5096664oCeWiP','participants','1391614bhfuSh','411230pibimR','groupMetadata','6QEuvRR','Maaf\x20Kak\x20Fitur\x20','2315748FMQjKM','10qqeARF'];_0x2964=function(){return _0x524b9d;};return _0x2964();}if(!q)return reply('Penggunaan\x20Salah\x20Silahkan\x20Gunakan\x20Command\x20Seperti\x20Ini\x0a'+(prefix+command)+_0x101d84(0xd0));await reply(_0x101d84(0xcd));const metadata3=await client[_0x101d84(0xd5)](from),halsss=metadata3[_0x101d84(0xd2)];function _0xa316(_0x4b5da8,_0x5c3056){const _0x29644f=_0x2964();return _0xa316=function(_0xa3164f,_0x4dddac){_0xa3164f=_0xa3164f-0xc9;let _0x6899c9=_0x29644f[_0xa3164f];return _0x6899c9;},_0xa316(_0x4b5da8,_0x5c3056);}for(let men of halsss){client[_0x101d84(0xc9)](''+men['id'][_0x101d84(0xca)]('@')[0x0]+'@s.whatsapp.net',{'text':q}),await sleep(0x1388);}
break
case "join": {
if (!isOwner) return khususOwner()
if (!text) return reply(`Contoh ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await client.groupAcceptInvite(result).then((res) => reply(util.format(res))).catch((err) => reply(util.format(err)))
}
break
default:
}
} catch (err) {
console.log(util.format(err))
let e = String(err)
client.sendMessage("6287705048235@s.whatsapp.net", {text:e})
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})