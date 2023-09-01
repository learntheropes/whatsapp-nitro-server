export default defineNitroConfig({
  preset: 'digital-ocean',

  runtimeConfig: {
    telegramToken: process.env.TELEGRAM_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    whatsappAdmin: process.env.WHATSAPP_ADMIN,
    whatsappForward : process.env.WHATSAPP_FORWARD
  },
});
