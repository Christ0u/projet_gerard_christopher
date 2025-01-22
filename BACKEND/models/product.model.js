module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        inStock: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        description: {
            type: Sequelize.TEXT
        },
        rating: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5
            }
        }
    });

    return Products;
};
