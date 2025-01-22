module.exports = (sequelize, Sequelize) => {
  const Utilisateurs = sequelize.define("utilisateurs", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    civility: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: Sequelize.STRING
    },
    zipCode: {
      type: Sequelize.INTEGER
    },
    city: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING,
      validate: {
        is: /^(\+\d{1,3}|0)[1-9](\s?\d{2}){4}$/
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 255]  
      }
    }
  });

  return Utilisateurs;
};
