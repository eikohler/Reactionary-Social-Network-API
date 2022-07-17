const { Thought, User } = require('../models');

const thoughtController = {
  // get all Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one Thought by id
  getThoughtbyID({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

    // createThought
    createThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },

    // update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(data => {
          if (!data) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
          }
          res.json(data);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
        }
        res.json(data);
        })
        .catch(err => res.status(400).json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },

    removeReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true }
        )
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },
};

module.exports = thoughtController;