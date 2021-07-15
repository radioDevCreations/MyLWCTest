import { LightningElement } from 'lwc';

export default class VaccineSlotFinder extends LightningElement {
    centers = [];
    dates = [];

    connectedCallback(){
        // this.fetchVaccineSlots();
    }

    handlePincodeChange(e){
        console.log('it happens');
        const pinCode = e.target.value;
        const isEnterKey = e.keyCode === 13;
        if(pinCode.length === 6 && isEnterKey){
            const today = new Date();
            const formattedDate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

            const endpoint = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${formattedDate}`;
            this.fetchVaccineSlots(endpoint);
        }
    }

    async fetchVaccineSlots(endpoint){
        const vaccineSlotResponse = await fetch(endpoint);
        const slotsData = await vaccineSlotResponse.json();
        this.buildColumnsAndRows(slotsData.centers);
    }

    buildColumnsAndRows(data){
        const dates = new Map();
        dates.set('name', {
            label: 'Center Name',
            fieldName: 'name',
            type: 'text'});
        const centers = new Map();

        for(const center of data){
            !centers.has(center.center_id) && centers.set(center.center_id, {name: center.name});

            for(const session of center.sessions){

                //destructuring
                const { date, available_capacity, min_age_limit } = session;

                //add date as column in dates map
                dates.set(dates, {
                    label: date,
                    fieldName: date,
                    type: "text",
                    wrapText: true,
                    cellAttributes: {class: {fieldName: 'className'}}
                });

                //add column value for the row
                centers.get(center.center_id)[date] = `Available Capacity: ${available_capacity}
                Min Age: ${min_age_limit}`;

                centers.get(center.center_id).className = available_capacity > 0 ? 'slds-text-color_success' : 'slds-text-color_error';
            }
        }
        this.dates = Array.from(dates.values());
        this.centers = Array.from(centers.values());

    }

    get hideMessage(){
        return this.centers.length > 0;
    }
}