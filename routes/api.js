const express = require('express');
const { prisma } = require('../utils/db');

const apiRouter = new express.Router();

const VALID_TYPES = ['country', 'state', 'province'];
const VALID_STATUSES = ['visited', 'planned'];

apiRouter.get('/visits', async (req, res) => {
    const visits = await prisma.visit.findMany({
        orderBy: [{ type: 'asc' }, { code: 'asc' }]
    });
    res.json(visits);
});

apiRouter.post('/visits', async (req, res) => {
    const { type, code, status, visitedAt } = req.body || {};

    if (!VALID_TYPES.includes(type)) {
        return res.status(400).json({ error: 'invalid type' });
    }
    if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: 'invalid status' });
    }
    if (typeof code !== 'string' || !code.trim()) {
        return res.status(400).json({ error: 'invalid code' });
    }

    const cleanCode = code.trim().toUpperCase();
    const date = visitedAt ? new Date(visitedAt) : null;
    if (visitedAt && isNaN(date.getTime())) {
        return res.status(400).json({ error: 'invalid visitedAt' });
    }

    const visit = await prisma.visit.upsert({
        where: { type_code: { type, code: cleanCode } },
        update: { status, visitedAt: date },
        create: { type, code: cleanCode, status, visitedAt: date }
    });
    res.json(visit);
});

apiRouter.delete('/visits/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'invalid id' });
    }
    await prisma.visit.delete({ where: { id } });
    res.json({ ok: true });
});

module.exports = apiRouter;
