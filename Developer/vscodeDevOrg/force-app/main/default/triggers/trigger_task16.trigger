trigger trigger_task16 on Contact (after insert , after update , after delete) {
  
    ContactController handler = new ContactController(Trigger.isExecuting, Trigger.size, Trigger.new , Trigger.newMap , Trigger.old , Trigger.oldMap , Trigger.isBefore , Trigger.isAfter , Trigger.isInsert , Trigger.isUpdate, Trigger.isDelete , Trigger.isUndelete);
    switch on Trigger.operationType {
        when AFTER_INSERT, AFTER_UPDATE {
            handler.trigger_task16();
        }
        when else {
        }
    }
    if(Trigger.isAfter && (Trigger.isUpdate || Trigger.isDelete)){
        handler.trigger_task14();
    }
}