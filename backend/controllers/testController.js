const asyncHandler = require("express-async-handler");

const Test = require("../models/testModel");

/**
 * @description Get tests
 * @route GET /api/test
 * @access Private
 */
const getTests = asyncHandler(async (req, res) => {
  const tests = await Test.find({ user: req.user.id });

  if (!tests.length) {
    res.status(400);
    throw new Error("No tests found for this user");
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
  const test = await Test.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!test) {
    res.status(400);
    throw new Error(`Test with id ${req.params.id} not found for this user`);
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
    throw new Error("Body missing key: text");
  }

  const createdTest = await Test.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.status(201).json(createdTest);
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
  const updatedTest = await Test.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id,
    },
    req.body,
    {
      new: true,
    }
  );

  if (!updatedTest) {
    res.status(400);
    throw new Error(`Test with id ${req.params.id} not found for this user`);
  }

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
  const deletedTest = await Test.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!deletedTest) {
    res.status(400);
    throw new Error(`Test with id ${req.params.id} not found for this user`);
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
