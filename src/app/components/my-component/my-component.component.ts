import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponentComponent {
  inputValue: string = '';
  message: string = '';
  items: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getItems();
  }

  showMessage(): void {
    this.message = this.inputValue;
  }


  getItems(): void {
    this.http.get<any[]>('http://localhost:3000/api/items').subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
