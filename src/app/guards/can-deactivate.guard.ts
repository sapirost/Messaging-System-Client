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

    if (confirm('Are you sure you want to leave?')) {
      return true;
    } else {
      return false;
    }

  }
}
