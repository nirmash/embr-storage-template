const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', '..', 'testfile.txt');

// GET /api/testfile — read the file contents
router.get('/', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') return res.json({ contents: '' });
      return res.status(500).json({ error: err.message });
    }
    res.json({ contents: data });
  });
});

// All other methods — append a timestamped line
router.all('/', (req, res) => {
  const line = new Date().toISOString() + '\n';
  fs.appendFile(FILE_PATH, line, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Line added', line: line.trim() });
  });
});

module.exports = router;
