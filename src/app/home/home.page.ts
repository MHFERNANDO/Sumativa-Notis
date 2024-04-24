import { Component, OnInit } from '@angular/core';
import { Database, object, ref, set } from '@angular/fire/database';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  valor: number = 0;
  color: string = "";
  fondo: string = "background-color: #111111;";
  route: any;

  constructor(private database: Database) { }

  async ngOnInit() {
    await LocalNotifications.requestPermissions();

    const route = ref(this.database, 'termometro');
    object(route).subscribe(attributes => {
      const dato = attributes.snapshot.val();
      this.valor = dato;
      this.medir(this.valor);
      this.sendNotification(this.valor); // Llamar a la función para enviar notificaciones basadas en el valor
    });

    this.route = set(ref(this.database, 'termometro'), this.valor);
  }

  async medir(valor: number) {
    this.valor = valor;
    if (this.valor <= 1000) {
      this.color = "--level-color: rgb(3, 3, 22);";
      this.fondo = "background-color: #111111;";
    } else {
      this.color = "--level-color: rgb(239, 237, 188);";
      this.fondo = "background-color: #ffffff;"
    }
  }

  async sendNotification(valor: number) {
    if (valor <= 1000) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Es de NOCHE",
            body: "La luz detectada en el sensor, nos indica ser de NOCHE",
            id: 1
          }
        ]
      });
    } else if (valor > 1000){
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Es de DIA",
            body: "La luz detectada en el sensor, nos indica ser de dia",
            id: 1
          }
        ]
      });
    }
  }
}
