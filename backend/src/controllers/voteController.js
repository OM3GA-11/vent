const prisma = require("../config/prisma");

const voteVent = async (req, res) => {
  try {
    const { ventId, value } = req.body;

    if (!ventId || ![1, -1].includes(value)) {
      return res.status(400).json({
        message: "Invalid vote value",
      });
    }

    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_ventId: {
          userId: req.user.userId,
          ventId,
        },
      },
    });

    let vote;

    if (existingVote) {
      vote = await prisma.vote.update({
        where: {
          userId_ventId: {
            userId: req.user.userId,
            ventId,
          },
        },
        data: { value },
      });
    } else {
      vote = await prisma.vote.create({
        data: {
          value,
          ventId,
          userId: req.user.userId,
        },
      });
    }

    res.json(vote);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { voteVent };