import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GeneratorService } from './services/generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html'
})
export class GeneratorComponent implements OnInit, OnDestroy {
  characterIsDisabled = false;
  charactersSource: string[][] = [];
  weightConstant: string;

  charactersUpdatedSubscription: Subscription;

  constructor(private generatorService: GeneratorService) {
    this.generatorService.charactersUpdated$.subscribe(characters => this.charactersSource = characters);
   }

  ngOnInit(): void {
    this.generatorService.getWeightConstant().subscribe(constant => this.weightConstant = constant);
  }

  ngOnDestroy(): void {
    if (this.charactersUpdatedSubscription) {
      this.charactersUpdatedSubscription.unsubscribe();
    }
  }

  startGenerator(): void {
    this.generatorService.startGenerator();
  }

  setWeightConstant(): void {
    this.generatorService.setWeightConstant(this.weightConstant.toLowerCase());
    this.characterIsDisabled = true;

    setTimeout(() => {
      this.characterIsDisabled = false;
    }, 4000);
  }
}
