const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.joinAirdrop), userController.joinAirdrop)
  .get(validate(userValidation.getUserByWalletAddress), userController.getUserByWalletAddress);

module.exports = router;
