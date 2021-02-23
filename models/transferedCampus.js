module.exports = (sequelize, type) => {
    return sequelize.define("transfered_campus", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      }      
     
    });
  };