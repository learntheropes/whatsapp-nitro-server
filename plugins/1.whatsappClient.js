import whatsappWeb from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsappWeb;
import QRCode from 'qrcode';

export let client;

export default defineNitroPlugin(nitroApp => {
  
  client = new Client({
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
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
    const qrcode = await QRCode.toString(qr,{
      type: 'terminal',
      small: true
    });
    console.log(qrcode);
    await sendTelegram(qr);
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
  
  client.on('ready', () => {
    console.log('wa connected');
  });

  console.log('wa initialized');
});
