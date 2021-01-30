import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { IsPristineAware } from 'src/app/guards/can-deactivate.guard';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent implements OnInit, IsPristineAware {
  Editor = ClassicEditor;
  messageForm: FormGroup;
  isSendingInProcess: boolean;

  constructor(private fb: FormBuilder, private messageService: MessageService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      subject: [null, Validators.required],
      message: [null, Validators.required],
      receiver: [null, Validators.required],
    });
  }

  onReady(editor: ClassicEditor) {
    editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
  }

  isPristine(): boolean {
    return this.messageForm.pristine;
  }

  send(): void {
    if (this.messageForm.invalid) {
      this.snackBar.open('Please fill all fields');
      return this.messageForm.markAllAsTouched();
    }

    this.isSendingInProcess = true;
    this.messageService.send(this.messageForm.value)
      .pipe(finalize(() => this.isSendingInProcess = false))
      .subscribe(() => {
        this.messageForm.reset();
        this.snackBar.open('Message sent!');
      }, () => this.snackBar.open('something went wrong, please try again'));
  }
}
