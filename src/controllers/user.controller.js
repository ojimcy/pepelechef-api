const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const joinAirdrop = catchAsync(async (req, res) => {
  const user = await userService.joinAirdrop(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUserByWalletAddress = catchAsync(async (req, res) => {
  const { walletAddress } = req.query;
  const user = await userService.getUserByWalletAddress(walletAddress);
  return res.status(httpStatus.OK).send(user);
});

module.exports = {
  joinAirdrop,
  getUserByWalletAddress,
};
