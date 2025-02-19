public with sharing class LeadController {
    // public LeadController() {

    // }
    public static void trigger_task2(List<Lead> leads){
        for(Lead l : leads){
            l.Rating = 'Hot';
        }
    }
}