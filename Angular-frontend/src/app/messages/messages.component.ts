import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  message = {
    name: '',
    email: '',
    content: ''
  };

  sendMessage() {
    console.log('Message sent:', this.message);
    // Add your message sending logic here
  }
}
