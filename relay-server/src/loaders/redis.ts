import { createClient } from 'redis'
import { promisify } from 'util';

export const redis = createClient();

export default () => {
  const setAsync = promisify(redis.set).bind(redis);
  const getAsync = promisify(redis.get).bind(redis);
  const delAsync = promisify(redis.del).bind(redis);

  redis.on("error", function () {
    throw new Error('Redis is not answering')
  });

  return { ...redis, setAsync, getAsync, delAsync }
};
