import 'dotenv/config'
import express from 'express'

import { protobufEncode } from './network/tools/protobuf.encode';

const app = express()

app.use(express.json())

const account = {
  retcode: 0,
  message: "OK",
  data: {
    account: {
      uid: 61,
      name: "andromeda",
      email: "andromeda",
      mobile: "",
      is_email_verify: 1,
      realname: "",
      identity_card: "",
      token: "bm90IGZvdW5k",
      safe_mobile: "",
      facebook_name: "",
      google_name: "",
      twitter_name: "",
      game_center_name: "",
      apple_name: "",
      sony_name: "",
      tap_name: "",
      country: "US",
      reactivate_ticket: "",
      area_code: "US",
      device_grant_ticket: "",
      steam_name: "",
    },
    device_grant_required: false,
    safe_mobile_required: false,
    realperson_required: false,
    realname_operation: 'none',
  },
}

app.post('/mdk/shield/api/loadConfig', (request, response) => response.json({
  "retcode": 0,
  "message": "OK",
  "data": {
    "id": 6,
    "game_key": "hk4e_cn",
    "client": "PC",
    "identity": "I_IDENTITY",
    "guest": true,
    "ignore_versions": "",
    "scene": "S_NORMAL",
    "name": "原神海外",
    "disable_regist": false,
    "enable_email_captcha": false,
    "thirdparty": ["fb", "tw"],
    "disable_mmt": false,
    "server_guest": true,
    "thirdparty_ignore": { "tw": "", "fb": "" },
    "enable_ps_bind_account": false,
    "thirdparty_login_configs": {
      "tw": { "token_type": "TK_GAME_TOKEN", "game_token_expires_in": 604800 },
      "fb": { "token_type": "TK_GAME_TOKEN", "game_token_expires_in": 604800 },
    },
  },
}))

app.get('/sdk/login', (request, response) => response.json({
  "retcode": 0,
  "data": {
    "uid": "61",
    "token": "token",
    "email": "andromedaps",
  },
}))

app.post('/mdk/shield/api/loginCaptcha', (request, response) => response.json({
  "retcode": 0,
  "message": "OK",
  "data": { "protocol": true, "qr_enabled": true, "log_level": "INFO" },
}))

app.post('/combo/granter/login/login', (request, response) => response.json({
  "retcode": 0,
  "message": "OK",
  "data": {
    "combo_id": 61,
    "open_id": 61,
    "combo_token": "token",
    "data": '{"guest":true}',
    "heartbeat": false,
    "account_type": 1,
  },
}))

app.post('/mdk/shield/api/login', (request, response) => {
  response.json(account)
})

app.post('/mdk/shield/api/verify', (request, response) => {
  response.json(account)
})

app.get('/query_cur_region', async (request, response) => {
  const queryCurRegion = {
    regionInfo: {
      gateserverIp: process.env.GAME_SERVER_HOST,
      gateserverPort: process.env.GAME_SERVER_PORT,
      secretKey: ''
    },
    clientConfig: {
      sdkenv: '2',
      showexception: false,
    },
  }

  const encoded = await protobufEncode('QueryCurrRegionHttpRsp', queryCurRegion)
  return response.send(Buffer.from(encoded).toString('base64'))
})

app.get('/query_region_list', async (request, response) => {
  const queryRegionList = {
    retcode: 0,
    regionList: [
      {
        name: 'Andromeda PS',
        title: 'os_beta',
        type: 'DEV_PUBLIC',
        dispatchUrl: `http://${process.env.HTTP_SERVER_HOST}:${process.env.HTTP_SERVER_PORT}/query_cur_region`
      }
    ],
    clientConfig: {
      "sdkenv": "2",
      "showexception": "true",
    },
    clientCustomConfig: JSON.stringify({
      "sdkenv": "2",
      "checkdevice": "False",
      "loadPatch": "False",
      "showexception": "true",
      "regionConfig": "pm|fk|add",
      "downloadMode": "0",
    }),
  }

  const encoded = await protobufEncode('QueryRegionListHttpRsp', queryRegionList)
  return response.send(Buffer.from(encoded).toString('base64'))
})

export function startHttp() {
  app.listen(process.env.HTTP_SERVER_PORT,
    () => console.log(`Http Server is running at port ${process.env.HTTP_SERVER_PORT}`))
}