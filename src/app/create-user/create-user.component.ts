import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../models/user';
import { CustomResponse } from '../models/customResponse';
import { HttpClientService } from '../services/httpclient.service';

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
    password: new FormControl('', Validators.required),
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
    await this.ApiService.createEmployee(user).toPromise().then((x) => {
      if (x.error) {
        this.error = x.error;
        this.errorMessage = x.message;
      } else {
        this.dialogRef.close();
      }
    });
  }

  passwordsMatch() {
    return this.createUser.value.password === this.createUser.value.confirmPassword;
  }

}
