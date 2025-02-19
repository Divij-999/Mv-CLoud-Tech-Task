public with sharing class ContactController {

    private Boolean triggerIsExecuting ;
    private Integer triggerSize ;
    private List<SObject> triggerNew;
    private Map<Id,SObject> triggerNewMap;
    private List<SObject> triggerOld;
    private Map<Id,SObject> triggerOldMap;
    private Boolean isBefore;
    private Boolean isAfter;
    private Boolean isInsert;
    private Boolean isUpdate;
    private Boolean isDelete;
    private Boolean isUndelete;

    public ContactController(boolean triggerIsExecuting , Integer triggerSize , List<SObject> triggerNew, Map<Id,SObject> triggerNewMap , List<SObject> triggerOld  , Map<Id,SObject> triggerOldMap , Boolean isBefore , Boolean isAfter , Boolean isInsert , Boolean isUpdate , Boolean isDelete , Boolean isUndelete) {
        this.triggerIsExecuting = triggerIsExecuting;
        this.triggerSize = triggerSize;
        this.triggerNew = triggerNew;
        this.triggerNewMap = triggerNewMap;
        this.triggerOld = triggerOld;
        this.triggerOldMap = triggerOldMap;
        this.isBefore = isBefore;
        this.isAfter = isAfter;
        this.isInsert = isInsert;
        this.isUpdate = isUpdate;
        this.isDelete = isDelete;
        this.isUndelete = isUndelete;

        System.debug(triggerNewMap);
        System.debug(triggerNew);
    }
    // public static void trigger_task8(List<Contact> triggerOld){
    public static void trigger_task8(List<Contact> triggerOld){
        // List<Account> lis = new List<Account>();
        // for(Contact c : triggerOld){

        //     Account t = [Select Name from Account where Id=:c.AccountId];
            
        //     lis.add(t);
        // }
        // delete lis;
    }
    public static void trigger_task11(List<Contact> triggerNew){
        List<Contact> cList = triggerNew;
        List<Event> eList = new List<Event>();
        Datetime startTime = Datetime.newInstance(2005, 12, 12);
        Datetime endTime = Datetime.newInstance(2005, 12, 15);
        for(Contact c : cList){
            Event event = new Event(
                OwnerId = c.CreatedById ,
                Subject = 'Test Event',
                StartDateTime = startTime ,
                EndDateTime = endTime,
                WhatId = c.AccountId,
                WhoId = c.Id
            );
            eList.add(event);
        }
        insert eList;
    }
    public void trigger_task14(){
        System.debug('Here comes task 14 -----------------------------------------');
        
        Set<Id> aList= new Set<Id>();
        if(isDelete){
            // System.debug(triggerNew); //=> NUll
            for(Contact c: (List<Contact>)triggerOld){
                aList.add(c.AccountId);
            }
        }
        else{
            
            for(Contact c: (List<Contact>)triggerNew){
                aList.add(c.AccountId);
            }
        }
        System.debug(aList);
        List<Account> accList = new List<Account>();
        // for(List<AggregateResult> i : [Select AccountId,SUM(Amount__c)avge from Contact where AccountId IN:aList Group By AccountId]){
        //     // System.debug(i[0].get('avge'));
        //     // if(isUpdate){
        //     //     accList
        //     // }
        //     accList.add(new Account(Id=(Id)i[0].get('AccountId'),Total_Amount__c = (Decimal)i[0].get('avge')));
        // }
        
        // if(isAfter && (isInsert || isUpdate || isDelete)){
        //     // System.debug(accList);
        //     upsert accList;
        // }
        for(Account a :  [Select Id,Total_Amount__c from Account where Id IN:aList]){
            for(List<AggregateResult> i : [Select AccountId,SUM(Amount__c)avge from Contact where AccountId=:a.Id Group By AccountId]){
                // System.debug(i[0].get('avge'));
                if(isUpdate){
                    a.Total_Amount__c = (Decimal)i[0].get('avge');
                    accList.add(a);
                }
                else{
                    accList.add(new Account(Id=(Id)i[0].get('AccountId'),Total_Amount__c = (Decimal)i[0].get('avge')));
                }
            }
        }
        
        if(isAfter && (isInsert || isUpdate || isDelete)){
            // System.debug(accList);
            upsert accList;
        }
    }
    public void trigger_task15(){
        
        Map<Id,Id> mMap = new Map<Id,Id>();
        // Map<Id,Contact> 
        for(Contact c : [Select Id,AccountId from Contact where Id IN: triggerNewMap.keySet()]){
            if(((Contact)(triggerNewMap.get(c.Id))).AccountId <> ((Contact)(triggerOldMap.get(c.Id))).AccountId){

                mMap.put((Id)c.get('Id'),(Id)c.get('AccountId'));
                System.debug(c.get('Id'));
            }
        }
        System.debug(mMap);
        if(mMap.size() >0){
            List<Contact> cList = new List<Contact>();
            for(Contact c : [Select Id,AccountId from Contact where Id IN: triggerOldMap.keySet()]){
                // if(mMap.get(c.Id).)
                System.debug(mMap.get(c.Id));
                System.debug('c :  '+c);
                for(Contact a : [Select Id,Name,Amount__c,AccountId from Contact where AccountId =: (Id)triggerOldMap.get(c.Id).get('AccountId') And Id<>: c.Id ]){
                    
                    a.AccountId = mMap.get(c.Id);
                    System.debug('a :  '+a);
                    cList.add(a);
                }
            }
            System.debug(cList.size());
            System.debug(cList);
            // Database.update(cList,false);
            update cList;

        }
    }
    public static Boolean isFirstTime = true;

    public void trigger_task16(){

        if(isFirstTime){
            isFirstTime = false;
            List<Contact> cList = new List<Contact>();
            for(Contact c : [Select Id,AccountId,Amount__c,Name,Account.Max_Amount__c from Contact where Id IN: triggerNewMap.keySet()]){
                Integer contactCount = 1 ;
                Decimal amount = c.Amount__c ;
                Decimal MaxSize = 30 ;
                while(amount>0){
                    System.debug((Integer)amount+' '+(Integer)MaxSize+' '+Math.mod((Integer)amount,(Integer)MaxSize)+' '+((Integer)amount/(Integer)MaxSize));
                    if(((Integer)amount/(Integer)MaxSize) > 0 && (amount <> MaxSize)){
                        
                        cList.add(new Contact( AccountId = c.AccountId , Amount__c = 30 , LastName = c.Name+' '+contactCount));
                        contactCount += 1;
                        System.debug(30);
                    }
                    else{
                        c.Amount__c = amount;
                        cList.add(c);
                        System.debug(amount);
                    }
                    amount-=30;
                }
            }
            System.debug(cList);
            upsert cList;
            System.debug(cList);
        }
    }
    

}