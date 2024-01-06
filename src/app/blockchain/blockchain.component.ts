import { Component } from '@angular/core';
import { BlockchainService } from '../service/blockchain.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent {

  userInput: string;
  selectedFunction: string = "Select Option";
  searchResult: any;

    // Search placeholder functions
    isFocused: boolean = false;
    onFocus() {
      this.isFocused = true;
    }
    onBlur() {
      this.isFocused = false;
    }

  constructor(private blockchainService: BlockchainService) {}

  search(): void {
    switch (this.selectedFunction) {
      case 'Balance':
        this.getBalance(this.userInput);
        break;
      case 'Multiple Address':
        this.getMultiaddr(this.userInput);
        break;
      case 'Single Address':
        this.getRawaddr(this.userInput);
        break;
      case 'Single Transaction':
        this.getRawtx(this.userInput);
        break;
      case 'Single Block':
        this.getRawblock(this.userInput);
        break;
      default:
        console.error('Invalid function selected');
    }
  }

  selectFunction(func: string): void {  // Change the method name to 'selectFunction'
    this.selectedFunction = func;
  }

  getBalance(active: string): void {
    this.blockchainService.getBalance(active).subscribe(result => this.searchResult = result);
  }

  getMultiaddr(active: string): void {
    this.blockchainService.getMultiaddr(active).subscribe(result => this.searchResult = result);
  }

  getRawaddr(address: string): void {
    this.blockchainService.getRawaddr(address).subscribe(result => this.searchResult = result);
  }

  getRawtx(txid: string): void {
    this.blockchainService.getRawtx(txid).subscribe(result => this.searchResult = result);
  }

  getRawblock(blockhash: string): void {
    this.blockchainService.getRawblock(blockhash).subscribe(result => this.searchResult = result);
  }

}
