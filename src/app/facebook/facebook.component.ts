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

  constructor(private facebookService: FacebookService) {}

  searchData() {
    this.facebookService.searchFacebookData(this.searchKeywords).subscribe((data) => {
      this.searchResults = data;
      console.log(data);
    });
  }

}
