import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class PaymentsInMemDataService implements InMemoryDbService {
  createDb() {
    const payments = [];
    return { payments };
  }

  // Overrides id generator and delivers next available `id`
  genId<T extends { id: any }>(collection: T[], collectionName: string): any {
    if (collection) {
      console.log(`genId override for '${collectionName}'`);
      return 1 + collection.reduce((prev, curr) => Math.max(prev, curr.id || 0), 0);
    }
  }

}
