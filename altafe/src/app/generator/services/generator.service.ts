import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Subscription, of as observableOf, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService implements OnDestroy {
  charactersSource: string[][] = [];
  private updatedCharactersSource = new BehaviorSubject([]);
  private updatedValidationCodeSource = new BehaviorSubject('');
  weightConstant = '';
  weightConstantMinimumPercentage = 0.2;
  numberOfColumns = 10;
  numberOfRows = 10;
  validationCode = '';
  validationCodeCharCountThreshold = 9;

  // Observable streams
  charactersUpdated$ = this.updatedCharactersSource.asObservable();
  validationCodeUpdated$ = this.updatedValidationCodeSource.asObservable();

  timerSubscription: Subscription;
  constructor() {
    this.initializeCharactersSource();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startGenerator(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = interval(2000).subscribe(() => {
      this.fillCharacters();

      this.generateValidationCode();

      this.updatedCharactersSource.next(this.charactersSource);
      this.updatedValidationCodeSource.next(this.validationCode);
    });
  }

  setWeightConstant(character: string): void {
    this.weightConstant = character;
  }

  getWeightConstant(): Observable<string> {
    return observableOf(this.weightConstant);
  }

  getValidationCode(): Observable<string> {
    return observableOf(this.validationCode);
  }

  private fillCharacters(): void {
    for (let ic = 0; ic < this.numberOfColumns; ic++) {
      for (let ir = 0; ir < this.numberOfRows; ir++) {
        this.charactersSource[ic][ir] = this.getRandomCharacter();
      }
    }

    if (this.weightConstant?.length > 0) {
      const occurrences = this.getCharOccurrences(this.weightConstant);

      const currentPercentage = occurrences / (this.numberOfColumns * this.numberOfRows);
      if (currentPercentage < this.weightConstantMinimumPercentage) {
        const totalPositionsMissing = Math.round((this.weightConstantMinimumPercentage - currentPercentage) *
          (this.numberOfColumns * this.numberOfRows));

        let updatedPositions = 0;
        while (updatedPositions < totalPositionsMissing) {
          const randomRow = Math.floor(Math.random() * this.numberOfRows);
          const randomColumn = Math.floor(Math.random() * this.numberOfColumns);

          if (this.charactersSource[randomRow][randomColumn] !== this.weightConstant) {
            this.charactersSource[randomRow][randomColumn] = this.weightConstant;

            updatedPositions++;
          }
        }
      }
    }
  }

  private getRandomCharacter(): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetLength = alphabet.length;
    return alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }

  private initializeCharactersSource(): void {
    for (let ic = 0; ic < this.numberOfColumns; ic++) {
      const row = [];
      for (let ir = 0; ir < this.numberOfRows; ir++) {
        row.push('');
      }
      this.charactersSource.push(row);
    }

    this.updatedCharactersSource.next(this.charactersSource);
  }

  private generateValidationCode(): void {
    this.validationCode = '';

    const seconds = new Date().getSeconds().toString().padStart(2, '0');
    const firstPosition = parseInt(seconds[0], 10);
    const secondPosition = parseInt(seconds[1], 10);

    const char1 = this.charactersSource[firstPosition][secondPosition];
    const char2 = this.charactersSource[secondPosition][firstPosition];

    const char1CheckSum = this.getCharCheckSum(char1);
    const char2CheckSum = this.getCharCheckSum(char2);

    this.validationCode = `${char1CheckSum}${char2CheckSum}`;
  }

  private getCharOccurrences(char: string): number {
    let charOccurences = 0;

    for (const charactersRow of this.charactersSource) {
      charOccurences += charactersRow.filter(i => i === char).length;
    }

    return charOccurences;
  }

  private getCharCheckSum(char: string): number {
    let charOccurrences = this.getCharOccurrences(char);

    if (charOccurrences > this.validationCodeCharCountThreshold) {
      charOccurrences = this.lowerToClosestInteger(charOccurrences);
    }

    return charOccurrences;
  }

  private lowerToClosestInteger(value: number): number {
    let divider = 2;
    let result = value;

    while (result > this.validationCodeCharCountThreshold) {
      if ((value / divider) > this.validationCodeCharCountThreshold) {
        divider++;
      } else {
        result = Math.round((value / divider));
      }
    }

    return result;
  }
}
