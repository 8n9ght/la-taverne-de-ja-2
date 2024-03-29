const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders');

router.post('/', orderCtrl.createOrder);
router.put('/:id', orderCtrl.readyOrder);
router.put('/:id', orderCtrl.archiveOrder);

module.exports = router;