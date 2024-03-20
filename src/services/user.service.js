const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const crypto = require('crypto');

// Define reward amounts
const userRewardAmount = 1000000;
const uplineRewardAmount = 50000;

/**
 * Generate a referral code
 * @returns {string} Referral code
 */
const generateReferralCode = async () => {
  const userModel = await User();

  while (true) {
    const referralCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const user = await userModel.findOne({ referralCode: referralCode });
    if (!user) {
      return referralCode;
    }
  }
};

/**
 * Join the airdrop
 * @param {Object} userData
 * @returns {Promise<AirdropUser>}
 */
const joinAirdrop = async (userData) => {
  const userModel = await User();

  const { walletAddress, telegramUsername, twitterUsername, uplineId } =
    userData;

  // Check if the user already exists
  const existingUser = await userModel.findOne({
    $or: [{ walletAddress }, { telegramUsername }, { twitterUsername }],
  });
  if (existingUser) {
    return existingUser;
  }

  // Generate a referral code
  const referralCode = await generateReferralCode();

  // Add the referral code to user data
  userData.referralCode = referralCode;

  // Verify if the upline user exists
  let uplineExist = null;
  if (uplineId) {
    uplineExist = await userModel.findOne({ referralCode: uplineId });
    if (!uplineExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid upline ID');
    }
  }

  // Create the airdrop user
  const newUser = await userModel.create(userData);
  // Update user's balance with user reward
  newUser.balance += userRewardAmount;
  await newUser.save();

  // Find upline user
  const upline = await userModel.findOne({ referralCode: uplineId });
  if (upline) {
    // Update upline's balance with upline reward
    upline.balance += uplineRewardAmount;
    upline.referralCount += 1;
    console.log(upline);
    await upline.save();
  }

  return newUser;
};

/**
 * Get a user by their wallet address
 * @param {string} walletAddress
 * @returns {Promise<User>}
 */
const getUserByWalletAddress = async (walletAddress) => {
  const userModel = await User();

  const user = await userModel.findOne({ walletAddress });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

module.exports = {
  joinAirdrop,
  getUserByWalletAddress,
};
