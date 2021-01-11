import { Observable } from 'rxjs';
import { IPayment } from '../../model/payment';


export abstract class PaymentsService {
  paymentsUrl = 'api/payments';

  abstract getPayments(): Observable<IPayment[]>;
  abstract getPayment(id: number): Observable<IPayment>;
  abstract addPayment(payment: IPayment): Observable<IPayment>;
}
