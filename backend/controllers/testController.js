/**
 * @description Get test
 * @route GET /api/test
 * @access Private
 */
const getTest = (req, res) => {
  res.status(200).json({ message: "test get" });
};

/**
 * @description Set test
 * @route POST /api/test
 * @access Private
 */
const setTest = (req, res) => {
  res.status(200).json({ message: "test set" });
};

/**
 * @description Update test
 * @route PUT /api/test/:id
 * @access Private
 */
const updateTest = (req, res) => {
  res.status(200).json({ message: `test update. id: ${req.params.id}` });
};

/**
 * @description Delete test
 * @route DELETE /api/test/:id
 * @access Private
 */
const deleteTest = (req, res) => {
  res.status(200).json({ message: `test delete. id: ${req.params.id}` });
};

module.exports = {
  getTest,
  setTest,
  updateTest,
  deleteTest,
};
