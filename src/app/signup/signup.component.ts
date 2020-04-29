import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   userForm = new FormGroup({
     firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, this.phoneNumberValidator]),
    image: new FormControl()
   });

   onSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm)
    }
    else{
      alert('Please fill mandetory data')
    }
     
   }
    phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const valid = /^\d+$/.test(control.value)
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } }
  }


  onFileChange(event:any) {
    let reader = new FileReader();
   console.log(event)
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    console.log(reader)
      reader.onload = () => {
        this.userForm.patchValue({
          image: reader.result
          
        });
        
        
      };
    }
  }
  reset(){
    this.userForm.reset()
  }
}
