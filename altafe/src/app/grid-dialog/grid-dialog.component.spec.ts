import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDialogComponent } from './grid-dialog.component';

describe('GridDialogComponent', () => {
  let component: GridDialogComponent;
  let fixture: ComponentFixture<GridDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
