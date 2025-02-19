public with sharing class AccountController {
    // public AccountController() {

    // }
    public static void trigger_task5(Map<Id,Account> triggerNewMap , Map<Id,Account> triggerOldMap){
        Map<Id,Account> aMap= triggerNewMap;
        Map<Id, List<Contact>> cMap = new Map<Id, List<Contact>>();
 
        System.debug([Select Id,Name,Email from Contact where AccountId In: aMap.keySet()]);
        for(Contact c : [Select Id,AccountId,Name,Email from Contact where AccountId In: aMap.keySet()]){
            if(!cMap.containsKey(c.AccountId)){
                cMap.put(c.AccountId , new List<Contact>{c});
            }
            else{
                cMap.get(c.AccountId).add(c);
            }
        }
        System.debug(aMap);
        System.debug(cMap);
        for(Id a : aMap.keySet()){
            if(aMap.get(a).Name <> triggerOldMap.get(a).Name){
                for(Contact c : cMap.get(a)){
                    if(c.Email <> null){
                        // EmailManager.sendMail(c.Email,'Account Name Changed','Account name changed from '+trigger.old[0].Name+' -> '+trigger.new[0].Name);
                        MultipleEmailManager.addEmail(c.Email,c.Name+'Account Name Changed','Account name changed from '+triggerOldMap.get(a).Name+' -> '+triggerNewMap.get(a).Name);
                    }
                }
                MultipleEmailManager.sendMail();
            }
        }
    }
    public static void trigger_task7(List<Account> triggerNew){
        for(Account a : triggerNew){
            a.Name = 'Mr. '+a.Name;
        }
    }
    public static void trigger_task9(List<Account> triggerNew){
        User user1 = [SELECT Id FROM User WHERE Alias='DModi'];

        for(Account a : triggerNew){
            Approval.ProcessSubmitRequest req = new Approval.ProcessSubmitRequest();
            req.setComments('Submitting request for approval.');
            req.setObjectId(a.id);
            req.setSubmitterId(user1.Id);
            Approval.ProcessResult result = Approval.process(req);
            System.debug(result);
        }
    }
    public static void trigger_task10(List<Account> triggerNew){
        // List<Contact> cl = new List<Contact>();
        // for(Account a : triggerNew){
        //     cl.add(new Contact(LastName=a.Name,AccountId=a.Id));
        // }
        // insert cl;
    }
    public static void trigger_task12(List<Account> triggerNew){
        List<Account> al = new List<Account>();
        for(Account a : triggerNew){
            al.addAll([Select Id,Name from account where Name=:a.Name]);
        }
        delete al;
    }
    public static void trigger_task13(Map<Id,Account> triggerNewMap , Map<Id,Account> triggerOldMap){
        List<AccountShare> lis = new List<AccountShare>();
        Map<Id,Account> aMap = triggerNewMap;
        for(Id a : aMap.keySet()){
            if(aMap.get(a).Rating == 'Hot' && triggerOldMap.get(a).Rating <> 'Hot'){
                AccountShare accShare = new AccountShare();
                accShare.AccountId = aMap.get(a).Id;
                accShare.UserOrGroupId = '005NS00000G9OwLYAV';
                accShare.AccountAccessLevel = 'Read';
                accShare.OpportunityAccessLevel = 'Read';
                lis.add(accShare);
            }
        }
        insert lis;
    }
}