trigger trigger_task2 on Lead (before insert) {
    System.debug('Hello');
    if(trigger.isbefore && trigger.isinsert){
        LeadController.trigger_task2(trigger.new);
    }
}