import whatsappWeb from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsappWeb;
import QRCode from 'qrcode';
import { ofetch } from 'ofetch';

const { 
  webhook ,
  telegramToken
} = useRuntimeConfig()

export let client;

export default defineNitroPlugin(nitroApp => {

  client = new Client({
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox'
      ],
      defaultViewport: {
        width: 800,
        height: 600
      }
    },
    authStrategy: new LocalAuth({
      dataPath: './temp/'
    })
  });

  client.initialize();

  client.on('qr', async (qr) => {
    const qrcode = await QRCode.toString(qr, {
      type: 'terminal',
      small: true
    });
    console.log(qrcode);
    await telegramSendQr(qr);
  });
  
  client.on('authenticated', session => {
    console.log('wa session', session)
    console.log('wa autheticated');
  });
  
  client.on('auth_failure', msg => {
    console.error('wa authentication failure', msg);
    throw createError({
      statusMessage: `Authentication failure: ${msg}`,
      statusCode: 500,
    });
  });
    
  client.on('change_state', state => {
    console.log('wa change state', state);
  });
  
  client.on('disconnected', reason => {
    console.log('wa disconnected', reason);
    client.initialize();
  });
  
  client.on('ready', async () => {
    console.log('wa ready');
    await telegramSendMessage('ready');
  });

  console.log('wa initialized');

  client.on('message', async message => {
    // console.log('message', JSON.stringify(message, null, 2));
    if (webhook) await ofetch(`${webhook}/+${message.from.replace('@c.us', '')}`, {
      method: 'POST',
      body: message,
      headers: {
        'authorization': `token ${telegramToken}`
      }
    })
  });
});
