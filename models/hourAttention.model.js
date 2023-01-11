const { DataTypes, db } = require('../utils/database.util')

const HourAttention = db.define('hourAttention', {
    id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
        primaryKey:true
	},
    hour: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    available: {
        type: DataTypes.STRING,
        allowNull: false
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


module.exports = { HourAttention }