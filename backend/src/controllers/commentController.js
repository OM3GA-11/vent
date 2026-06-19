const prisma = require("../config/prisma");

const createComment = async (req, res) => {
  try {
    const { content, ventId } = req.body;

    if (!content || !ventId) {
      return res.status(400).json({
        message: "Content and ventId are required",
      });
    }

    const vent = await prisma.vent.findUnique({
      where: { id: ventId },
    });

    if (!vent) {
      return res.status(404).json({
        message: "Vent not found",
      });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        ventId,
        authorId: req.user.userId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createComment,
};