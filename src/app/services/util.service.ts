import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

const { Toast } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private alertControl: AlertController) { }

  generateQueryParams(queryParamObj) {
    let queryParams = "";
    if (queryParamObj) {
      const queryParamKeys = Object.keys(queryParamObj);
      queryParamKeys.forEach(qPK => queryParams = `${queryParams == "" ? queryParams: "&" }${ queryParamObj[qPK] ? `${qPK}=${queryParamObj[qPK]}`: `${queryParamObj[qPK]}`}`);
    }
    return queryParams;
  }
  
  async showToast(text: string, duration?, position?) {
    await Toast.show({
      text,
      duration,
      position,
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertControl.create({
      header,
      message,
      mode: 'ios',
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    await alert.present();
  }
}
