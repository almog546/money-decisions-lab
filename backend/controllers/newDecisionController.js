const prisma = require('../prismaClient');
async function createNewDecision(req, res) {
    const { title, description, amount, type, confidence } = req.body;
    try {
        const newDecision = await prisma.decision.create({
            data: {
                title,
                description,
                amount,
                type,
                confidence,
                userId: req.session.userId,
            },
        });
        res.status(201).json(newDecision);
    } catch (error) {
        console.error('Error creating new decision:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    createNewDecision,
};
