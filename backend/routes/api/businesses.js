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

}))

module.exports = router;
