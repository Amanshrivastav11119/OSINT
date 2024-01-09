import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NewsapiService } from '../service/newsapi.service';

@Component({
  selector: 'app-incident-report-dialog',
  templateUrl: './incident-report-dialog.component.html',
})
export class IncidentReportDialogComponent implements OnInit {

  newKeyword: string = '';
  newGroup: string = '';
  keywords: { keyword: string; group: string; }[] = [];
  groups: string[] = [];
  selectedKeyword: string = '';
  selectedGroup: string = '';
  selectedKeywords: { keyword: string; group: string; }[] = [];
  searchEnabled: boolean = false;
  searchResults: any[] = [];

  constructor(public dialogRef: MatDialogRef<IncidentReportDialogComponent>, private newsapiService: NewsapiService) {}

  ngOnInit() {
    // Load keywords and groups from local storage on component initialization
    this.loadKeywordsAndGroups();
  }

  saveToLocalStorage() {
    // Save keywords and groups to local storage
    localStorage.setItem('keywords', JSON.stringify(this.keywords));
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  loadKeywordsAndGroups() {
    // Load keywords and groups from local storage
    const storedKeywords = localStorage.getItem('keywords');
    if (storedKeywords) {
      this.keywords = JSON.parse(storedKeywords);
    }
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      this.groups = JSON.parse(storedGroups);
    }
  }

  closeDialog(): void {
    // Save data to local storage before closing the dialog
    this.saveToLocalStorage();
    // Pass the selected keywords to the parent component before closing the dialog
    this.dialogRef.close(this.selectedKeywords);
  }

  addKeyword(): void {
    if (this.newKeyword.trim() !== '' && this.selectedGroup !== '') {
      this.keywords.push({ keyword: this.newKeyword, group: this.selectedGroup });
      this.newKeyword = '';
      this.selectedGroup = '';
      this.saveToLocalStorage(); // Save after adding a keyword
      this.saveKeywordsAndGroups(); // Save to the backend
    }
  }

  addGroup(): void {
    if (this.newGroup.trim() !== '') {
      this.groups.push(this.newGroup);
      this.newGroup = '';
      this.saveToLocalStorage(); // Save after adding a group
      this.saveKeywordsAndGroups(); // Save to the backend
    }
  }

  editKeyword(keywordObj: { keyword: string; group: string }): void {
    const index = this.keywords.findIndex((k) => k.keyword === keywordObj.keyword && k.group === keywordObj.group);
    if (index !== -1) {
      this.newKeyword = keywordObj.keyword;
      this.selectedGroup = keywordObj.group;
      this.keywords.splice(index, 1);
      this.saveKeywordsAndGroups();
    }
  }

  editGroup(group: string): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.newGroup = group;
      this.groups.splice(index, 1);
      this.saveKeywordsAndGroups();
    }
  }

  deleteKeyword(keywordObj: { keyword: string; group: string }): void {
    const index = this.keywords.findIndex(k => k.keyword === keywordObj.keyword && k.group === keywordObj.group);
    if (index !== -1) {
      this.keywords.splice(index, 1);
      this.saveToLocalStorage(); // Save after deleting a keyword
      this.saveKeywordsAndGroups(); // Save to the backend
    }
  }

  deleteGroup(group: string): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
      this.saveToLocalStorage(); // Save after deleting a group
      this.saveKeywordsAndGroups(); // Save to the backend
    }
  }

  selectKeyword(keyword: { keyword: string; group: string }): void {
    const index = this.selectedKeywords.findIndex(k => k.keyword === keyword.keyword);
    if (index !== -1) {
      this.selectedKeywords.splice(index, 1);
    } else {
      this.selectedKeywords.push(keyword);
    }

    // Enable search and fetch results
    this.searchEnabled = true;
    this.searchResults = []; // Clear previous search results
    this.newsapiService.getNewsByKeywords([keyword.keyword]).subscribe(
      (results) => {
        this.searchResults = results;
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }

  // Save keywords and groups to the backend
  saveKeywordsAndGroups(): void {
    this.newsapiService.saveKeywordsAndGroups(this.keywords, this.groups).subscribe(
      (response: any) => {
        console.log('Keywords and groups saved to the backend:', response.message);
        // Optionally, you can handle success in your component
      },
      (error) => {
        console.error('Error saving keywords and groups to the backend:', error);
        // Handle the error if needed
      }
    );
    
  }

}
