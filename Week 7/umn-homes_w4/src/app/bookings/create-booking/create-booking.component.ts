import { BookingService } from './../booking.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(private modalCtrl: ModalController, private actionSheetController: ActionSheetController, private bookingSrvc: BookingService) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }
  
  async onBookPlace(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Book Place',
      buttons:[{
        text: 'Book w/ Random Date',
        handler: () => {
          this.modalCtrl.create({ component: CreateBookingComponent, componentProps: { selectedPlace: this.selectedPlace } })
          .then(modalElement => {
            modalElement.present();
            return modalElement.onDidDismiss();
          })
          .then(resultData => {
            console.log(resultData);
          });
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  onBookMyPlace(){
    this.modalCtrl.dismiss({message: 'This is a dummy message!'}, 'confirm');
    this.bookingSrvc.addToMyBookings(this.selectedPlace);
  }

}
