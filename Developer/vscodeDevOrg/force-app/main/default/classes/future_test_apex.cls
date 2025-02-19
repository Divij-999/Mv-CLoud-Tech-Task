public with sharing class future_test_apex {
    private ApexPages.StandardController StandardController ; 
    public future_test_apex(ApexPages.StandardController standardController) {
        this.StandardController = standardController ;
    }
    public PageReference mid(){
        System.debug('here');
        System.debug(StandardController.getId());
        // future_test_apex ft = new future_test_apex();
        future_test_apex.test(StandardController.getId());
        // future_apex_task_1.addData(StandardController.getId());
        return null;
    }
    public static void test(Id id){
        System.debug(id);
    }

}