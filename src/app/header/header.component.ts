import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });
  
  ngOnInit(): void {
  }

}
