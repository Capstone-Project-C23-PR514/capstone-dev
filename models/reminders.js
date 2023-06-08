const {Model, DataTypes} = require('sequelize')
const sequelize = require('../database/db_config')
const UsersModel = require('./users')

class Reminder extends Model {}

Reminder.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: UsersModel,
                key: 'id',
            },
        },
        tanggal_awal: {
            type: DataTypes.DATE,
        },
        tanggal_akhir: {
            type: DataTypes.DATE,
        },
        gambar: {
            type: DataTypes.TEXT,
        },
        lokasi: {
            type: DataTypes.TEXT,
        },
        catatan: {
            type: DataTypes.TEXT,
        }
    },
    {
        sequelize,
        modelName: 'reminders',
    }
)

Reminder.belongsTo(UsersModel, {
    foreignKey: 'user_id'
})

module.exports = Reminder