var axios = require('axios');

function getGroupMember(gid)
{
    axios.post(`http://${LocalHost}:${SendPort}/get_group_member_list`, {
        group_id: gid,
    }).then(res=>{
        return res;
    }).catch(err=>{
        console.error(err);
    })
}

module.exports={
    getGroupMember,

}