const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Business, User, Review } = require('../../db/models')

router.get('/', asyncHandler(async (req, res) => {
  const businesses = await Business.findAll();
  res.json(businesses);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const oneBusiness = await Business.findByPk(req.params.id)
  return res.json(oneBusiness);
}))

router.post('/', asyncHandler(async function (req, res) {
  const data = req.body;
  const business = await Business.create(data)
  const newBusiness = await Business.findByPk(business.id, {
    include: User
  })

  res.json(newBusiness)
}))

router.put('/:id', asyncHandler(async function (req, res) {
  const id = req.body.id
  delete req.body.id;

  await Business.update(req.body,
    { where: { id } }
  )

  const business = await Business.findByPk(id)
  return res.json(business)
}))


router.delete('/:id', asyncHandler(async function (req, res) {
  const businessId = req.params.id
  const business = await Business.findByPk(businessId);

  const deletedBusiness = await Business.destroy({ where: { id: businessId } })

  return res.json();
}))

router.get('/:id/reviews', asyncHandler(async function (req, res) {
  const businessId = req.params.id;
  const reviews = await Review.findAll({
    include: User,
    where: { businessId }
  })
  return res.json(reviews)
}))

module.exports = router;
