const express = require('express');
const router = express.Router();
const dataSource = require('../services/dataSource');

router.get('/', async (req, res, next) => {
  try {
    const search = (req.query.search || '').trim();
    const products = await dataSource.getAll({ name: search || undefined });
    res.render('index', { products, search, hostname: require('os').hostname(), source: dataSource.isMongo ? 'mongodb' : 'in-memory' });
  } catch (err) { next(err); }
});

module.exports = router;
