import { IMessage } from '../../../../../server/app/interfaces/i_message';
import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-messages',
  templateUrl: './manage-messages.component.html',
  styleUrls: ['./manage-messages.component.scss']
})
export class ManageMessagesComponent implements OnInit {
  sentMessages: IMessage[];
  receivedMessages: IMessage[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getAll().subscribe(res => {
      this.receivedMessages = res && res.received;
      this.sentMessages = res && res.sent;
    });
  }

}
