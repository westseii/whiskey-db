const asyncHandler = require("express-async-handler");

const Test = require("../models/testModel");

/**
 * @description Get tests
 * @route GET /api/test
 * @access Private
 */
const getTests = asyncHandler(async (req, res) => {
  const tests = await Test.find();

  if (!tests.length) {
    res.status(400);
    throw new Error("No tests found");
  }

  res.status(200).json(tests);
});

//
//
//
//
//
/**
 * @description Get test
 * @route GET /api/test/:id
 * @access Private
 */
const getTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    res.status(400);
    throw new Error(`Test with id ${req.params.id} not found`);
  }

  res.status(200).json(test);
});

//
//
//
//
//
/**
 * @description Set test
 * @route POST /api/test
 * @access Private
 */
const setTest = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Missing key: text");
  }

  const test = await Test.create({
    text: req.body.text,
  });

  res.status(201).json(test);
});

//
//
//
//
//
/**
 * @description Update test
 * @route PUT /api/test/:id
 * @access Private
 */
const updateTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    res.status(400);
    throw new Error(`Test with id ${req.params.id} not found`);
  }

  const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return updated test
  });

  res.status(201).json(updatedTest);
});

//
//
//
//
//
/**
 * @description Delete test
 * @route DELETE /api/test/:id
 * @access Private
 */
const deleteTest = asyncHandler(async (req, res) => {
  const deletedTest = await Test.findByIdAndDelete(req.params.id);

  if (!deletedTest) {
    res.status(400);
    throw new Error(`Test with id ${req.params.id} not found`);
  }
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTests,
  getTest,
  setTest,
  updateTest,
  deleteTest,
};
