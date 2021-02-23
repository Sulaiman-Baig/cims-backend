module.exports = (sequelize, type) => {
    return sequelize.define("installment", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      installment: type.INTEGER,
      due_date: type.DATE,
      status: type.STRING,
     
    });
  };
  