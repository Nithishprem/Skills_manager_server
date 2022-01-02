const mongoose = require("mongoose")

const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide skill name'],
        maxLength: 50
    },
    level: {
        type: String,
        required: [true, 'Please provide skill level'],
        maxLength: 50
    },
    proficiency: {
        type: Number,
        required: [true, 'Please provide skill proficiency'],
        min: 0,
        max: 100
    },
    experience: {
        type: Number,
        required: [true, 'Please provide skill experience'],
        min: 0,
        max: 20
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']
    }
},{timestamps: true})

module.exports = mongoose.model('Skill', SkillSchema)