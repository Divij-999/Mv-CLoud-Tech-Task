trigger trigger_task9 on Account (after insert) {
    if(trigger.isafter && trigger.isinsert){
        AccountController.trigger_task9(trigger.new);
    }
}