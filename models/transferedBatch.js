module.exports = (sequelize, type) => {
    return sequelize.define("transfered_batch", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      }      
     
    });
  };