const { Router } = require('express');
const interviewController = require('../controllers/interviewController');
const router = Router();

router.get('/', interviewController.interviews_get);
router.post('/', interviewController.interviews_post);
router.get('/share', interviewController.interviews_share_get);
router.get('/:id',interviewController.interviews_details_get);
router.delete('/:id', interviewController.interviews_details_delete);

module.exports = router;