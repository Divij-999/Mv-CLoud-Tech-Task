trigger trigger_task5 on Account (before update) {
    System.debug('task5');
    if(trigger.isbefore && trigger.isupdate){
        // for(Integer i =0 ; i<trigger.new.size() ; i++){
        //     if(trigger.new[i].Name <> trigger.old[i].Name){
        //         List<Contact> cl = [Select Id,Name,Email from Contact where AccountId=:trigger.new[0].Id];
        //         System.debug(cl);
        //         for(Contact c : cl){
        //             if(c.Email <> null){
        //                 // EmailManager.sendMail(c.Email,'Account Name Changed','Account name changed from '+trigger.old[0].Name+' -> '+trigger.new[0].Name);
        //                 MultipleEmailManager.addEmail(c.Email,c.Name+'Account Name Changed','Account name changed from '+trigger.old[0].Name+' -> '+trigger.new[0].Name);
        //             }
        //         }
        //         MultipleEmailManager.sendMail();
        //     }
        // }
        AccountController.trigger_task5(trigger.newMap , trigger.oldMap);

        

    }
}