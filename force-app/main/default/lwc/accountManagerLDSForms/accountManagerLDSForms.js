import { LightningElement, track } from 'lwc';

export default class AccountManagerLDSForms extends LightningElement {

    @track recordId;

    handleSuccess(event){
        console.log('record added');
        this.recorId = event.detail.id;
    }
}