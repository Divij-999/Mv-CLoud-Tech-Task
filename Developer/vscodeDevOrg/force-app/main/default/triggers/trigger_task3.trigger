trigger trigger_task3 on Opportunity (before update) {
    System.debug('hello');
    System.debug(trigger.oldMap);
    System.debug(trigger.old);
    System.debug(trigger.new);
    System.debug(trigger.newMap);
    if(trigger.isbefore && trigger.isupdate){
        OpportunityController.trigger_task3(trigger.new);
    }
}

