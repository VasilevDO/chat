
function Room (name,createdBy) {
    this.name=name;
    this.createdBy=createdBy;
    this.users=[];
    this.messages=[];
}

module.exports=Room;
