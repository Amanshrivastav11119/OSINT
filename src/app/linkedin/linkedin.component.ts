import { Component } from '@angular/core';
import { LinkedinService } from '../service/linkedin.service';

@Component({
  selector: 'app-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrls: ['./linkedin.component.css']
})
export class LinkedinComponent {
  
 query: string;
  searchType: string;
  connectionCountInput: string;
  extractUrl: string;
  searchResults: any;
  searchResultsWithConnectionCount: any;
  extractedProfile: any;
  selectedSearchType: string;

  constructor(private linkedinService: LinkedinService) {}

  search(): void {
    this.linkedinService.search(this.query, this.searchType).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  extract(): void {
    this.linkedinService.extract(this.extractUrl).subscribe(
      (data) => {
        this.extractedProfile = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchWithConnectionCount(): void {
    this.linkedinService.getConnectionCount(this.connectionCountInput).subscribe(
      (data) => {
        this.searchResultsWithConnectionCount = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
