import whatsappWeb from 'whatsapp-web.js';
const { Client, RemoteAuth } = whatsappWeb;
import { MongoStore } from 'wwebjs-mongo';
import mongoose from 'mongoose';
import QRCode from 'qrcode';

const { 
  mongodbUri
} = useRuntimeConfig()

export let client;

export default defineNitroPlugin(async nitroApp => {

  await mongoose.connect(mongodbUri);

  const store = new MongoStore({ mongoose });

  const client = new Client({
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
      defaultViewport: { 
        width: 800, 
        height: 600 
      }
    },
    authStrategy: new RemoteAuth({
      store,
      backupSyncIntervalMs: 300000
    })
  });

  client.initialize();

  client.on('qr', async (qr) => {
    const qrcode = await QRCode.toString(qr, {
      type: 'terminal',
      version: 11,
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

  client.on('remote_session_saved', async () => {
    console.log('session saved');
    await telegramSendMessage('session saved');
});

  console.log('wa initialized');

  client.on('message', async message => {
    // console.log('message', JSON.stringify(message, null, 2));
  });
});
