trigger trigger_task11 on Contact (after insert) {
    if(trigger.isafter && trigger.isinsert){
        ContactController.trigger_task11(trigger.new);
    }
}