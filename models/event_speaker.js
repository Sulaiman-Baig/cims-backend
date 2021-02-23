module.exports = (sequelize, type) => {
    return sequelize.define("event_speaker", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      name: type.STRING,
      short_description: type.STRING,
      image: type.STRING,
    });
  };
  