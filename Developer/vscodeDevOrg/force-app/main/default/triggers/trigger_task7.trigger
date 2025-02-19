trigger trigger_task7 on Account (before insert) {
    if(trigger.isbefore && trigger.isinsert){
        AccountController.trigger_task7(trigger.new);
    }
}