
function Message (userName,message) {
    this.message=message;
    this.by=userName;
    this.date=Date.now();
}

module.exports=Message;
