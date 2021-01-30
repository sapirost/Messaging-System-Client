import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AlertService } from '../services/alert.service';

export interface IsPristineAware {
  isPristine(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<IsPristineAware> {

  constructor(private alertService: AlertService) { }

  canDeactivate(component: IsPristineAware): Promise<boolean> | boolean {
    if (component.isPristine()) {
      return true;
    }

    // return new Promise((resolve, reject) => {
    //   this.alertService.confirm('Are you sure you want to leave?', 'Changes won\'t be saved.').subscribe(answer => {
    //     if (answer) {
    //       resolve(true);
    //     } else {
    //       resolve(false);
    //     }
    //   });
    // });
    if (confirm('Are you sure you want to leave?')) {
      return true;
    } else {
      return false;
    }

  }
}
