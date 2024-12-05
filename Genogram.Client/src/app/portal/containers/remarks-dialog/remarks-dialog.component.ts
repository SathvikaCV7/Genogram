import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-remarks-dialog',
  standalone: true,
  imports: [MatIconModule,MatDialogModule,MatButtonModule],
  templateUrl: './remarks-dialog.component.html',
  styleUrl: './remarks-dialog.component.scss'
})
export class RemarksDialogComponent {
  constructor(    public dialogRef: MatDialogRef<RemarksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { remarks: string }) {}
    closeGenogram() {
    this.dialogRef.close();
    
  }
}
