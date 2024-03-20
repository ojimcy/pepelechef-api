const Joi = require('joi');

const joinAirdrop = {
  body: Joi.object().keys({
    walletAddress: Joi.string().required(),
    telegramUsername: Joi.string().required(),
    uplineId: Joi.string().optional(),
    twitterUsername: Joi.string().required(),
  }),
};

const getUserByWalletAddress = {
  query: Joi.object().keys({
    walletAddress: Joi.string().required(),
  }),
};

module.exports = { joinAirdrop, getUserByWalletAddress };
