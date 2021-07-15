import { LightningElement, api } from 'lwc';

export default class PublicMethodChild extends LightningElement {
    value = ['red'];

    options = [
        { label: 'RedMarker', value: 'red' },
        { label: 'BlueMarker', value: 'blue' },
        { label: 'GreenMarker', value: 'green' },
        { label: 'YellowMarker', value: 'yellow' },
        { label: 'OrangeMarker', value: 'orange' },
    ];

    @api selectCheckbox(checkboxValue) {
        const selected = this.options.find(checkbox => {
            return checkboxValue === checkbox.value;
        });

        if(selected){
            this.value = selected.value;
            return 'Succesfully checked';
        } else {
            return 'No checkbox found';
        }
    }
}
