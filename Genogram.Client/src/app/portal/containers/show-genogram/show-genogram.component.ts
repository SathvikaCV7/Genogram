import { Component, Inject, Input, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { Relationship } from '../../../core/models/Relationship';
import * as d3 from 'd3';
import {  ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-show-genogram',
  standalone: true,
  imports: [NgxGraphModule,MatIconModule,CommonModule],
  templateUrl: './show-genogram.component.html',
  styleUrl: './show-genogram.component.scss'
})
export class ShowGenogramComponent {
  childName: string |undefined; 
  
  relationships:Relationship[]=[];
  constructor(public dialogRef: MatDialogRef<ShowGenogramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
   
    if (this.data && this.data.relationships) {
      this.relationships = this.data.relationships;
      this.childName=this.data.childName;
    }
    this.initializeGenogram();
  }


  view: [number, number] = [750, 500]; 
  nodes:any[]=[];
  links:any[]=[];
  relationshipTypeCount: { [key: string]: number } = {};
  parents: any[] = [];

  initializeGenogram() {
    const padding = 40; // Add some padding to the node width
  
    // Add the child node
    this.nodes.push({
      id: 'child',
      label: this.childName,
      dimension: { width: this.calculateTextWidth(this.childName, '16px Arial') + padding },
      icon: 'assets/images/child_icon1.svg',
    });
  
    // Add relationship nodes
    this.relationships.forEach((relationship) => {
      const relationshipType = relationship.relationshipType.toLowerCase();
      const nodeId = `${relationshipType}-${relationship.id}`;
      if (!this.relationshipTypeCount[relationshipType]) {
        this.relationshipTypeCount[relationshipType] = 0;
      }
      this.relationshipTypeCount[relationshipType]++;
  
      if (
        relationshipType === 'mother' ||
        relationshipType === 'father' ||
        relationshipType === 'grandfather' ||
        relationshipType === 'grandmother'
      ) {
        this.parents.push(nodeId);
      }
  
      const label = `${relationship.firstName} ${relationship.lastName}`;
      this.nodes.push({
        id: nodeId,
        label: label,
        dimension: { width: this.calculateTextWidth(label, '16px Arial') + padding },
        icon: 'assets/images/user2.svg',
      });
  
      // Add links
      this.links.push({
        id: `${nodeId}-${this.relationshipTypeCount[relationshipType]}`,
        source: 'child',
        target: nodeId,
        label: relationship.relationshipType.toUpperCase(),
      });
    });
  
    // Add sibling relationships
    this.relationships
      .filter(
        (relationship) =>
          relationship.relationshipType.toLowerCase() === 'sister' ||
          relationship.relationshipType.toLowerCase() === 'brother'
      )
      .forEach((relationship) => {
        const relationshipType = relationship.relationshipType.toLowerCase();
        const nodeId = `${relationshipType}-${relationship.id}`;
        this.parents.forEach((parentNodeId: string) => {
          this.links.push({
            id: `sibling-${nodeId}-${parentNodeId}`,
            source: nodeId,
            target: parentNodeId,
            label: parentNodeId.split('-')[0].toUpperCase(),
          });
        });
      });
  }
  
  /**
   * Measure text width using a hidden canvas
   */
  calculateTextWidth(text: string | undefined, font: string): number {
    if (!text) return 0;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = font;
      return context.measureText(text).width;
    }
    return 0;
  }
  
  

  closeGenogram() {
    this.dialogRef.close();
  }
 

 
}
