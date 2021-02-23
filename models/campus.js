module.exports = (sequelize, type) => {
    return sequelize.define("campus", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      name: type.STRING,
      city: type.STRING,
      alias: type.STRING,
      location: type.STRING,
      campus_inguration_date: type.DATE,
      remarks: type.STRING,
     
    });
  };
  