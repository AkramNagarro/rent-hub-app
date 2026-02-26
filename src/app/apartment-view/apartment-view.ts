import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentService } from '../services/apartment';
import { ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-apartment-view',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apartment-view.html',
  styleUrl: './apartment-view.scss',
})

export class ApartmentView implements OnInit {

  aptId!: string;
  apartment: any;
  comments: any[] = [];
  commentForm: FormGroup;
  route= inject(ActivatedRoute);
  api=inject(ApartmentService);
  apartment$!: Observable<any>;

  constructor(private fb: FormBuilder) {
      this.commentForm = this.fb.group({
      comment: ['']
    });
  }

  ngOnInit() {
    this.apartment$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.aptId = params.get('id')!;
        this.loadComments();
        return this.api.getApartment(this.aptId);
      })
    );
  }
  loadComments() {
    this.api.getComments(this.aptId)
      .subscribe(r => this.comments = r);
  }

  submitComment() {
    const user = JSON.parse(localStorage.getItem('user')!);

    const payload = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      apartmentId: this.aptId,
      comment: this.commentForm.value.comment
    };

    this.comments = [...this.comments, payload];

    this.api.addComment(payload).subscribe({
      next: () => {
        this.commentForm.reset();
      },
      error: () => {
        this.comments = this.comments.filter(c => c.id !== payload.id);
      }
    });
  }
}