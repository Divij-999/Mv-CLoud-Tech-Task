public with sharing class future_apex_task_1 {
    public static String nameField {get {return nameField;} set;}
    // public static String nameField;
    
    private ApexPages.StandardController StandardController ; 
    public future_apex_task_1(ApexPages.StandardController standardController) {
        this.StandardController = standardController ;
    }

    public PageReference mid(){
        System.debug('here');
        System.debug(standardController);
        System.debug(StandardController.getId());
        future_apex_task_1.addData(StandardController.getId(),nameField);
        System.debug(nameField);
        return null;
    }

    @future(callout=true)
    public static void addData(Id oppId,String nameField1){

        // Id oppId = ApexPages.currentPage().getParameters().get('id');

        System.debug(nameField1);

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndPoint('https://api.unsplash.com//search/photos?query='+nameField1+'&client_id=OyY6Z9gWxrCj9bXIm6ZCahrIBU8S4hxvVZKZR10qLrk');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        
        if (response.getStatusCode() == 200) {
            System.debug(JSON.deserializeUntyped(response.getBody()));
            Map<String,Object> m = (Map<String,Object>)JSON.deserializeUntyped(response.getBody());
            List<Object> a = (List<Object>)m.get('results');
            Map<String,Object> singleImage = ((Map<String,Object>)a[Integer.valueof((Math.random() * (a.size()-1)))]);
            // System.debug(singleImage.get('slug'));
            // System.debug(singleImage.get('urls'));
            // System.debug(((Map<String,Object>)singleImage.get('urls')).get('full'));
            
            HttpRequest request1 = new HttpRequest();

            request1.setEndPoint((String)((Map<String,Object>)singleImage.get('urls')).get('full'));
            request1.setMethod('GET');
            HttpResponse response1 = http.send(request1);
            System.debug(response1.getBodyAsBlob());

            Blob imageBlob = response1.getBodyAsBlob();
            String fileName = 'RandomImage_' + (String)singleImage.get('slug') + DateTime.now() + '.jpeg';
            System.debug(fileName);
            // Create ContentVersion record (file)
            ContentVersion objCV = new ContentVersion();
            objCV.Title = fileName;
            objCV.PathOnClient = fileName;
            objCV.VersionData = imageBlob;
            // objCV.FirstPublishLocationId = '006NS00000R5coHYAR';
            insert objCV;
            System.debug(oppId);
            objCV = [
                    SELECT ContentDocumentId
                    FROM ContentVersion
                    WHERE Id =: objCV.Id
                ];
                ContentDocumentLink objCDL = new ContentDocumentLink(
                    ContentDocumentId = objCV.ContentDocumentId,
                    LinkedEntityId = oppId,
                    Visibility = 'AllUsers'
                );
                insert objCDL;
        }
    }
}

// future_apex_task_1.addData();