import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneratorService } from '../generator/services/generator.service';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html'
})
export class CodePreviewComponent implements OnInit, OnDestroy {
  validationCode = '';

  validationCodeChangedSubscription: Subscription;
  constructor(private generatorService: GeneratorService) {
    this.validationCodeChangedSubscription = this.generatorService.validationCodeUpdated$.subscribe(code => this.validationCode = code);
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.validationCodeChangedSubscription) {
      this.validationCodeChangedSubscription.unsubscribe();
    }
  }
}
