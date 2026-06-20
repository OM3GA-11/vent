const prisma = require("../config/prisma");

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        vents: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            _count: {
              select: {
                comments: true,
                votes: true,
              },
            },
          },
        },
        _count: {
          select: {
            vents: true,
            comments: true,
          },
        },
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getProfile,
};