module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("Store", {
        name: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        options: {
            type: Sequelize.STRING
        },
    });
    return Store;
};