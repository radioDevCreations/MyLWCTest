import { LightningElement, track } from 'lwc';
import { ADDITION_MODE, SUBTRACTION_MODE, MULTIPLICATION_MODE, DIVISION_MODE } from './calculateModes';

export default class SimpleCalculator extends LightningElement {
    @track firstNumber = 0;
    @track secondNumber = 0;
    @track calculationMode = ADDITION_MODE;
    @track currentResult = 0;
    @track previousResults = [];
    @track showPreviousResults = false;

    Calculate(){
        switch(this.calculationMode){
            case ADDITION_MODE:
                return this.firstNumber + this.secondNumber;
            case SUBTRACTION_MODE:
                return this.firstNumber - this.secondNumber;
            case MULTIPLICATION_MODE:
                return this.firstNumber * this.secondNumber;
            case DIVISION_MODE:
                return this.firstNumber / this.secondNumber;
        }
    }

    handleNumberChange(event){
        const inputBoxName = event.target.name;
        switch(inputBoxName){
            case 'firstNumber':
                this.firstNumber = +event.target.value;
            break;
            case 'secondNumber':
                this.secondNumber = +event.target.value;
            break;
            default:
            break;
        }
        }

    handleSwitchToAdditionMode(){
        this.calculationMode = ADDITION_MODE;
        this.currentResult = `Result of ${this.firstNumber} + ${this.secondNumber} is ${this.Calculate()}`;
        this.previousResults.push(this.currentResult);
    }
    handleSwitchToSubtractionMode(){
        this.calculationMode = SUBTRACTION_MODE;
        this.currentResult = `Result of ${this.firstNumber} - ${this.secondNumber} is ${this.Calculate()}`;
        this.previousResults.push(this.currentResult);
    }
    handleSwitchToMultiplicationMode(){
        this.calculationMode = MULTIPLICATION_MODE;
        this.currentResult = `Result of ${this.firstNumber} * ${this.secondNumber} is ${this.Calculate()}`;
        this.previousResults.push(this.currentResult);
    }
    handleSwitchToDivisionMode(){
        this.calculationMode = DIVISION_MODE;
        this.currentResult = `Result of ${this.firstNumber} / ${this.secondNumber} is ${this.Calculate()}`;
        this.previousResults.push(this.currentResult);
    }
    showPreviousResultsToggle(event){
        this.showPreviousResults = event.target.checked
    }
}