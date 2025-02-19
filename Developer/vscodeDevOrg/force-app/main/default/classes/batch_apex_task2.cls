public with sharing class batch_apex_task2 implements Database.Batchable<sObject> {
    // public batch_apex_task2() {

    // }
    public Integer recordsProcessed = 0 ;

    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator(
        'Select Id, Description from Account'
        );
    }

    public void execute(Database.BatchableContext bc , List<Account> records){
        List<Account> acc = new List<Account>();
        for(Account a : records){
            a.Description = Datetime.now().format();
            recordsProcessed = recordsProcessed+1 ;
            acc.add(a);
        }

        update acc;
    }

    public void finish(Database.BatchableContext bc){
        System.debug('Records processed '+recordsProcessed);
    }
}
