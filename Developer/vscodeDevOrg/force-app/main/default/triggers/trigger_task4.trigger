trigger trigger_task4 on Opportunity (before insert) {
    System.debug('task4');
    OpportunityController.trigger_task4(trigger.new);
}