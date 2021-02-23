module.exports = (sequelize, type) => {
    return sequelize.define("course", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      title: type.STRING,
      alias: type.STRING,
      fee_package: type.INTEGER,
      duration_in_weeks: type.STRING,
      image: type.STRING,
      course_brief: type.TEXT,
      learning_out_comes: type.TEXT,
      target_audience: type.TEXT,
      prerequisite: type.TEXT,
      is_featured: type.BOOLEAN,
      is_trending: type.BOOLEAN,
     
    });
  };
  