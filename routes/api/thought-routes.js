const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtbyID,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');


router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);


router
  .route('/:id')
  .get(getThoughtbyID)
  .put(updateThought)
  .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;