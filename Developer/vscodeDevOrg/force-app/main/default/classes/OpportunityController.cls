public with sharing class OpportunityController {
    // public OpportunityController() {

    // }
    public static void trigger_task3(List<Opportunity> opportunity){
        for(Opportunity o : opportunity){
            o.StageName = 'prospecting';
            o.CloseDate = Date.today()+15;
        }
    }
    public static void trigger_task4(List<Opportunity> opportunity){
        for(Opportunity o : opportunity){
            o.Type = 'new customer';
        }
    }
    public static void trigger_task6(Map<Id,Opportunity> triggerNewMap , Map<Id,Opportunity> triggerOldMap){
        
        Map<Id,Opportunity> oMap = triggerNewMap;
        List<Task> t = new List<Task>();
        for(Id o : oMap.keySet()){
            if(oMap.get(o).Name <> triggerOldMap.get(o).Name){
                t.add(new Task(OwnerId = oMap.get(o).OwnerId , Priority='Normal' , Subject='New Task Assigned to Opportunity '+oMap.get(o).Name,WhatId=oMap.get(o).Id , Status='Not Started' ));
            }
        }
        insert t;
    }
}
