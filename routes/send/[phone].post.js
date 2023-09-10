import { client } from '~/plugins/1.whatsappClient';

const {
  whatsappAdmin,
  whatsappForward
} = useRuntimeConfig();

export default eventHandler(async event => {

  const { message } = await readBody(event);

  let phone = event.context.params.phone;
  if (phone === whatsappAdmin) phone = whatsappForward;
  const whatsapp = `${phone.replace('+','')}@c.us`;

  try {
    const response = await client.sendMessage(whatsapp, message);
    
    if (response.id.fromMe) {
      return {
        status:'success',
        message:`Message successfully sent to ${whatsapp}`
      };
    };
  } catch (error) {
    throw new Error(error);
  }
})