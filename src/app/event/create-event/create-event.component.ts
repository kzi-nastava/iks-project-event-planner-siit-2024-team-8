import { Component } from '@angular/core';
import {Activity, returnActivity} from '../domain/activity';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  imageUrl: "https://via.placeholder.com/150"; // Default placeholder image
  selectedFile: File | null = null;
  imageSelected: boolean = false;

  activities : Activity[] = [];


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Set the image source to the selected file
        this.imageSelected = true; // Enable the "Next" button
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmitLocationClick() {

  }

  onClickNewActivity() {
    this.activities.push(returnActivity());
  }
  onActivitySaved(savedActivity: Activity): void {
    this.activities.pop();
    this.activities.push(savedActivity);
    console.log('Activity added to list:', savedActivity);
  }

  onActivityClick(activity: Activity) {

  }
}
