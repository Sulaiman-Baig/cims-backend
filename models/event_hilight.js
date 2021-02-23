module.exports = (sequelize, type) => {
    return sequelize.define("event_hilight", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      highlight: type.STRING,
    });
  };
  