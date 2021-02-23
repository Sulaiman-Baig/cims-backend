module.exports = (sequelize, type) => {
    return sequelize.define("course_outline_heading", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      heading: type.STRING,
     
    });
  };
  