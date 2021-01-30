import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService {
  private BASE_SERVICE_URL = 'message';

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<any> {
    const endPoint = this.buildFullEndPoint(this.BASE_SERVICE_URL);

    return this.http.get(endPoint);
  }

  send(message: Message): Observable<any> {
    const endPoint = this.buildFullEndPoint(this.BASE_SERVICE_URL);

    return this.http.post(endPoint, message);
  }

  delete(id: string): Observable<any> {
    const endPoint = this.buildFullEndPoint(`${this.BASE_SERVICE_URL}/${id}`);

    return this.http.delete(endPoint);
  }
}
