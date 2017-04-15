var router = require('express').Router()

// Add Routes
router.use(require('./users'));
router.use(require('./teams'));
router.use(require('./tournaments'));
router.use(require('./schedules'));
router.use(require('./games'));
router.use(require('./announcements'));
router.use(require('./inbox'));
router.use(require('./chats'));
router.use(require('./search'));

module.exports = router
