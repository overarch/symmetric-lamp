import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { PaymentsInMemDataService } from './payments/services/payments-in-mem-data.service';

import { OnlyAlphabetDirective } from './only-alphabet.directive';

import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';
import { CodePreviewComponent } from './code-preview/code-preview.component';
import { GridDialogComponent } from './grid-dialog/grid-dialog.component';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PaymentsComponent,
    CodePreviewComponent,
    GridDialogComponent,
    OnlyAlphabetDirective,
    AnalogClockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    environment.production ?
      [] : HttpClientInMemoryWebApiModule.forRoot(PaymentsInMemDataService, {delay: 50 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
