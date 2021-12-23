import { promisify } from 'util';
import { createClient } from 'redis'
import config from '@/config';

const redis = createClient({
  host: config.redis.host
});

redis.on("error", function () {
  throw new Error('Redis is not answering')
});

export default () => {
  const setAsync = promisify(redis.set).bind(redis);
  const getAsync = promisify(redis.get).bind(redis);
  const delAsync = promisify(redis.del).bind(redis);

  return { ...redis, setAsync, getAsync, delAsync }
};
