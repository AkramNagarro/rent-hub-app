import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from './apartment.model';
import { Comment } from './comment.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ApartmentService {
  private apartmentApi = environment.apiUrl + '/apartments';
  private commentApi = environment.apiUrl + '/comments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(this.apartmentApi);
  }

  updateFavorite(id: string, favorite: boolean): Observable<any> {
    return this.http.patch(`${this.apartmentApi}/${id}`, { favorite });
  }

  getApartment(id: string) {
    return this.http.get<Apartment>(`${this.apartmentApi}/${id}`);
  }

  getComments(apartmentId: string) {
    return this.http.get<Comment[]>(
      `${this.commentApi}?apartmentId=${apartmentId}`
    );
  }

  addComment(data: Comment) {
    return this.http.post(`${this.commentApi}`, data);
  }


}