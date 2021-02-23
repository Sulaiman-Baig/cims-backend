module.exports = (sequelize, type) => {
    return sequelize.define("event", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      type: type.STRING,
      title: type.STRING,
      venue: type.STRING,
      start_date: type.DATE,
      end_date: type.DATE,
      start_time: type.STRING,
      end_time: type.STRING,
      image: type.STRING,
     
    });
  };
  