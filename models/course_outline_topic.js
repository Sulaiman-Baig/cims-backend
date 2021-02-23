module.exports = (sequelize, type) => {
    return sequelize.define("course_outline_topic", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      topic: type.STRING,
     
    });
  };
  