import { createClient } from 'redis'
import { promisify } from 'util';

const redis = createClient();

redis.on("error", function () {
  throw new Error('Redis is not answering')
});

export default () => {
  const setAsync = promisify(redis.set).bind(redis);
  const getAsync = promisify(redis.get).bind(redis);
  const delAsync = promisify(redis.del).bind(redis);

  return { ...redis, setAsync, getAsync, delAsync }
};
