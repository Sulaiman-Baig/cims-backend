module.exports = (sequelize, type) => {
    return sequelize.define("user", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      username: type.STRING,
      role: type.STRING,
      password: type.STRING,
      email: type.STRING,
      is_active: type.BOOLEAN,
      
     
    });
  };
  