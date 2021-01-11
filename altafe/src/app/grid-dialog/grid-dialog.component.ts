import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-grid-dialog',
  templateUrl: './grid-dialog.component.html'
})
export class GridDialogComponent implements OnInit {
  charactersSource: string[][] = [];

  constructor(
    public dialogRef: MatDialogRef<GridDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data.characters) {
        this.charactersSource = data.characters;
      }
    }

  ngOnInit(): void {
  }
}
