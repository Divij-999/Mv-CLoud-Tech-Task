trigger trigger_task6 on opportunity (after update) {
    if(trigger.isafter && trigger.isupdate){
        OpportunityController.trigger_task6(trigger.newMap , trigger.oldMap);
    }
}