import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slides = [
    {
      title: 'Ionic',
      img: 'assets/images/ionic.png',
      icon: 'logo-ionic',
      description: "Un kit de herramientas de interfaz de usuario móvil de código abierto para crear aplicaciones móviles multiplataforma modernas y de alta calidad a partir de una única base de código"
    },
    {
      title: 'TypeScript',
      img: 'assets/images/ts.png',
      icon: 'logo-ionic',
      description: "TypeScript es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases."
    },
    {
      title: 'Angular',
      img: 'assets/images/angular.png',
      icon: 'code',
      description: "Angular es un framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página."
    },
    {
      title: 'Utilice la tecnología de JavaScript que prefiera.',
      img: 'assets/images/framework.png',
      icon: 'code',
      description: "No hacemos suposiciones sobre los JS Frameworks con los que prefiere construir. Es por eso que diseñamos Ionic para que se integre a la perfección con todos los mejores marcos frontend, incluidos Angular, React, Vue o incluso ningún marco."
    }
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }
  finish() {
    this.router.navigateByUrl('/home')
  }

}
