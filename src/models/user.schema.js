const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    referralCode: {
      type: String,
      required: true,
      trim: true,
      unque: true,
    },
    walletAddress: {
      type: String,
      required: true,
      trim: true,
    },
    uplineId: {
      type: String,
      required: false,
      trim: true,
    },
    telegramUsername: {
      type: String,
      required: true,
      trim: true,
    },
    twitterUsername: {
      type: String,
      required: true,
      trim: true,
    },
    balance: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    referralCount: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

module.exports = userSchema;
