module.exports = (sequelize, type) => {
    return sequelize.define("inquiry", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      is_transfer: type.BOOLEAN,
      status: type.STRING,
      full_name: type.STRING,
      contact: type.STRING,
      email: type.STRING,
      gender: type.STRING,
      country: type.STRING,
      city: type.STRING,
      area: type.STRING,
      possible_join_date: type.DATE,
      next_follow_up_date: type.DATE,
      marketing_source: type.STRING,
      probability: type.STRING,
     
    });
  };
  