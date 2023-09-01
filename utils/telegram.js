import { Telegraf } from 'telegraf';
import QRCode from 'qrcode';

const { 
  telegramToken,
  telegramChatId,
} = useRuntimeConfig();

const client = new Telegraf(telegramToken);

export const sendTelegram = async (string) => {

  const img = await QRCode.toDataURL(string);
  const buffer = Buffer.from(img.split("base64,")[1], "base64");

  await client.telegram.sendPhoto(telegramChatId, {
    source: Buffer.from(buffer, 'base64'),
  });
};