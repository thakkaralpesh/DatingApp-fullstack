import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //support only angular version>=17
  //for less version use @Input and @Output
  //usersFromHomeComponent = input.required<any>();
  cancelRegister = output<boolean>();
  model:any={};
  private accountService = inject(AccountService);

  register()
  {
    this.accountService.register(this.model).subscribe({
      next:res=>{
        console.log(res);
        this.cancel();
      },
      error:error=>console.log(error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
