const { DataTypes, db } = require('../utils/database.util')

const Clinic = db.define('clinic', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
})

module.exports = { Clinic }