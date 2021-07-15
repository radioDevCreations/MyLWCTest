import { LightningElement, track } from 'lwc';
import getBMI from 'c/bmi';

export default class BmiCalculator extends LightningElement {
    weight;
    height;
    bmi;

    onWeightChange(event){
        this.weight = event.target.value;
    }
    onHeightChange(event){
        this.height = event.target.value;
    }

    CalculateBMI(){
        this.bmi = getBMI(this.weight, this.height);
    }
}