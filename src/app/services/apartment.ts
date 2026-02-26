import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from './apartment.model';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root',
})

export class ApartmentService {
  private apartmentApi = 'http://localhost:3000/apartments';
  private commentApi = 'http://localhost:3000/comments';

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