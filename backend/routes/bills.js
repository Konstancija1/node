const express = require('express');
const router = express.Router();

router.get('/:group_id', (req, res) => {
  const groupId = req.params.group_id;
});

router.post('/', (req, res) => {});

module.exports = router;
