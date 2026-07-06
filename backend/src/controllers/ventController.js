const prisma = require("../config/prisma");

const createVent = async (req, res) => {
  try {
    const { title, content, emotion } = req.body;

    if (!title || !content || !emotion) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const vent = await prisma.vent.create({
      data: {
        title,
        content,
        emotion,
        authorId: req.user.userId,
      },
    });

    res.status(201).json(vent);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllVents = async (req, res) => {
  try {
    const { emotion } = req.query;

    const vents = await prisma.vent.findMany({
      where: emotion ? { emotion } : {},
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        votes: true,
        _count: {
          select: {
            comments: true,
            votes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const ventsWithScore = vents.map((vent) => ({
  ...vent,
  voteScore: vent.votes.reduce(
    (sum, vote) => sum + vote.value,
    0
  ),
}));

    res.json(ventsWithScore);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getVentById = async (req, res) => {
  try {
    const { id } = req.params;

    const vent = await prisma.vent.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        votes: true,
      },
    });

    const ventWithScore = {
  ...vent,
  voteScore: vent.votes.reduce(
    (sum, vote) => sum + vote.value,
    0
  ),
};

    if (!vent) {
      return res.status(404).json({
        message: "Vent not found",
      });
    }

    res.json(ventWithScore);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createVent,
  getAllVents,
  getVentById,
};