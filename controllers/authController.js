const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/student');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const student = new Student({ name, email, password });
    await student.save();
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    res.status(201).send({ student, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student || !(await bcrypt.compare(password, student.password))) {
      throw new Error('Invalid login credentials');
    }
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    res.send({ student, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { register, login };
