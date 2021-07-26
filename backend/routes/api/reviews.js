const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Review } = require('../../db/models')

// router.get('/', asyncHandler(async (req, res) => {
//   const reviews = await Review.findAll({
//     order: [['updatedAt', 'DESC']]
//   });
//   return res.json(reviews)
// }))

router.post('/:businessId/reviews', asyncHandler(async function (req, res) {
  const data = req.body;
  const review = await Review.create(data)
  const newReview = await Review.findByPk(review.businessId)

  return res.json(newReview);
}))

router.put('/:reviewId', asyncHandler(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId)
  const { userId, businessId, rating, reviewText } = req.body
  const updated = { userId, businessId, rating, reviewText, liked };
  const updatedReview = await review.update(updated)

  return res.json(updatedReview);
}))

router.delete('/:reviewId', asyncHandler(async (req, res) => {

  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId)
  await review.destroy();

  return res.json(review.id)

}))

module.exports = router;
