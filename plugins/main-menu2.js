import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import moment from 'moment-timezone'
import { sticker } from '../lib/sticker.js'
import fs from "fs"

let handler = async (m, { conn, args, usedPrefix, command }) => {

    let ucpn = `${ucapan()}`
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let { exp, limit, level, role, money, lastclaim, lastweekly, registered, regTime, age, banned, pasangan } = global.db.data.users[who]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let pp = await conn.profilePictureUrl(who).catch(_ => './src/avatar_contact.png')
    if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        lastweekly: 0,
        role: 'Warrior V',
        autolevelup: false,
        money: 0,
        pasangan: "",
      }
     }
let caption = `${htki} *MENU* ${htka}
Hay ${name} ${ucpn}, Saya merupakan bot WhatsApp yang di kembangkan oleh *FangzXD* Saya bisa membantumu kapan pun dan di manapun kamu berada, Dan saya juga bisa membuat kamu menghilangkan rasa gabut..., Oh iya. kamu dapat nomor saya dari mana? Sebelum menggunakan bot ini, kamu harus tau rules nya yah agar tidak ter banned oleh bot. Terima kasih sudah menggunakan Fangz BOT & Bot ini terjaga privasi nya!

NOTE: 
• Jangan menelepon Bot/Don't call bot
• Jangan Spam bot/Don't spam bots
• Jangan spam fitur eror/Don't spam the error feature
• Gunakan dengan baik & Benar/Use Well & Correctly



*🏷️ Nama:* ${registered ? '(' + name + ') ' : ''} 
*📨 Terdaftar:* ${registered ? '✅ (' + new Date(regTime).toLocaleString() + ')' : '❌'} ${lastclaim > 0 ? '\n*⏱️Terakhir Claim* ' + new Date(lastclaim).toLocaleString() : ''}\n\n NOTE: Jika ada bug, mohon untuk menunggu sekitar ±20 menit`
await conn.sendButton(m.chat, bottime, caption, pp, [
                ['LIST MENU', `${usedPrefix}listmenu`],
                ['CARI TEMAN', `${usedPrefix}start`]
            ], m, {
            fileLength: fsizedoc,
            seconds: fsizedoc,
            contextInfo: {
          externalAdReply :{
    mediaUrl: sig,
    mediaType: 2,
    description: wm, 
    title: hiasan,
    body: `Hallo ${name} 👋`,
    thumbnail: await(await fetch(thumb)).buffer(),
    sourceUrl: swb
     }}
  })
}

handler.help = ['menu', 'help']
handler.tags = ['main']

handler.command = /^menu|help$/i

handler.limit = true
handler.register = true

export default handler

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Selamat DiniHari ☀️"
  if (time >= 4) {
    res = "Selamat Pagi 🌄"
  }
  if (time >= 10) {
    res = "Selamat Siang ☀️"
  }
  if (time >= 15) {
    res = "Selamat Sore 🌇"
  }
  if (time >= 18) {
    res = "Selamat Malam 🌙"
  }
  return res
}
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})})
