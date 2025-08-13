import {Component, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {UserService} from '../user-service';
import {UserInfoResponse} from '../domain/user.info.response';
import {MatDialog} from '@angular/material/dialog';
import {LogoutDialogComponent} from '../../dialogs/logout-dialog/logout-dialog.component';
import {EventInfoResponse} from '../../event/domain/EventInfoResponse';
import {EventService} from '../../services/event-service';
import {BlockUserDialogComponent} from '../../dialogs/block-user-dialog/block-user-dialog.component';
import {ToastService} from '../../services/toast-service';
import {BlockedUsersDialogComponent} from '../../dialogs/blocked-users-dialog/blocked-users-dialog.component';
import {BlockedUserResponse} from '../domain/blocked.user.response';
import {ReportUserDialogComponent} from '../../dialogs/report-user-dialog/report-user-dialog.component';
import {ProviderInfoResponse} from '../domain/ProviderInfoResponse';


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
  blockedUsers: BlockedUserResponse[] = [];
  initialListLength : number = 0;
  companyName: string = '';
  companyDesc: string = '';
  companyImages: string[] = [];
  loggedInProviderId: string = null;
  favoriteEvents: EventInfoResponse[] = [];

  isMyProfile: boolean = true;

  id :string = null;

  constructor(private router: Router,private authService: AuthService, private userService: UserService,
              private dialog: MatDialog, private viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver,
              private eventService: EventService,
              private route: ActivatedRoute,
              private toastService: ToastService,) { }

  ngOnInit() {
    this.authService.userState.subscribe(userRole => {
      this.role = userRole;
      this.id = this.route.snapshot.paramMap.get('id');

      if (this.id) {
        // If there's an id in the route params, load that user info
        this.loadAnotherUser();

        // Also load favorites for this user id
        this.loadFavorites(this.id);

      } else {
        // Load current logged-in user's info
        this.userService.getUserInfo().subscribe({
          next: (data: UserInfoResponse) => {
            this.currentUser = data;
            this.imageUrl = data.profileImage;

            if (this.role === 'Organizer') {
              this.eventService.getOrganizedEvents(this.currentUser.email).subscribe({
                next: (events: EventInfoResponse[]) => {
                  this.items = events;
                }
              });
            }

            if (this.role === 'Provider') {
              const userId = this.authService.getUserId();
              this.userService.getProviderInfo(userId).subscribe({
                next: (providerData: ProviderInfoResponse) => {
                  this.companyDesc = providerData.companyDescription;
                  this.companyName = providerData.companyName;
                  this.companyImages = providerData.companyImagesURL;
                  this.loggedInProviderId = userId;
                }
              });
            }

            // Load favorites for current user (when no route param)
            this.loadFavorites(this.authService.getUserId());
          }
        });
      }

      // Load blocked users regardless of above
      this.userService.getBlockedUsers().subscribe(blockedUsers => {
        this.blockedUsers = blockedUsers;
        this.initialListLength = blockedUsers.length;
      });
    });
  }

  private loadFavorites(userId: string | null) {
    if (!userId) {
      this.favoriteEvents = [];
      return;
    }

    this.userService.getFavs(userId).subscribe({
      next: favorites => {
        this.favoriteEvents = favorites;
      },
      error: err => {
        console.error('Failed to load favorites', err);
        this.favoriteEvents = [];
      }
    });
  }


  loadAnotherUser() {
    console.log(this.id);
    this.userService.getUserById(this.id).subscribe({
      next: (data: UserInfoResponse) => {
          this.currentUser = data;
          this.imageUrl = data.profileImage;
          this.isMyProfile = false;
          this.role = "";
      }
    })
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

  onBlockUserClicked() {
    const dialogRef = this.dialog.open(BlockUserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.blockUser();
      }
    });
  }

  private blockUser() {
    this.userService.blockUser(this.id).subscribe(response => {
      if(response.success){
        this.toastService.showSuccessToast("Blocked User Successfully");
      }
    })
  }

  blockedUsersClicked() {
    const dialogRef = this.dialog.open(BlockedUsersDialogComponent, {
      width: '40%',
      data: this.blockedUsers
    });

    dialogRef.  afterClosed().subscribe(result => {
      if (this.initialListLength == this.blockedUsers.length) {return;}
      this.userService.updateBlockedUsers(this.blockedUsers.map(user => user.id)).subscribe(response => {
        if(response.success){
          this.toastService.showSuccessToast("Updated Block List Successfully!");
          this.initialListLength = this.blockedUsers.length;
        }
      })
    })

    dialogRef.componentInstance.unblock.subscribe(result => {
        this.blockedUsers = this.blockedUsers.filter(user => user!=result );
    })
  }

  onReportUserClicked() {
    const dialogRef = this.dialog.open(ReportUserDialogComponent, {
      data : {
        userId : localStorage.getItem("userID"),
        reportedEmail : this.currentUser.email,
        reason : ''
      }
    });

    dialogRef.componentInstance.report.subscribe(result => {
        this.userService.reportUser(result).subscribe(response => {
          if(response.success){
            this.toastService.showSuccessToast("Reported User Successfully!");
          }else{
            this.toastService.showSuccessToast(response.message);
          }
        });
    })
  }

  navigateToEventTypes() {
    this.router.navigate(['/event-types']);
  }
}
