import { client } from '~/plugins/1.whatsappClient'


export default eventHandler(async _event => {

  try {

    const state = await client.getState();
  
    return {
      state
    };
  } catch (error) {
    
    return {
      state: null
    };
  }

});