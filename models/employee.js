module.exports = (sequelize, type) => {
    return sequelize.define("employee", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      title: type.STRING,
      designation: type.STRING,
      full_name: type.STRING,
      image: type.STRING,
      cnic: type.STRING,
      gender: type.STRING,
      religion: type.STRING,
      dob: type.DATE,
      personal_email: type.STRING,
      primary_mobile_no: type.STRING,
      other_mobile_no: type.STRING,
      home_ptcl: type.STRING,
      address: type.STRING,
      maritial_status: type.STRING,
      basic_salary: type.STRING,
      isUser: type.BOOLEAN
    });
  };
  