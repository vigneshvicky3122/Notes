const redis = require("redis");

const Client = () => {
  return redis.createClient({
    url: process.env.REDIS_URL,
  });
};

const RedisClient = Client();

RedisClient.on("error", (error) => {
  console.log(error);
});

RedisClient.on("connect", () => {
  console.log("Ready to Connect Redis...");
});

RedisClient.on("end", () => {
  console.log("Redis Connection Ended");
});

RedisClient.on("SIGQUIT", () => {
  RedisClient.quit();
});

module.exports = RedisClient;
