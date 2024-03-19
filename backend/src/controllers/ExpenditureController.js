// ExpenditureController.js

const ExpenditureSchema = require("../models/ExpenditureModel");

const addExpenditure = async (req, res) => {
  try {
    const data = req.body;
    const dataWithUploadDateTime = data.map((item) => ({
      ...item,
      UploadDate: item.UploadDate || getCurrentDate(), // Add UploadDate if not present
      UploadTime: item.UploadTime || getCurrentTime(), // Add UploadTime if not present
    }));

    await Promise.all(
      dataWithUploadDateTime.map(async (element) => {
        const {
          UploadTime,
          UploadDate,
          Mentor,
          name,
          description,
          card,
          amount,
          date,
          file,
        } = element;

        const expenditureData = new ExpenditureSchema({
          UploadTime,
          UploadDate,
          Mentor,
          name,
          description,
          card,
          amount,
          date,
          file,
        });

        await expenditureData.save();
      })
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

function getCurrentDate() {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function getCurrentTime() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()} ${
    date.getHours() < 12 ? "am" : "pm"
  }`;
}

module.exports = { addExpenditure };
