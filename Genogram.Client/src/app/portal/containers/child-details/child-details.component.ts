import { Component, inject, OnInit } from '@angular/core';
import { Child } from '../../../core/models/Child';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { RelationshipTableComponent } from "../relationship-table/relationship-table.component";
import { Relationship } from '../../../core/models/Relationship';
import { ChildDetailsService } from '../../../core/services/child-details.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddOrEditChildComponent } from '../add-or-edit-child/add-or-edit-child.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-details',
  standalone: true,
  imports: [RouterLink,CommonModule,MatIconModule, MatCardModule, MatToolbarModule, MatButtonModule, MatTabsModule, MatTableModule, RelationshipTableComponent],
  templateUrl: './child-details.component.html',
  styleUrl: './child-details.component.scss'
})
export class ChildDetailsComponent implements OnInit {
  childDetailsService=inject(ChildDetailsService);
  child:Child|undefined;
  childId:number|undefined;
  activeTab = 2; 
  relationships: Relationship[] = []; 
  selectedTabIndex=2;
  image:string|undefined='';
  constructor(  public dialog: MatDialog, private toastr: ToastrService,private route: ActivatedRoute){
  }
  ngOnInit(): void {
    const childId = this.route.snapshot.paramMap.get('childId')|| '1';
    this.childDetailsService.getChild(childId).subscribe((child)=>{
      this.child = child;
      this.childId=child.id;
      this.relationships = child.relationships?.$values || [];
      this.image=child.image;

    });
  }

  onEditChild(child: Child|undefined): void {
    const originalData = { ...child }; 
    const dialogRef = this.dialog.open(AddOrEditChildComponent, {
      width: '600px',
      data: {
        child: this.child, 
        relationships: child?.relationships?.$values 
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       const date = new Date(result.dateOfBirth);
       const year = date.getFullYear();
       const month = String(date.getMonth()+1).padStart(2, "0");
       const day = String(date.getDate()).padStart(2, "0");
       result.dateOfBirth = `${year}-${month}-${day}`;
        const fieldsToCompare: (keyof Child)[] = [
          'name',
          'address',
          'nationality',
          'language',
          'dateOfBirth',
          'image'
        ];
        const isChanged = fieldsToCompare.some(key => originalData[key] !== result[key]);
        if(result.image){
          this.image=result.image;
          console.log(this.image);
        }
        if (isChanged) {
          result.id = child?.id; 
          this.childDetailsService.updateChild(result).subscribe((res)=>{
              this.child = result; 
              this.toastr.success('Child details updated successfully.');
              setTimeout(() => {
                location.reload(); 
              }, 1000);
          })
          
        } else {
          console.log('No changes detected, skipping API call.');
        }
      }
    });
  }
  getGoogleMapsLink(address: string | undefined): string {
    if (!address) {
      return 'https://www.google.com/maps'; 
    }
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }


}
