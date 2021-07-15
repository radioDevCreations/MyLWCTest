import { LightningElement, track, wire } from "lwc";
import messageDemo from "@salesforce/messageChannel/messageDemo__c";
import {
  MessageContext,
  publish,
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE
} from "lightning/messageService";

import hasSendPermission from '@salesforce/customPermission/Send_Message'

export default class MessageLWC extends LightningElement {
  @track messages = [];

  @wire(MessageContext) messageContext;

  subscription = null;

  connectedCallback() {
      if(!this.subscription){
        this.subscription = subscribe(this.messageContext, messageDemo, (message) => {
            this.handleMessage(message);
        },
        {scope: APPLICATION_SCOPE}
        );
      }
  }

  disconnectedCallback() {
    if(this.subscription){
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}

  handleSend() {
    const inputElement = this.template.querySelector("lightning-input");
    if (inputElement) {
      const message = inputElement.value;
      this.messages.push({
        id: this.messages.length,
        value: message,
        from: "LWC"
      });

      const messagePayload = {
        message,
        from: 'LWC',
      };

      publish(this.messageContext, messageDemo, messagePayload);

      inputElement.value = "";
    }
  }

  handleMessage(messagePayload){
    if(messagePayload && messagePayload.from !== 'LWC'){
        this.messages.push({
            id: this.messages.length,
            value: messagePayload.message,
            from: messagePayload.from,
        });
    }
  }

  get disableSendButton(){
    return !hasSendPermission;
  }
}
