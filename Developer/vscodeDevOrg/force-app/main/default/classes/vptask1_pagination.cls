public class vptask1_pagination {
    public Integer CountStart = 0 ;
    public Integer PageCount = 1 ;
    Integer size = [select Id from Contact].size();
    public List<Contact> getcontacts(){
		List<Contact> contactList = [select Id,Name from Contact limit:20 offset:CountStart];
        system.debug(CountStart+' '+contactList.size());
        return contactList;
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