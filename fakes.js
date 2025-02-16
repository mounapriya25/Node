const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Fake news detection endpoint
app.post('/analyze', (req, res) => {
  const { article } = req.body;

  if (!article) {
    return res.status(400).json({ message: 'No article provided' });
  }

  // Fake analysis logic (random decision for now)
  const isFake = Math.random() > 0.5;  // Simulating fake news detection

  res.json({
    result: isFake ? 'This article is likely fake.' : 'This article seems real.'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Fake News Backend running on http://localhost:${port}`);
});
