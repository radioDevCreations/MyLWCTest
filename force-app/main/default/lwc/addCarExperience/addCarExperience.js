import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Car_Experience__c.Name';
import EXPERIENCE_FIELD from '@salesforce/schema/Car_Experience__c.Experience__c';//it could be wrong
import CAR_FIELD from '@salesforce/schema/Car_Experience__c.Car__c';
import EXPERIENCE_OBJECT from '@salesforce/schema/Car_Experience__c';



export default class CarExperience extends LightningElement {

    @api carId;

    experienceTitle = '';
    experienceDescription = '';

    handleTitleChange(event){
        this.experienceTitle = event.target.value;
    }
    handleDescriptionChange(event){
        this.experienceDescription = event.target.value;
    }
    addExperience(){
        const fields = {

        };
        fields[NAME_FIELD.fieldApiName] = this.experienceTitle;
        fields[EXPERIENCE_FIELD.fieldApiName] = this.experienceDescription;
        fields[CAR_FIELD.fieldApiName] = this.carId;

        const recordInput = {apiName: EXPERIENCE_OBJECT.objectApiName, fields}
        createRecord(recordInput).then(() => {
            this.showToast('SUCCESS', 'Record successfully updated!', 'success');
            const recordAdded = new CustomEvent('experienceadded');
            this.dispatchEvent(recordAdded);
        }).catch(error => {
            this.showToast('ERROR', error.body.message, 'error');
        });
    }
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

}