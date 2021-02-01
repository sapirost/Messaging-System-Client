import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  dialogRef: MatDialogRef<AlertComponent>;

  constructor(public dialog: MatDialog) { }

  confirm(title: string, subtitle: string): Observable<boolean> {
    this.dialogRef = this.dialog.open(AlertComponent, {
      data: { title, subtitle },
    });

    return this.dialogRef.afterClosed();
  }
}
