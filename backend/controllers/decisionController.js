const prisma = require('../prismaClient');

async function getReviewDecisions(req, res) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    try {
        const decisions = await prisma.decision.findMany({
            where: {
                userId: req.session.userId,
                createdAt: {
                    lte: fiveMinutesAgo,
                },
                reviewedAt: null,
            },
            orderBy: { createdAt: 'asc' },
        });
        res.json(decisions);
    } catch (error) {
        console.error('Error fetching review decisions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getDecisionsByOutcome(req, res) {
    const { reviewOutcome } = req.body;
    try {
        const decisions = await prisma.decision.findMany({
            where: {
                userId: req.session.userId,
                reviewOutcome: reviewOutcome,
            },
        });
        res.json(decisions);
    } catch (error) {
        console.error('Error fetching decisions by outcome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    getReviewDecisions,
    getDecisionsByOutcome,
};
