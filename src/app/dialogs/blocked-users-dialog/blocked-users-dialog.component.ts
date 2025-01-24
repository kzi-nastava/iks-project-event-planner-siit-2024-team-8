import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BlockedUserResponse} from '../../user/domain/blocked.user.response';

@Component({
  selector: 'app-blocked-users-dialog',
  templateUrl: './blocked-users-dialog.component.html',
  styleUrl: './blocked-users-dialog.component.css'
})
export class BlockedUsersDialogComponent {

  blocked : BlockedUserResponse[];

  @Output()
  unblock: EventEmitter<BlockedUserResponse> = new EventEmitter<BlockedUserResponse>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BlockedUserResponse[],
    private dialogRef: MatDialogRef<BlockedUsersDialogComponent>
  ){
      this.blocked = data;
  }


  unblockClicked($event: BlockedUserResponse): void {
    this.blocked = this.blocked.filter(blocked => blocked.id !== $event.id);
    this.unblock.emit($event);
  }
}
