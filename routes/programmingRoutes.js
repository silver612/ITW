const { Router } = require('express');
const programmingController = require('../controllers/programmingController');
const router = Router();

router.get('/', programmingController.topics_get);
router.get('/ask', programmingController.questions_ask_get);
router.get('/question/:id', programmingController.question_details_get);
router.delete('/question/:id', programmingController.question_delete);
router.get('/create', programmingController.topic_create_get);
router.post('/create', programmingController.topic_create_post);
router.get('/:id',programmingController.topic_questions_get);
router.post('/', programmingController.questions_post);

module.exports = router;