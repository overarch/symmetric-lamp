import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { GeneratorService } from '../generator/services/generator.service';

import { IPayment } from '../model/payment';
import { GridDialogComponent } from '../grid-dialog/grid-dialog.component';
import { deepCopy } from '../array-helper';
import { HttpClientPaymentsService } from './services/http-client-payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html'
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'code', 'grid'];
  dataSource: MatTableDataSource<IPayment> = new MatTableDataSource();

  payment: IPayment = {
    name: null,
    amount: null,
    code: null,
    grid: null
  };

  charactersUpdatedSubscription: Subscription;
  constructor(private generatorService: GeneratorService, private paymentsService: HttpClientPaymentsService,
              public dialog: MatDialog) {
    this.charactersUpdatedSubscription = this.generatorService.charactersUpdated$.subscribe(characters => {
      this.payment.grid = deepCopy(characters);
      this.generatorService.getValidationCode().subscribe(validationCode => this.payment.code = validationCode);
    });
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  addPayment(): void {
    this.paymentsService.addPayment(Object.assign({}, this.payment)).subscribe(result => {
      if (!!result) {
        this.payment.name = null;
        this.payment.amount = null;

        this.loadPayments();
      }
    });
  }

  openDialog(paymentEntry: IPayment): void {
    const dialogRef = this.dialog.open(GridDialogComponent, {
      width: '30%',
      data: {characters: paymentEntry.grid}
    });
  }

  private loadPayments(): void {
    this.paymentsService.getPayments().subscribe(payments =>
      this.dataSource = new MatTableDataSource<IPayment>(payments)
    );
  }
}
