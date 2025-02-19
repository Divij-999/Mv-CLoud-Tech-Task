trigger trigger_task12 on Account (before insert) {
    if(trigger.isbefore && trigger.isinsert){
        AccountController.trigger_task12(trigger.new);
    }
}