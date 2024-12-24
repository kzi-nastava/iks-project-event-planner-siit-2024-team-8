import {Component, ComponentFactoryResolver, Type, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {UserService} from '../user-service';
import {User} from '../domain/user';
import {UserInfoResponse} from '../domain/user.info.response';
import {
  DeleteConfirmationDialogComponent
} from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LogoutDialogComponent} from '../../dialogs/logout-dialog/logout-dialog.component';
import {catchError, of, retryWhen, switchMap, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EventInfoResponse} from '../../event/domain/EventInfoResponse';
import {EventService} from '../../services/event-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  role : string = '';
  currentUser : UserInfoResponse = null;
  imageUrl : string = '';
  items: EventInfoResponse[] = [];

  constructor(private router: Router,private authService: AuthService, private userService: UserService,
              private dialog: MatDialog, private viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver,
              private eventService: EventService) { }

  ngOnInit() {
    this.authService.userState.subscribe(user => {
      this.role = user;
      this.userService.getUserInfo().subscribe({
        next: (data: UserInfoResponse) => {
          this.currentUser = data;
          this.imageUrl = data.profileImage;
          if (this.role == 'Organizer') {
            this.eventService.getOrganizedEvents(this.currentUser.email).subscribe({
              next: (data: EventInfoResponse[]) => {
                this.items = data;
              }
            });
          }
        }
      });
    });
  }

  navigateToCreateAsset(): void {
    this.router.navigate(['/create-asset']);
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/profile-edit']);
  }

  navigateToCategories(): void {
    this.router.navigate(['/asset-categories']);
  }

  logoutClick() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.authService.logout();
      }
    });
  }
}
