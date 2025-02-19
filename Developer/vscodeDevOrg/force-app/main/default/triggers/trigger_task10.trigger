trigger trigger_task10 on Account (after insert) {
    if(trigger.isafter && trigger.isinsert){
        AccountController.trigger_task10(trigger.new);
    }
}