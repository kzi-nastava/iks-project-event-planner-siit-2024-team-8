import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user-service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent implements OnInit {
  token: string;
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }
  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.userService.activateUser(this.token).subscribe((response: any) => {console.log(response);});
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 10000);
  }
}
