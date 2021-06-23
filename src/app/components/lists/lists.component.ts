import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  @ViewChild(IonList) ionList: IonList;
  @Input() completed = true;
  List: Lista;
  constructor(public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() { }
  goToListSelected(list: Lista) {
    console.log(list);
    if (this.completed) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${list.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${list.id}`);
    }
  }
  deleteList(list: Lista) {
    this.deseosService.deleteList(list);
  }
  async editList(list: Lista) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Edit List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title,
          placeholder: 'title item'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('calcel');
            this.ionList.closeSlidingItems();
          }
        },
        {
          text: 'Edit',
          handler: (data) => {
            console.log(data);
            if (data.title.leght === 0) {
              return;
            }
            list.title = data.title;
            this.deseosService.saveStorage();
            this.ionList.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }


}
