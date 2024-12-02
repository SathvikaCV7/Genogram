import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { ChildDetailsComponent } from "./portal/containers/child-details/child-details.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Genogram';
}
