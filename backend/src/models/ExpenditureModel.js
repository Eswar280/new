const mongoose = require("mongoose");

const ExpenditureSchema = new mongoose.Schema({
  UploadTime: {
    type: String,
    default: function () {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return (
        (hours < 12 ? hours : hours - 12) +
        ":" +
        (minutes < 10 ? "0" : "") +
        minutes +
        (hours < 12 ? " am" : " pm")
      );
    },
  },
  UploadDate: {
    type: String,
    default: function () {
      const date = new Date();
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    },
  },
  Parent: {
    type: String,
  },
  Mentor: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  card: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: String,
  },
  file: {
    type: String,
  },
});

module.exports = mongoose.model("Expenditure", ExpenditureSchema);
