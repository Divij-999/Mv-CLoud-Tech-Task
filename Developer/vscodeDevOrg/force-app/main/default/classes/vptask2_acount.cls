public class vptask2_acount {
    public String selectedType {get;set;}
    public Integer CountStart = 0 ;
    public Integer PageCount = 1 ;
    public Integer size = 0;
    
    public List<SelectOption> getAccountName(){
        List<SelectOption> names = new List<SelectOption>();
        names.add(new SelectOption('','-None-'));
        for(Account a : [Select Id,Name from Account]){
            system.debug(a);
            names.add(new SelectOption(a.Id,a.Name));
        }
        return names;
    }
    public List<Opportunity> getOpportunity(){
        
        List<Opportunity> op = [select Id,Name,AccountId from Opportunity where AccountId	=:selectedType];
        size = op.size();
        system.debug(selectedType+' '+op);
        return op; 
    }
    public Integer getpageCount(){
        return PageCount;
    }    
    public void previous(){
        if(countStart>0){
            CountStart -= 20 ;
            PageCount -=1;
        }
    }
    public void next(){
        if(countStart<size && countStart+20<size){
            CountStart += 20 ;
            PageCount +=1;
        }
    }
}