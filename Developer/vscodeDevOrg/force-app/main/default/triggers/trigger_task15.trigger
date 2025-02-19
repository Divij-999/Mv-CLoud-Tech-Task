trigger trigger_task15 on Contact (after update) {
    ContactController handler = new ContactController(Trigger.isExecuting, Trigger.size, Trigger.new , Trigger.newMap , Trigger.old , Trigger.oldMap , Trigger.isBefore , Trigger.isAfter , Trigger.isInsert , Trigger.isUpdate, Trigger.isDelete , Trigger.isUndelete);
        switch on Trigger.operationType {
            when  AFTER_UPDATE{
                handler.trigger_task15();
                // handler.trigger_task14();
            }
            
            when else {
                
            }
        }
        
}