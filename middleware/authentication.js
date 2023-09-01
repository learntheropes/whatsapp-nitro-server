export default defineEventHandler(event => {

  const { telegramToken } = useRuntimeConfig(event);
  const authorization = getHeader(event, 'authorization');
  const token = authorization && authorization.split(' ')[1];

  if (!authorization || !token) {
    
    throw createError({
      statusMessage: 'Unauthenticated',
      statusCode: 401,
    });
  };

  if (token !== telegramToken) {

    throw createError({
      statusMessage: 'Unauthorized',
      statusCode: 403,
    });
  }
});
