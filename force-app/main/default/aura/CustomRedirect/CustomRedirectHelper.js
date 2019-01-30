({

    doRedirect : function(component, event, helper) {
        var showError = component.get('v.showError');
        var mode = component.get('v.mode');
        var redirectDoneEvent = component.getEvent('redirectDone');
        redirectDoneEvent.setParams({"isSuccess": false, "message": "Error message shown."});

        if(showError === undefined || showError === false) {
            var sObjectApiName = component.get('v.sObjectApiName');
            var defaultValues = component.get('v.defaultFieldValuePairs');

            switch(mode) {
                case 'CREATE':
                    var createRecordEvent = $A.get("e.force:createRecord");
                    createRecordEvent.setParams({
                        "entityApiName": sObjectApiName,
                        "defaultFieldValues": defaultValues
                    });
                    createRecordEvent.fire();

                    redirectDoneEvent.setParams({"isSuccess": true, "message": "Redirected to create record successfully!"});
                    break;
                case 'EDIT':
                    var editRecordEvent = $A.get("e.force:editRecord");
                    editRecordEvent.setParams({
                        "recordId": component.get("v.recordId"),
                        "defaultFieldValues": defaultValues
                    });
                    editRecordEvent.fire();
                    redirectDoneEvent.setParams({"isSuccess": true, "message": "Redirected to edit record successfully!"});
                    break;
                default:
                    redirectDoneEvent.setParams({"isSuccess": false, "message": "Invalid mode specified for redirect component!"});
                    break;
            }
        }

        redirectDoneEvent.fire();
    },
})