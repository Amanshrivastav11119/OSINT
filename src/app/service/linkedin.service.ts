import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {
  private rapidApiKey = 'e058d5d7fbmshae22f7f2ddac844p19c7fajsn618c8d1fed35';
  private rapidApiHost = 'linkedin-profiles1.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  search(query: string, type: string): Observable<any> {
    const options = {
      method: 'GET',
      url: 'https://linkedin-profiles1.p.rapidapi.com/search',
      params: {
        query,
        type
      },
      headers: this.getHeaders()
    };

    return this.http.request(options.method, options.url, { params: options.params, headers: options.headers });
  }

  extract(url: string): Observable<any> {
    if (!url) {
      return throwError('LinkedIn profile URL is not provided.');
    }

    const options = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': this.rapidApiKey,
        'X-RapidAPI-Host': this.rapidApiHost,
      }),
      params: new HttpParams().set('url', url).set('html', '1')
    };

    return this.http.get('https://linkedin-profiles1.p.rapidapi.com/extract', options)
      .pipe(
        catchError(error => {
          console.error('Error extracting LinkedIn profile:', error);
          return throwError('Error extracting LinkedIn profile.');
        })
      );
  }
  

  getConnectionCount(username: string): Observable<any[]> {
    const options = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': this.rapidApiKey,
        'X-RapidAPI-Host': 'linkedin-api8.p.rapidapi.com'
      }),
      params: new HttpParams().set('username', username)
    };
  
    return this.http.get<any[]>('https://linkedin-api8.p.rapidapi.com/data-connection-count', options);
  }
  

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-RapidAPI-Key': this.rapidApiKey,
      'X-RapidAPI-Host': this.rapidApiHost
    });
  }
}
