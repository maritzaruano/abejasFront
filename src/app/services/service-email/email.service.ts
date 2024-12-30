import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContactform } from '../../core/interfaces/contactform';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = environment.apiUrl +'back/send-email.php';

  constructor
  (
    private http: HttpClient
  ) { }

  sendEmail(data: IContactform): Observable<any> {
    const headers = { 'Content-Type': 'application/json'}
    return this.http.post<any>(this.apiUrl, data, { headers });
  }
}
