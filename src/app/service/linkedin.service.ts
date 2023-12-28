import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {
    private baseUrl = 'https://linkedin-profiles1.p.rapidapi.com';

    constructor(private http: HttpClient) { }
  
    searchProfiles(query: string, searchType: string): Observable<any> {
      const headers = new HttpHeaders({
        'X-RapidAPI-Key': '6edecb7bb9mshd599a23712cf880p1cf31fjsn25beaf1ae3ab',
        'X-RapidAPI-Host': 'linkedin-profiles1.p.rapidapi.com'
      });
  
      const params = new HttpParams()
        .set('query', query)
        .set('type', searchType);
  
      return this.http.get(`${this.baseUrl}/search`, { headers, params });
    }
  
    extractProfile(url: string): Observable<any> {
      const headers = new HttpHeaders({
        'X-RapidAPI-Key': '6edecb7bb9mshd599a23712cf880p1cf31fjsn25beaf1ae3ab',
        'X-RapidAPI-Host': 'linkedin-profiles1.p.rapidapi.com'
      });
  
      const params = new HttpParams()
        .set('url', url);
  
      return this.http.get(`${this.baseUrl}/extract`, { headers, params });
    }
}
