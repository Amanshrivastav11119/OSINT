import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../service/facebook.service';
import { SharedDataService } from '../service/shared-data.service';


@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  searchKeywords: string = '';
  searchResults: any[] = [];
  selectedArticles: any[] = [];

  // Search placeholder functions
  isFocused: boolean = false;
  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
  }

  // Function to add or remove an article from the selected list
  toggleSelectedArticle(searchResults: any) {
    const index = this.searchResults.findIndex(item => item === searchResults);
    if (index !== -1) {
      this.searchResults.splice(index, 1);
    }
  }
  isArticleSelected(article: any) {
    return this.selectedArticles.includes(article);
  }

  constructor(private facebookService: FacebookService, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.searchQuery$.subscribe(searchQuery => {
      // Update the searchQuery property when it changes
      this.searchKeywords = searchQuery;
    });
    throw new Error('Method not implemented.');
  }

  searchData() {
    this.facebookService.searchFacebookData(this.searchKeywords).subscribe((data) => {
      this.searchResults = data;
      console.log(data);
      console.log(data[1].imagehash[0])
    });
  }

}
