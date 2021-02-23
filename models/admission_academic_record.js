module.exports = (sequelize, type) => {
    return sequelize.define("admission_academic_record", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      certificate: type.STRING,
      institute: type.STRING,
      year: type.STRING,
      percentage: type.INTEGER,
     
    });
  };
  