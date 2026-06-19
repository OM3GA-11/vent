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
    const vents = await prisma.vent.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
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

    res.json(vents);
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
      },
    });

    if (!vent) {
      return res.status(404).json({
        message: "Vent not found",
      });
    }

    res.json(vent);
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