import { LightningElement, track } from 'lwc';

export default class ConditionalRenderer extends LightningElement {
    @track displayDiv = false;
    @track cityList = ['Chrzanow', 'Krakow', 'Katowice', 'Warszawa'];

    toggleDisplayDiv(event){
        this.displayDiv = event.target.checked;
    }
}