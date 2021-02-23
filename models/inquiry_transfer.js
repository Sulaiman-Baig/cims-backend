module.exports = (sequelize, type) => {
    return sequelize.define("inquiry_transfer", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      status: type.STRING,
      reason: type.STRING,
      remarks: type.TEXT
     
    });
  };
  