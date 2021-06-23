import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonBackButton, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  @ViewChild('ionList') ionList: IonList;
  List: Lista;
  itemName = '';
  constructor(private deseosService: DeseosService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private alertCtrl: AlertController) {
    const listId = this.activatedRouter.snapshot.paramMap.get('listId');
    this.List = deseosService.getListById(listId);
  }

  ngOnInit() {
  }
  back() {
    this.router.navigateByUrl('/tabs/tab1');
  }
  addItem() {
    if (this.itemName.length === 0) {
      return;
    }
    const newItem = new ListaItem(this.itemName);
    this.List.items.push(newItem);
    this.itemName = '';
    this.deseosService.saveStorage();
  }
  changeItemCheck(item: ListaItem) {
    const pendientes = this.List.items.filter(itemData => {
      return !itemData.completed;
    }).length;
    if (pendientes === 0) {
      this.List.finished = new Date();
      this.List.completed = true;
    } else {
      this.List.finished = null;
      this.List.completed = false;
    }
    this.deseosService.saveStorage();
  }
  delete(index: number) {
    this.List.items.splice(index, 1);
    this.deseosService.saveStorage();
  }
  async edit(item: ListaItem) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Edit Item',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: item.description,
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
            item.description = data.title;
            this.deseosService.saveStorage();
            this.ionList.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }
}
