public class LoginForm {
	
    public String username {get; set;}
    public String email {get; set;}
    public String password {get; set;}
        
    public PageReference UserData(){
         UserData__c userD = new UserData__c(Name=username , Email__c=email , Password__c=password);
         insert userD;
        ID user = userD.ID;
        system.debug(user);
        return Page.WelcomePage;

    }
    public void loginUser(){
        
    }
}