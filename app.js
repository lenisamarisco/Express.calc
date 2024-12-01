const express = require("express");
const app = express();
const {
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray,
} = require("./helpers");

// Middleware to parse query parameters
app.use(express.json());

// Routes
app.get("/mean", (req, res) => {
  const numsAsStrings = req.query.nums;

  if (!numsAsStrings) {
    return res.status(400).json({ error: "You must pass a query key of 'nums' with a comma-separated list of numbers." });
  }

  const nums = convertAndValidateNumsArray(numsAsStrings.split(","));
  if (nums instanceof Error) {
    return res.status(400).json({ error: nums.message });
  }

  const mean = findMean(nums);
  return res.json({ operation: "mean", value: mean });
});

app.get("/median", (req, res) => {
  const numsAsStrings = req.query.nums;

  if (!numsAsStrings) {
    return res.status(400).json({ error: "You must pass a query key of 'nums' with a comma-separated list of numbers." });
  }

  const nums = convertAndValidateNumsArray(numsAsStrings.split(","));
  if (nums instanceof Error) {
    return res.status(400).json({ error: nums.message });
  }

  const median = findMedian(nums);
  return res.json({ operation: "median", value: median });
});

app.get("/mode", (req, res) => {
  const numsAsStrings = req.query.nums;

  if (!numsAsStrings) {
    return res.status(400).json({ error: "You must pass a query key of 'nums' with a comma-separated list of numbers." });
  }

  const nums = convertAndValidateNumsArray(numsAsStrings.split(","));
  if (nums instanceof Error) {
    return res.status(400).json({ error: nums.message });
  }

  const mode = findMode(nums);
  return res.json({ operation: "mode", value: mode });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
