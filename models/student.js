module.exports = (sequelize, type) => {
    return sequelize.define("student", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      registeration_no: type.STRING,
      roll_no: type.STRING,
      is_transfer: type.BOOLEAN,
      status: type.STRING,
      student_no: type.INTEGER,
     
    });
  };
  