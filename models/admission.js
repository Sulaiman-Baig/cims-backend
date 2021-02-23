module.exports = (sequelize, type) => {
    return sequelize.define("admission", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      student_name: type.STRING,
      dob: type.DATE,
      nic: type.STRING,
      gender: type.STRING,
      nationality: type.STRING,
      personal_contact: type.STRING,
      guardian_contact: type.STRING,
      email: type.STRING,
      postal_address: type.STRING,
      admission_date: type.DATE,
      registeration_fee: type.INTEGER,
      fee_package: type.INTEGER,
      fee_package_after_discount: type.INTEGER,
      discount: type.INTEGER,
      is_installment: type.BOOLEAN,
      remarks: type.STRING,
      studentId: type.STRING,
      courseStatus: type.STRING

      
     
    });
  };
  