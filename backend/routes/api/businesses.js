const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Business } = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
  const businesses = await Business.findAll();
  // console.log(businesses)
  res.json(businesses);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const oneBusiness = await Business.findByPk(req.params.id)
  return res.json(oneBusiness);
}))

module.exports = router;
