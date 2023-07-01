const User = require("../models/User");

const releaseBlockedAccounts = async () => {
  const currentTime = new Date();

  const blockedUsers = await User.find({
    isBlocked: true,
    blockReleaseTime: { $lte: currentTime },
  });

  for (const user of blockedUsers) {
    user.isBlocked = false;
    user.loginAttempts = 0;
    user.blockReleaseTime = null;
    await user.save();
  }
};

setInterval(releaseBlockedAccounts, 60 * 1000);
