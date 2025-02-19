trigger trigger_task8 on Contact (after delete) {
    if(trigger.isafter && trigger.isdelete){
        ContactController.trigger_task8(trigger.old);
    }
}