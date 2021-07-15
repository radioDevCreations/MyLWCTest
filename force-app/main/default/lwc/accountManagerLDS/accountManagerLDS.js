import { LightningElement, track, wire } from 'lwc';
import { createRecord, getRecord } from 'lightning/uiRecordApi';

const fieldArray = ['Account.Name', 'Account.Phone', 'Account.Website'];

export default class AccountManagerLDS extends LightningElement {
    @track accountName;
    @track accountPhone;
    @track accountWebsite;

    @track recordId;

    @wire(getRecord, {recordId: '$recordId', fields: fieldArray})
    accountRecord;

    get retrieveAccountName(){
        if(this.accountRecord.data){
            return this.accountRecord.data.fields.Name.value;
        }
    }
    get retrieveAccountPhone(){
        if(this.accountRecord.data){
            return this.accountRecord.data.fields.Phone.value;
        }
    }
    get retrieveAccountWebsite(){
        if(this.accountRecord.data){
            return this.accountRecord.data.fields.Website.value;
        }
    }

    handleAccountNameChange(event){
        this.accountName = event.target.value;
    }
    handleAccountPhoneChange(event){
        this.accountPhone = event.target.value;
    }
    handleAccountWebsiteChange(event){
        this.accountWebsite = event.target.value;
    }

    createAccount(){
        const fields = {
            'Name': this.accountName,
            'Phone': this.accountPhone,
            'Website': this.accountWebsite,
        };
        const recordInput = {
            apiName: 'Account', fields,
        }
        createRecord(recordInput).then(response => {
            this.recordId = response.id;
        }).catch(error => {
            console.error('Error in creating account: ', error)
        });
    }
}