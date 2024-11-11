import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
  productForm !: FormGroup;
  constructor(private formBuilder : FormBuilder) {}

  ngOnInit(): void{
    this.productForm=this.formBuilder.group({
      Date : ['', Validators.required],
      Time : ['', Validators.required],
      Handledby : ['', Validators.required],
      Receivedby : ['', Validators.required],
      HospitalName : ['', Validators.required],
      SampleType : ['', Validators.required],
      Numberofspecimenreceived : ['', Validators.required],
      Fixed : ['', Validators.required],
      Unfixed : ['', Validators.required],
      Elaborate : ['', Validators.required],
      Actiontaken : ['', Validators.required],
      Reportedto : ['', Validators.required],
      OnDate : ['', Validators.required],
      Signature : ['', Validators.required],

    })
  }
  addProduct(){
    console.log(this.productForm.value);
    
}

}


