const express = require('express')
const router = express.Router()

const {getAllSkills, getSkill, createSkills, updateSkill, deleteSkill} = require("../controllers/skills")

router.route('/').get(getAllSkills).post(createSkills)

router.route('/:id').get(getSkill).patch(updateSkill).delete(deleteSkill)


module.exports = router