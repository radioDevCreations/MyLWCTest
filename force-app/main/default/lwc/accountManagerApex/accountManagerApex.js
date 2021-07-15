import { LightningElement, wire, track } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccount';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountManagerApex extends LightningElement {
    // @wire(getAllAccounts) accounts;
    @track numberOfRecords;
    @track accounts;

    get responseRecieved(){
        return !!this.accounts;
    }

    handleNumberOfAccounts(event){
        this.numberOfRecords = event.target.value;
    }

    handleGetAccounts(){
        getAllAccounts({numberOfRecords:this.numberOfRecords}).then(response => {
            this.accounts = response;
            const toastEvent = new ShowToastEvent({
                title: 'Accounts Loaded',
                message: this.numberOfRecords + ' accounts fetched from server',
                variant: 'success',
            });
            this.dispatchEvent(toastEvent);
        }).catch(error => {
            console.error('Error in getting accounts', error.body.message);
            const toastEvent = new ShowToastEvent({
                title: 'ERROR',
                message: error.body.message,
                variant: 'error',
            });
            this.dispatchEvent(toastEvent);
        })
    }
}