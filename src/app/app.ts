import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from './header/header';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule, Header],
  template: `
   <app-header/>
    <main>
      <router-outlet/>
    </main>
  `,
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('rent-hub-app');
}