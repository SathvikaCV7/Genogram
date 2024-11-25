import { Component, inject, OnInit } from '@angular/core';
import { ChildDetailsService } from '../../../core/child-details.service';
import { Child } from '../../../core/models/Child';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { RelationshipTableComponent } from "../relationship-table/relationship-table.component";

@Component({
  selector: 'app-child-details',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatToolbarModule, MatButtonModule, MatTabsModule, MatTableModule, RelationshipTableComponent],
  templateUrl: './child-details.component.html',
  styleUrl: './child-details.component.scss'
})
export class ChildDetailsComponent implements OnInit {
  childDetailsService=inject(ChildDetailsService);
  child:any;
  constructor(){
    
  }
  ngOnInit(): void {
    debugger;
    this.childDetailsService.getChild().subscribe((child)=>{
      this.child=child;
      debugger;
    });
  }

  
  




}
