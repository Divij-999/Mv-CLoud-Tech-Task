public with sharing class ErrorLog {
    public ErrorLog(String ClassName , Exception e) {
        // try{
        //     Error_log__c err = new Error_log__c();
        //     insert err;
        // }
        // catch(Exception e){
            // }
            Error_log__c e1 = new Error_log__c(Class_Name__c=ClassName ,Method_Name__c=e.getStackTraceString() ,Exception_Message__c=e.getMessage() ,Exception_Type__c=e.getTypeName() ,Line_Number__c=e.getLineNumber() ,More_Details__c=e+'');
            insert e1;
        }
}