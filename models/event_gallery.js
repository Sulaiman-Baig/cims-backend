module.exports = (sequelize, type) => {
    return sequelize.define("event_gallery", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      image: type.STRING,
    });
  };
  