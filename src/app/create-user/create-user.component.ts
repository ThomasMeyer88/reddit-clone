import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { User } from '../models/user';
import { CustomResponse } from '../models/customResponse';
import { HttpClientService } from '../services/httpclient.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  error: Boolean = false;
  errorMessage: string;

  createUser = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    public ApiService: HttpClientService
    ) {}

  ngOnInit(): void {
  }

  async onSubmit() {
    let user: User = {  userName: this.createUser.value.username,
                        email: this.createUser.value.email,
                        password: this.createUser.value.password,
                        id: null
                      };
    await this.ApiService.createEmployee(user).toPromise().then((res: CustomResponse) => {
      if (res.error) {
        this.error = res.error;
        this.errorMessage = res.message;
      } else {
        this.dialogRef.close();
      }
    }).catch((e: HttpErrorResponse) => {
      this.error = true;
      this.errorMessage = e.message;
    })
  }

  passwordsMatch() {
    return this.createUser.value.password === this.createUser.value.confirmPassword;
  }

}
