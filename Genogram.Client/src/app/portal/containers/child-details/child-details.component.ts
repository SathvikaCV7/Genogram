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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child-details',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatToolbarModule, MatButtonModule, MatTabsModule, MatTableModule, RelationshipTableComponent],
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
  constructor(  private route: ActivatedRoute){
    
  }
  ngOnInit(): void {
    const childId = this.route.snapshot.paramMap.get('childId')|| '1';
    this.childDetailsService.getChild(childId).subscribe((child)=>{
      this.child = child;
      this.childId=child.id;
      this.relationships = child.relationships?.$values || [];
      console.log(this.relationships);
      debugger;
    });
  }



}
