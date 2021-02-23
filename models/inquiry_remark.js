module.exports = (sequelize, type) => {
    return sequelize.define("inquiry_remark", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      type: type.STRING,
      is_available: type.BOOLEAN,
      status: type.STRING,
      next_follow_up_date: type.DATE,
      probability: type.STRING,
      subject: type.STRING,
      remarks: type.STRING,
     
    });
  };
  