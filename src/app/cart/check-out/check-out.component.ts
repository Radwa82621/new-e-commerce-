import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  cartId:string=''
shippingAddress:FormGroup=new FormGroup({
 "details":new FormControl(null),
  "phone": new FormControl(null),
  "city": new FormControl(null)
})
constructor(private _cart:CartService ,private _activatedRoute:ActivatedRoute){
  // this._activatedRoute.paramMap.subscribe((res:any)=>{
  //   this.cartId=res.params.cartId 
  // })
  this._cart.cardId.subscribe(res=>{
    this.cartId=res
  })
}

handleOnline(){
this._cart.generateOnlinePayment(this.cartId,this.shippingAddress.value).subscribe({
  next:(res)=>{
    if(res.status=="success"){
      console.log(res.session.url);
      window.location.href=res.session.url

    }
   
    
  },
  error:(err)=>console.log(err)
  
  
})
}
}
