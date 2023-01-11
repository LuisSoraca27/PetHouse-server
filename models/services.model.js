const { DataTypes, db } = require('../utils/database.util')

const Services = db.define('services', {
    id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
        primaryKey:true
	},
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 'available'
    },
    clinicId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
})


module.exports = { Services }