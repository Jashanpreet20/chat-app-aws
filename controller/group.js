
const Group = require('../model/group');

const userGroup = require('../model/userInGroup');


const groupCreate = async (req, res, next) => {
    try {
        const message = req.body.message;
        //  console.log("creater",req.user.id,req.user.name,req.user.email);// user id name email
        console.log(message); //group name

        const group = await Group.create({
            groupName: message,
            Admin: req.user.id
        })
        console.log('group id=' + group.id);
        res.status(201).json({ details: group });
    } catch (err) {
        return res.status(404).json({ err: err });
        // console.log(err);
    }

}


const fetchGroup = async (req, res, next) => {
    try {
        const alldata = await Group.findAll({ where: { Admin: req.user.id } });
        if (alldata) {
            // console.log(req.user.totalexpanse);
            //console.log(data);
            res.status(201).json({ details: alldata });
        }
        else {
            return res.status(400).json({ message: 'data not fetched' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json('something went wrong');
    }

}

const adduser = async (req, res, next) => {
    try {

        const userid = req.query.userId
        const groupid = req.query.groupId
        const adminUserId = req.user.id

        const checkAdmin = await Group.findOne({
            where: {
                userId: adminUserId,
                id: groupid
            }
        })
        console.log(checkAdmin)
        if (checkAdmin) {
            const addUserInGroup = await Groupinfo.create({
                groupId: groupid, userId: userid, groupname: checkAdmin.groupname
            })

            res.status(201).json({ addUserInGroup, message: "successfully added in group" })
        }
        else {
            res.status(505).json("you are not admin of this group")
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({ err: "user already exists in this group" })
    }
}

const removeuser=async(req,res,next)=>{
    console.log("req query",req.query);//from which group  and which user
    console.log('user id want to delete',req.user.id)//who want to delete

    await Group.findByPk(req.query.groupid).then(async(result)=>{
        // console.log(result.admin)
        if(req.user.id===result.Admin){
            await userGroup.destroy({
                where:{
                    userId:req.query.deleteid,
                    groupId:req.query.groupid
                }
            }).then(result=>{
                console.log("result",result,typeof(result))
                if(result!=0){
                    res.status(200).json({message:'user delete successfully'});
                }else{
                    return res.status(404).json({message:'user not exixt'});
                }
            })
        }else{
            return res.status(409).json({message:'you are not admin to remove'})
        }
    })

}



module.exports = {
    groupCreate,
    fetchGroup,
    adduser,
    removeuser
}