import { Component } from '@angular/core';
import { FacebookService } from '../service/facebook.service';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent {

  searchKeywords: string = '';
  searchResults: any[] = [];

   // Search placeholder functions
   isFocused: boolean = false;
   onFocus() {
     this.isFocused = true;
   }
   onBlur() {
     this.isFocused = false;
   }

  constructor(private facebookService: FacebookService) {}

  searchData() {
    this.facebookService.searchFacebookData(this.searchKeywords).subscribe((data) => {
      this.searchResults = data;
      console.log(data);
    });
  }

}
