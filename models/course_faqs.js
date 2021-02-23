module.exports = (sequelize, type) => {
    return sequelize.define("course_faqs", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      question: type.STRING,
      answer: type.STRING,
     
    });
  };
  