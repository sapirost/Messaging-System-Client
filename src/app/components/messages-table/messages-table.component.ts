import { AuthenticationService } from './../../services/authentication.service';
import { MessageService } from './../../services/message.service';
import { IMessage } from '../../../../../server/app/interfaces/i_message';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-messages-table',
  templateUrl: './messages-table.component.html',
  styleUrls: ['./messages-table.component.scss']
})
export class MessagesTableComponent implements OnInit {
  displayedColumns = ['user', 'message', 'creationDate', 'delete'];
  pageSizeOptions = [25, 50, 100, 250];
  dataSource: MatTableDataSource<any>;
  currentUserEmail: string;

  @Input() isSentMessage: boolean;
  @Input('data')
  set value(data: IMessage[]) {
    this.setDataTable(data);
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private alertService: AlertService, private messageService: MessageService, private authService: AuthenticationService) { }

  ngOnInit() {
    const userInfo = this.authService.getUserInfo();
    this.currentUserEmail = userInfo && userInfo.email;
  }

  setDataTable(data: IMessage[]): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;

    data = data.map(message => ({ ...message, userTitle: this.isSentMessage ? `To: ${message.receiver}` : message.sender }));
    this.dataSource.data = data;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    const sanitizedValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = sanitizedValue;
  }

  openConfirmAlert(id: string): void {
    this.alertService.confirm('Are you sure?', 'This message will be permanently deleted').subscribe(confirm => {
      if (confirm) {
        this.deleteMessageById(id);
      }
    });
  }

  private deleteMessageById(id: string): void {
    this.messageService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(message => message.id !== id);
    });
  }
}
