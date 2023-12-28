import { Component } from '@angular/core';
import { LinkedinService } from '../service/linkedin.service';

@Component({
  selector: 'app-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrls: ['./linkedin.component.css']
})
export class LinkedinComponent {
  
  selectedOption: string = 'search'; // Default to search
  query: string = '';
  searchType: string = 'person'; // Default to person
  searchResults: any;
  extractUrl: string = 'https://www.linkedin.com/in/amandeep-singh-5a4770168/';
  extractedProfile: any;

  constructor(private linkedinService: LinkedinService) { }

  onOptionChange(option: string) {
    this.selectedOption = option;

    if (option === 'search') {
      this.resetSearchForm();
    }
  }

  search() {
    this.linkedinService.searchProfiles(this.query, this.searchType).subscribe(
      data => {
        this.searchResults = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  extract() {
    this.linkedinService.extractProfile(this.extractUrl).subscribe(
      data => {
        this.extractedProfile = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  private resetSearchForm() {
    this.query = '';
    this.searchType = 'person';
  }
  
}
