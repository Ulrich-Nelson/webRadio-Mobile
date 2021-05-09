import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BillCustomer } from 'src/app/interfaces.ts/Bills';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {

  
 //Récupération des factures du customer
 bills: BillCustomer

  constructor( public alertController : AlertController, 
     private authservice: AuthCustomerService,
    private toastMessage: ToastMessageService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.getBillsAction();
  }
  



/*----FERMER LA FENETRE DANS LA PAGE DE PROFIL------*/
async closeModal(){
  await this.modalController.dismiss()
}


/*----RECUPERATION DES FACTURES DU CUSTOMER------*/
async getBillsAction(): Promise<void>{
  this.authservice.getBills(await this.authservice.getToken())
  .pipe()
  .subscribe(async (data: any) => {
    this.bills = data.bills
    console.log(this.bills)
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  }
  )
}







}
