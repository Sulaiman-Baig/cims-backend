module.exports = (sequelize, type) => {
    return sequelize.define("student_action_remark", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      type: type.STRING,
      remarks: type.STRING,
     
    });
  };
  