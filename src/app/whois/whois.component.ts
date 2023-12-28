import { Component } from '@angular/core';
import { WhoisService } from '../service/whois.service';

@Component({
  selector: 'app-who-is',
  templateUrl: './whois.component.html',
  styleUrls: ['./whois.component.css']
})
export class WhoisComponent {
  domain: string;
  whoisData: any;
  nslookupData: any;
  selectedSearchType: string = 'whois'; // Default to 'whois'

  constructor(private whoisService: WhoisService) { }

  search() {
    if (this.selectedSearchType === 'whois') {
      this.searchWhois();
    } else if (this.selectedSearchType === 'nslookup') {
      this.searchNslookup();
    }
  }

  searchWhois() {
    this.whoisService.getWhoisData(this.domain).subscribe(
      data => {
        this.whoisData = data;
        console.log(this.whoisData);
      },
      error => {
        console.error(error);
      }
    );
  }

  searchNslookup() {
    this.whoisService.nslookup(this.domain).subscribe(
      data => {
        this.nslookupData = data;
        console.log(this.nslookupData);
      },
      error => {
        console.error(error);
      }
    );
  }
}
