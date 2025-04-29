import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { copyFileSync } from 'fs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayemntGetwayService {

  constructor(private http: HttpClient) { }
  initiatePayment(phone: string, amount: number, transactionId: string, profileid: string, plan: string): Observable<any> {
    return this.http.get('http://127.0.0.1:5001/workifest-ecd6d/us-central1/app/pay?phone=' + phone + '&amount=' + amount + '&transactionId=' + transactionId + '&profileid=' + profileid + '&plan=' + plan, {});
  }

}
