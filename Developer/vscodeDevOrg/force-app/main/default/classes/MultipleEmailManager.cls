public with sharing class MultipleEmailManager {
    // public MultipleEmailManager() {

    // }
    public static List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();

    public static void addEmail(String address, String subject, String body){
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {address};
        email.setToAddresses(toAddresses);
        email.setSubject(subject);
        email.setPlainTextBody(body);
        emails.add(email);
        
    }
    public static void sendMail(){
        Messaging.sendEmail(emails);
    }
}