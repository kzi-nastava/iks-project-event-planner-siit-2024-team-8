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

  isMyProfile: boolean = true;

  id :string = null;

  constructor(private router: Router,private authService: AuthService, private userService: UserService,
              private dialog: MatDialog, private viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver,
              private eventService: EventService,
              private route: ActivatedRoute,
              private toastService: ToastService,) { }

  ngOnInit() {
    this.authService.userState.subscribe(user => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.role = user;
      if (!(this.id==null)){this.loadAnotherUser(); return;}
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
          if (this.role == 'Provider') {
            this.userService.getProviderInfo(this.authService.getUserId()).subscribe({
              next: (data: ProviderInfoResponse) => {
                this.companyDesc = data.companyDescription;
                this.companyName = data.companyName;
                this.companyImages = data.companyImagesURL;
                this.loggedInProviderId = this.authService.getUserId();
            }
            })
          }
        }
      });
    });
    this.userService.getBlockedUsers().subscribe( blockedUsers => {
      this.blockedUsers = blockedUsers;
      this.initialListLength = blockedUsers.length;
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
