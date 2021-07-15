import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track dynamicGreeting = 'World';

    handleGreetingChange(event){
        this.dynamicGreeting = event.target.value;
    }
}
