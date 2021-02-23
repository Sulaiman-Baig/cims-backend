module.exports = (sequelize, type) => {
    return sequelize.define("student_transfer", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      reason: type.STRING,
      remarks: type.STRING,
      type: type.STRING,
     
    });
  };
  