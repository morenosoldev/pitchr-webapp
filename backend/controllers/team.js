const models = require("../models");
const employee = models.Employee;

const addMember = async (req, res) => {
  const { id } = req.params;
  const { name, jobTitle, profilePic, jobDescription, equity, linkedIn } =
    req.body.body;
  try {
    const newEmployee = await employee.create({
      name: name,
      jobTitle: jobTitle,
      profilePic: profilePic,
      equity: equity,
      jobDescription: jobDescription,
      BusinessUserId: id,
      linkedIn: linkedIn,
    });

    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMember = (req, res) => {
  const { id } = req.params;

  try {
    employee.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTeamMembers = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await employee.findAll({
      where: {
        BusinessUserId: id,
      },
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { deleteMember, addMember, getTeamMembers };
