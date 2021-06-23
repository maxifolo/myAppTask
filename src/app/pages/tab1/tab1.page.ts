import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController) { }

  async addList() {
    //this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'New List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'list title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('calcel');
          }
        },
        {
          text: 'create',
          handler: (data) => {
            console.log(data);
            if (data.title.leght === 0) {
              return;
            }
            const listId = this.deseosService.createList(data.title);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listId}`);
          }
        }
      ]
    });

    alert.present();
  }
}
