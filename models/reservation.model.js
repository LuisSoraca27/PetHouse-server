const { DataTypes, db } = require('../utils/database.util')

const Reservation = db.define('reservation', {
    id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
        primaryKey:true
	},
    hourAttentionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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


module.exports = { Reservation }