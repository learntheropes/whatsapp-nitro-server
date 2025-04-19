A unjs/nitro server to send and receive Whatsapp chat messages.

## Instructions

1. Create a Telegram Bot where you will receive the qr code to authenticate the whatsapp session.
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

To do

## Status

Ready for production.

Whatsapp authentication breaks often due to changes in the Whatsapp Web code. I will try to keep the code updated because I use this server in production for some of my project.

## Limitations

Only message (with emoji) are supported because this is all I need. Support for media can be easily added I guess.

## Deployment

It must be deployed anywhere `Dockerfile` is supported.  
On Digital Ocean it can run on a Basic Plan with 512 MB RAM and 1 vCPU (the cheapest plan for 5 USD/month).

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%202.svg)](https://www.digitalocean.com/?refcode=1930033771d7&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)
 
 ## License

 MIT
