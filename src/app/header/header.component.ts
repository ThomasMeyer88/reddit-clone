import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserComponent } from '../create-user/create-user.component';
import { AuthenticationService } from '../services/authentication.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public loginService: AuthenticationService) { }

  ngOnInit(): void {
    // console.log(!this.loginService.isUserLoggedIn());
    // console.log(this.loginService.getUser());
  }

  openCreateUser(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '30%',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openLogin(): void {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.loginService.logOut();
  }

}
