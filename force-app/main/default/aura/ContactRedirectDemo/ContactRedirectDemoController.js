({
    doRedirect : function(component, event, helper) {
        //Get Account Record
        var account = component.get("v.record");

        if(account.Industry === "Consulting" && account.Type == 'Customer - Direct') {
            var defaultValues = {};
            defaultValues.Phone = account.Phone;
            defaultValues.MailingStreet = account.BillingStreet;
            defaultValues.MailingCity = account.BillingCity;
            defaultValues.MailingPostalCode = account.BillingPostalCode;
            defaultValues.MailingState = account.BillingState;
            defaultValues.MailingCountry = account.BillingCountry;
            defaultValues.AccountId = account.Id;
            component.set("v.defaultValues", defaultValues);

            // Close the action panel if not error
            var dismissActionPanel = $A.get("e.force:closeQuickAction");
            dismissActionPanel.fire();
        } else {
            component.set("v.showError", true);
            component.set("v.errorMessage", 'Only available on consulting accounts.');
        }

        //Show redirect component
        component.set("v.showCreateContact", true);
    }
})
