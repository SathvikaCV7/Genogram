import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-show-genogram',
  standalone: true,
  imports: [NgxGraphModule,MatIconModule],
  templateUrl: './show-genogram.component.html',
  styleUrl: './show-genogram.component.scss'
})
export class ShowGenogramComponent {

  constructor(public dialogRef: MatDialogRef<ShowGenogramComponent>) {}
  @Input() childName: string = 'Sathvika CV'; 

  closeGenogram(): void {
    this.dialogRef.close(); 
  }
  
}
