const prisma = require('../prismaClient');

async function getUserHistory(req, res) {
    try {
        const history = await prisma.decision.findMany({
            where: {
                userId: req.session.userId,
                reviewedAt: {
                    not: null,
                },
            },
            orderBy: { reviewedAt: 'desc' },
        });
        res.json(history);
    } catch (error) {
        console.error('Error fetching user history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUserHistory,
};
