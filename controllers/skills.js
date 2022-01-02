const Skill = require('../models/Skill')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllSkills = async (req,res)=>{
    const skills = await Skill.find({createdBy: req.user.userId}).sort('createAt')
    res.status(StatusCodes.OK).json({skills, count: skills.length})
}

const getSkill = async (req,res)=>{
    const {params: { id: skillId }, user: { userId }} = req
    const skill = await Skill.findOne({
        _id: skillId, createdBy: userId 
    })
    if(!skill){
        throw new NotFoundError(`No skill found with id ${skillId}`)
    }
     res.status(StatusCodes.OK).json({skill})
}
const createSkills = async (req,res)=>{
    // req.body.createdBy = req.user.userId
    req.body = req.body.map(skill=>{
        skill.createdBy=req.user.userId
        return skill
    })
    const skills = await Skill.create(req.body)
    res.status(StatusCodes.CREATED).json({skills})
}
const updateSkill =async (req,res)=>{
    const { body: {level, },
    user: {userId},
    params:{id : skillId}
    } = req

    if(level ===''){
        throw new BadRequestError('level fields cannot be empty')
    }
    const skill = await Job.findOneAndUpdate({_id:skillId, createdBy: userId}, req.body, {new:true, runValidators: true})
    if(!skill){
        throw new NotFoundError(`No skill with id ${skillId}`)
    }


    res.status(StatusCodes.OK).json({skill})

}
const deleteSkill = async (req,res)=>{
    const {
        user:{userId},
        params:{id: skillId}
    } = req

    const skill = await Job.findOneAndDelete({_id: skillId, createdBy: userId})
    if(!skill){
        throw new NotFoundError(`No skill with id ${skillId}`)
    }
    res.status(StatusCodes.OK).send("skill removed")
}

module.exports = {
    getAllSkills,
    getSkill,
    createSkills,
    updateSkill,
    deleteSkill
}