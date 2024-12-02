import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-remarks-dialog',
  standalone: true,
  imports: [MatIconModule],
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
