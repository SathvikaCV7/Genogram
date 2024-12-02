import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChildDetailsService } from '../../../core/services/child-details.service';
import { Child } from '../../../core/models/Child';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AddOrEditChildComponent } from '../add-or-edit-child/add-or-edit-child.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NameOf } from '../../../core/Utilities/name-of-helper';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-child-list',
  standalone: true,
  imports: [MatButtonModule,CommonModule,MatCardModule,MatTableModule,MatIconModule],
  templateUrl: './child-list.component.html',
  styleUrl: './child-list.component.scss'
})
export class ChildListComponent {
  childDetailsService=inject(ChildDetailsService);
  child:Child|undefined;
  image:string|undefined='';
  
  displayedColumns: string[] = NameOf.those<Child>(['image','name','address','nationality','language','dateOfBirth']);
  children:Child[]=[];
  constructor(  public dialog: MatDialog, private toastr: ToastrService,private route: ActivatedRoute){
    this.childDetailsService.getAllChildren().subscribe((children:any)=>{

      this.children=children.$values;
    })
  }

  onAddChild(): void {
    const dialogRef = this.dialog.open(AddOrEditChildComponent, {
      width: '600px',
      data: {
        child: undefined, 
        relationships: []  
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const date = new Date(result.dateOfBirth);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        result.dateOfBirth = `${year}-${month}-${day}`;
          this.childDetailsService.addChild(result).subscribe((res) => {
            this.child = res; 
            this.toastr.success('Child added successfully.');
          });
        }
      }
    );
  }
  

}
