const prisma = require('../prismaClient');

async function submitReviewOutcome(req, res) {
    const { reviewOutcome, decisionId } = req.body;
    try {
        const updatedDecision = await prisma.decision.updateMany({
            where: {
                id: decisionId,
                userId: req.session.userId,
                reviewedAt: null,
            },
            data: {
                reviewOutcome: reviewOutcome,
                reviewedAt: new Date(),
            },
        });
        if (updatedDecision.count === 0) {
            return res
                .status(404)
                .json({ message: 'Decision not found or already reviewed' });
        }
        res.json({ message: 'Review outcome submitted successfully' });
    } catch (error) {
        console.error('Error submitting review outcome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    submitReviewOutcome,
};
