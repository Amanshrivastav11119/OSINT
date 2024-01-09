import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FacebookService {

    private baseUrl = 'http://localhost:3000/api/facebook/news';

    constructor(private http: HttpClient) { }

    searchFacebookData(keywords: string): Observable<any> {
        const url = `${this.baseUrl}?keywords=${keywords}`;
        return this.http.get(url);
    }

}
