public with sharing class schedule_batch_apex_task2 implements Schedulable {
    // public schedule_batch_apex_task2() {

    // }
    public void execute(SchedulableContext SC){
        batch_apex_task2 myBatchObject = new batch_apex_task2();
        Id batchId = Database.executeBatch(myBatchObject,20);
    }
}