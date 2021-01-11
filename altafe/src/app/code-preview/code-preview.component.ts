import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../generator/services/generator.service';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html'
})
export class CodePreviewComponent implements OnInit {
  validationCode = '';

  constructor(private generatorService: GeneratorService) {
    this.generatorService.validationCodeUpdated$.subscribe(code => this.validationCode = code);
   }

  ngOnInit(): void {
  }

}
