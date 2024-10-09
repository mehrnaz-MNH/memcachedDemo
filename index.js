import redis from 'redis';

const redisClient = redis.createClient({
   url: 'redis://localhost:6379', // Adjust the URL if necessary
});

// Connect to Redis
redisClient.on('connect', () => {
   console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
   console.error('Redis error:', err);
});

// Main function to test Redis
async function testRedis() {
   try {
      await redisClient.connect(); // Ensure the client is connected

      // Set a value
      await redisClient.set('key', 'value');
      console.log('Value set: key = value');

      // Get the value
      const value = await redisClient.get('key');
      console.log('Value retrieved:', value);

      // Cleanup: delete the key
      await redisClient.del('key');
      console.log('Key deleted');
   } catch (err) {
      console.error('Error in Redis operations:', err);
   } finally {
      // Ensure the client is closed at the end
      await redisClient.quit();
      console.log('Redis client closed');
   }
}

// Run the test function
testRedis().catch(console.error);
