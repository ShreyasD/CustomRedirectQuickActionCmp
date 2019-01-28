({

    doRedirect : function(component, event, helper) {
        var showError = component.get('v.showError');
        var mode = component.get('v.mode');

        if(showError === undefined || showError === false) {
            var sObjectApiName = component.get('v.sObjectApiName');
            var defaultValues = component.get('v.defaultFieldValuePairs');

            if(mode === 'CREATE') {
                console.log("CREATE Redirect");
                var createRecordEvent = $A.get("e.force:createRecord");
                createRecordEvent.setParams({
                    "entityApiName": sObjectApiName,
                    "defaultFieldValues": defaultValues
                });
                createRecordEvent.fire();
            } else if (mode === 'EDIT') {
                console.log("EDIT Redirect");
                var editRecordEvent = $A.get("e.force:editRecord");
                editRecordEvent.setParams({
                     "recordId": component.get("v.recordId"),
                     "defaultFieldValues": defaultValues
                });
                editRecordEvent.fire();
            } else {
                component.set("v.showError", true);
                component.set("v.errorMessage", false);
            }
        }
    },
})