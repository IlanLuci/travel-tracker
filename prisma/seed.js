const { prisma } = require('../utils/db');

const countriesVisited = [
    { code: 'US', date: '2025-06-15' },
    { code: 'CA', date: '2025-07-20' },
    { code: 'LI', date: '2025-08-10' },
    { code: 'HR', date: '2025-08-12' },
    { code: 'SI', date: '2025-08-14' },
    { code: 'IT', date: '2025-08-16' },
    { code: 'FR', date: '2025-08-20' },
    { code: 'DE', date: '2025-08-22' },
    { code: 'ES', date: '2025-08-25' },
    { code: 'CH', date: '2025-08-27' },
    { code: 'NL', date: '2025-09-01' },
    { code: 'IL', date: '2025-09-05' },
    { code: 'KY', date: '2025-09-10' },
    { code: 'AT', date: '2025-09-15' },
    { code: 'IS', date: '2025-09-20' },
    { code: 'PR', date: '2025-09-25' },
    { code: 'DK', date: '2026-05-01' }
];

const statesVisited = [
    'ME', 'AZ', 'MD', 'MO', 'VA', 'WA', 'ND', 'MT', 'CO', 'WY',
    'SD', 'IL', 'CA', 'LA', 'VT', 'PA', 'NE', 'CT', 'FL', 'MA',
    'NH', 'NJ', 'NY', 'DC'
];

const provincesVisited = ['ON', 'QC'];

const countriesPlanned = ['IE', 'MA', 'AD', 'CZ', 'HU', 'PT'];
const statesPlanned = [];
const provincesPlanned = [];

const defaultStateDate = '2025-05-15';

async function main() {
    await prisma.visit.deleteMany();

    for (const { code, date } of countriesVisited) {
        await prisma.visit.create({
            data: { type: 'country', code, status: 'visited', visitedAt: new Date(date) }
        });
    }
    for (const code of statesVisited) {
        await prisma.visit.create({
            data: { type: 'state', code, status: 'visited', visitedAt: new Date(defaultStateDate) }
        });
    }
    for (const code of provincesVisited) {
        await prisma.visit.create({
            data: { type: 'province', code, status: 'visited', visitedAt: new Date(defaultStateDate) }
        });
    }

    for (const code of countriesPlanned) {
        await prisma.visit.create({
            data: { type: 'country', code, status: 'planned', visitedAt: null }
        });
    }
    for (const code of statesPlanned) {
        await prisma.visit.create({
            data: { type: 'state', code, status: 'planned', visitedAt: null }
        });
    }
    for (const code of provincesPlanned) {
        await prisma.visit.create({
            data: { type: 'province', code, status: 'planned', visitedAt: null }
        });
    }

    const count = await prisma.visit.count();
    console.log(`Seeded ${count} visit records.`);
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
