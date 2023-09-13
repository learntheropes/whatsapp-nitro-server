A unjs/nitro server to send and receive Whatsapp chat messages.

## Instructions

1. Create a Telegram Bot where you will receive the qr code to authenticate the whtsapp session.
2. Set the env variables as explained in `.env.example`.
3. Deploy on Digital Ocean app platform (more details at the bottom of this page).

### Authentication

Any request must contain a 'authorization' header with `token $TELEGRAM_TOKEN` from the env variables.

### Endpoints

- GET `/state`:  
It returns the status of the server. If the property `state` is equal to `CONNECTED` means that the server is authenticated and ready to receive requests. Any other `state` means the opposite.

- POST `/message/$PHONE_NUMBER`:  
To post a message send a `POST` request to this endpoint where `$PHONE_NUMBER` is the recipient of the message and the `message` property of the body is the content of the message to send.

### Webhooks

If you specify a `WEBHOOK_URL` in the env variables, a post request will be sent to `WEBHOOK_URL/$SENDER_PHONE_NUMBER` where `$SENDER_PHONE_NUMBER` is the phone number that sent the message, with a body containing 
<details>
<summary>the whatsapp message object.</summary>

```json
{
  "_data": {
    "id": {
      "fromMe": false,
      "remote": "39123456789@c.us",
      "id": "3AA4AE577FTBKB8808J9",
      "_serialized": "false_39123456789@c.us_3AA4AE577FTBKB8808J9"
    },
    "viewed": false,
    "body": "Test message",
    "type": "chat",
    "t": 1694572521,
    "notifyName": "Alice",
    "from": "39123456789@c.us",
    "to": "1123456789@c.us",
    "self": "in",
    "ack": 1,
    "invis": false,
    "isNewMsg": true,
    "star": false,
    "kicNotified": false,
    "recvFresh": true,
    "isFromTemplate": false,
    "pollInvalidated": false,
    "isSentCagPollCreation": false,
    "latestEditMsgKey": null,
    "latestEditSenderTimestampMs": null,
    "mentionedJidList": [],
    "groupMentions": [],
    "isVcardOverMmsDocument": false,
    "isForwarded": false,
    "labels": [],
    "hasReaction": false,
    "productHeaderImageRejected": false,
    "lastPlaybackProgress": 0,
    "isDynamicReplyButtonsMsg": false,
    "isMdHistoryMsg": false,
    "stickerSentTs": 0,
    "isAvatar": false,
    "lastUpdateFromServerTs": 0,
    "bizBotType": null,
    "requiresDirectConnection": null,
    "invokedBotWid": null,
    "links": []
  },
  "id": {
    "fromMe": false,
    "remote": "39123456789@c.us",
    "id": "3AA4AE577FTBKB8808J9",
    "_serialized": "false_39123456789@c.us_3AA4AE577FTBKB8808J9"
  },
  "ack": 1,
  "hasMedia": false,
  "body": "Test",
  "type": "chat",
  "timestamp": 1694572521,
  "from": "39123456789@c.us",
  "to": "1123456789@c.us",
  "deviceType": "ios",
  "isForwarded": false,
  "forwardingScore": 0,
  "isStatus": false,
  "isStarred": false,
  "fromMe": false,
  "hasQuotedMsg": false,
  "hasReaction": false,
  "vCards": [],
  "mentionedIds": [],
  "isGif": false,
  "links": []
}
```
</details>

## Status

Ready for production.

Whatsapp authentication breaks often due to changes in the Whatsapp Web code. I will try to keep the code updated because I use this server in production for some of my project.

## Limitations

1. Only message (with emoji) are supported because this is all I need. Support for media can be easily added I guess.
2. Every time the server restarts, whatsapp need to be authenticated again. The `whtsapp-web.js` package also support to store the session remotely on mongodb. But: 1. I found Digital Ocean App platform very stable and never restarts the server. 2. I don't have a mondodb instance. 3. I tested the feature multiple times on a free Atlas mongodb instance but I found the feature very buggy. 

## Deployment

It must be deployed anywhere `Dockerfile` is supported.  
On Digital Ocean it can run on a Basic Plan with 512 MB RAM and 1 vCPU (the cheapest plan for 5 USD/month).

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%202.svg)](https://www.digitalocean.com/?refcode=1930033771d7&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)
 
 ## License

 MIT