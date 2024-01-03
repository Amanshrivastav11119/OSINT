import { Component } from '@angular/core';
import { LinkedinService } from '../service/linkedin.service';
import { take } from 'rxjs/operators';

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
  searchResultsWithConnectionCount: any;
  extractedProfile: any;
  selectedSearchType: string;
  searchResults: any[] = [];

  // Search placeholder functions
  isFocused: boolean = false;
  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
  } 

  constructor(private linkedinService: LinkedinService) { }

  search(): void {
    this.linkedinService.search(this.query, this.searchType)
      .pipe(
        take(1)
      )
      .subscribe(
        (initialData) => {
          this.searchResults = [initialData];
          this.fetchAdditionalResults(9);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  private fetchAdditionalResults(count: number): void {
    for (let i = 0; i < count; i++) {
      this.linkedinService.search(this.query, this.searchType)
        .pipe(
          take(1)
        )
        .subscribe(
          (data) => {
            this.searchResults = this.searchResults.concat(data.results);
          },
          (error) => {
            console.error(error);
          }
        );
    }
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
