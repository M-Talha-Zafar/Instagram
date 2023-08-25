const { Queue, Worker } = require("bullmq");
const Story = require("../models/story");
const User = require("../models/user");
const { spawn } = require("child_process");
const redisServerProcess = spawn("redis-server", []);

const storyFlushQueue = new Queue("storyFlushQueue", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

const storyFlushWorker = new Worker(
  "storyFlushQueue",
  async (job) => {
    const storyId = job.data.storyId;
    const story = await Story.findByIdAndDelete(storyId);
    await User.updateOne({ _id: story.user }, { $pull: { stories: storyId } });
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);

redisServerProcess.on("close", (code) => {
  console.log(`Redis server process exited with code ${code}`);
});

module.exports = storyFlushQueue;
