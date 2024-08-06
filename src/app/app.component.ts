import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showLoadingIndicator = true;
  constructor(
    private router: Router,

  ) {
    this.router.events.subscribe({
      next: routerEvent => {
        if (routerEvent instanceof NavigationStart) {
          this.showLoadingIndicator = true;
        }
        if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
          this.showLoadingIndicator = false;
        }
      },
      error: (err) => {
        console.log("err: ", err);
      }
    });
  }
}
