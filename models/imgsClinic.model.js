const { DataTypes, db } = require('../utils/database.util')

const ImgsClinic = db.define('imgsClinic', {
    id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
        primaryKey:true
	},
    urlImg: {
        type: DataTypes.STRING,
        allowNull: false,
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


module.exports = { ImgsClinic }