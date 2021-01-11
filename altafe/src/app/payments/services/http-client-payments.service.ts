import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PaymentsService } from './payments.service';
import { IPayment } from 'src/app/model/payment';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class HttpClientPaymentsService extends PaymentsService {

  constructor(private http: HttpClient) {
    super();
  }

  getPayments(): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(this.paymentsUrl).pipe(
      catchError(this.handleError)
    );
  }

  getPayment(id: number): Observable<IPayment> {
    const url = `${this.paymentsUrl}/${id}`;
    return this.http.get<IPayment>(url).pipe(
      catchError(this.handleError)
    );
  }

  addPayment(payment: IPayment): Observable<IPayment> {
    return this.http.post<IPayment>(this.paymentsUrl, payment, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
