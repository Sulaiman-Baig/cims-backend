module.exports = (sequelize, type) => {
    return sequelize.define("batch", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      title: type.STRING,
      alias: type.STRING,
      batch_time: type.STRING,
      batch_start_date: type.DATE,
      recently_started_date: type.DATE,
      batch_ending_date: type.DATE,
      recently_ended_date: type.DATE,
      no_of_seats: type.STRING,
      remarks: type.STRING,
      batch_no: type.INTEGER,
     
    });
  };
  