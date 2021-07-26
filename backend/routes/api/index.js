const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessRouter = require('./businesses')
const reviewRouter = require('./reviews')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/businesses', businessRouter)
router.use('/reviews', reviewRouter)

module.exports = router;
