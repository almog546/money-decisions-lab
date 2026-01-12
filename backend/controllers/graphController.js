const prisma = require('../prismaClient');

async function getConfidenceByoutcome(req, res) {
    try {
        const decisions = await prisma.decision.findMany({
            where: {
                userId: req.session.userId,
                reviewedAt: {
                    not: null,
                },
            },
            select: {
                reviewOutcome: true,
                confidence: true,
            },
        });
        const outcomeConfidenceMap = {
            YES: { LOW: 0, MEDIUM: 0, HIGH: 0 },
            NO: { LOW: 0, MEDIUM: 0, HIGH: 0 },
            DONTMATTER: { LOW: 0, MEDIUM: 0, HIGH: 0 },
        };
        decisions.forEach((d) => {
            if (d.reviewOutcome && d.confidence) {
                outcomeConfidenceMap[d.reviewOutcome][d.confidence] += 1;
            }
        });
        res.json({
            labels: ['YES', 'NO', 'Dont Matter'],
            datasets: [
                {
                    label: 'LOW',
                    data: [
                        outcomeConfidenceMap.YES.LOW,
                        outcomeConfidenceMap.NO.LOW,
                        outcomeConfidenceMap.DONTMATTER.LOW,
                    ],
                    backgroundColor: 'rgba(71, 85, 105, 0.7)',
                    borderColor: '#475569',
                    borderWidth: 1,
                    barThickness: 36,
                    borderRadius: 6,
                    categoryPercentage: 0.5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    maxBarThickness: 30,
                },
                {
                    label: 'MEDIUM',
                    data: [
                        outcomeConfidenceMap.YES.MEDIUM,
                        outcomeConfidenceMap.NO.MEDIUM,
                        outcomeConfidenceMap.DONTMATTER.MEDIUM,
                    ],
                    backgroundColor: 'rgba(30, 58, 138, 0.7)',
                    borderColor: '#1e3a8a',
                    borderWidth: 1,
                    barThickness: 36,
                    borderRadius: 6,
                    categoryPercentage: 0.5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    maxBarThickness: 30,
                },
                {
                    label: 'HIGH',
                    data: [
                        outcomeConfidenceMap.YES.HIGH,
                        outcomeConfidenceMap.NO.HIGH,
                        outcomeConfidenceMap.DONTMATTER.HIGH,
                    ],
                    backgroundColor: 'rgba(5, 150, 105, 0.7)',
                    borderColor: '#059669',
                    borderWidth: 1,
                    barThickness: 36,
                    borderRadius: 6,
                    categoryPercentage: 0.5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    maxBarThickness: 30,
                },
            ],
        });
    } catch (error) {
        console.error('Error fetching confidence by outcome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getAmountByoutcome(req, res) {
    try {
        const decisions = await prisma.decision.findMany({
            where: {
                userId: req.session.userId,
                reviewedAt: {
                    not: null,
                },
            },
            select: {
                reviewOutcome: true,
                amount: true,
            },
        });
        const outcomeAmountMap = {
            '0-50': { YES: 0, NO: 0, DONTMATTER: 0 },
            '51-200': { YES: 0, NO: 0, DONTMATTER: 0 },
            '201+': { YES: 0, NO: 0, DONTMATTER: 0 },
        };
        decisions.forEach((d) => {
            if (d.reviewOutcome && d.amount !== null) {
                if (d.amount <= 50) {
                    outcomeAmountMap['0-50'][d.reviewOutcome] += 1;
                } else if (d.amount <= 200) {
                    outcomeAmountMap['51-200'][d.reviewOutcome] += 1;
                } else {
                    outcomeAmountMap['201+'][d.reviewOutcome] += 1;
                }
            }
        });
        res.json({
            labels: ['0-50', '50-200', '200+'],
            datasets: [
                {
                    label: 'YES',
                    data: [
                        outcomeAmountMap['0-50'].YES,
                        outcomeAmountMap['51-200'].YES,
                        outcomeAmountMap['201+'].YES,
                    ],
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: '#10b981',
                    borderWidth: 1,
                    barThickness: 36,
                    borderRadius: 6,
                    categoryPercentage: 0.5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    maxBarThickness: 30,
                },
                {
                    label: 'NO',
                    data: [
                        outcomeAmountMap['0-50'].NO,
                        outcomeAmountMap['51-200'].NO,
                        outcomeAmountMap['201+'].NO,
                    ],
                    backgroundColor: 'rgba(220, 38, 38, 0.7)',
                    borderColor: '#dc2626',
                    borderWidth: 1,
                    barThickness: 36,
                    borderRadius: 6,
                    categoryPercentage: 0.5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    maxBarThickness: 30,
                },
                {
                    label: "DON'T MATTER",
                    data: [
                        outcomeAmountMap['0-50'].DONTMATTER,
                        outcomeAmountMap['51-200'].DONTMATTER,
                        outcomeAmountMap['201+'].DONTMATTER,
                    ],
                    backgroundColor: 'rgba(107, 114, 128, 0.7)',
                    borderColor: '#6b7280',
                    borderWidth: 1,
                    barThickness: 36,
                    borderRadius: 6,
                    categoryPercentage: 0.5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    maxBarThickness: 30,
                },
            ],
        });
    } catch (error) {
        console.error('Error fetching amount by outcome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function gettypeByoutcome(req, res) {
    try {
        const decisions = await prisma.decision.findMany({
            where: {
                userId: req.session.userId,
                reviewedAt: {
                    not: null,
                },
            },
            select: {
                reviewOutcome: true,
                type: true,
            },
        });
        const outcomeTypeMap = {
            Purchase: { YES: 0, NO: 0, DONTMATTER: 0 },
            Subscription: { YES: 0, NO: 0, DONTMATTER: 0 },
        };
        decisions.forEach((d) => {
            if (d.reviewOutcome && d.type) {
                outcomeTypeMap[d.type][d.reviewOutcome] += 1;
            }
        });
        res.json({
            labels: ['Purchase', 'Subscription'],
            datasets: [
                {
                    label: 'YES',
                    data: [
                        outcomeTypeMap.Purchase.YES,
                        outcomeTypeMap.Subscription.YES,
                    ],
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: '#10b981',
                    borderWidth: 1,
                    barThickness: 36,
                    borderRadius: 6,
                    categoryPercentage: 0.5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    maxBarThickness: 30,
                },
                {
                    label: 'NO',
                    data: [
                        outcomeTypeMap.Purchase.NO,
                        outcomeTypeMap.Subscription.NO,
                    ],
                    backgroundColor: 'rgba(220, 38, 38, 0.7)',
                    borderColor: '#dc2626',
                    borderWidth: 1,
                    barThickness: 36,
                    borderRadius: 6,
                    categoryPercentage: 0.5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    maxBarThickness: 30,
                },
                {
                    label: "DON'T MATTER",

                    data: [
                        outcomeTypeMap.Purchase.DONTMATTER,
                        outcomeTypeMap.Subscription.DONTMATTER,
                    ],
                    backgroundColor: 'rgba(107, 114, 128, 0.7)',
                    borderColor: '#6b7280',
                    borderWidth: 1,
                    barThickness: 36,
                    borderRadius: 6,
                    categoryPercentage: 0.5,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                    maxBarThickness: 30,
                },
            ],
        });
    } catch (error) {
        console.error('Error fetching type by outcome:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getConfidenceByoutcome,
    getAmountByoutcome,
    gettypeByoutcome,
};
