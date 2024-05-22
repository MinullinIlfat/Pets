import {Component, OnInit} from '@angular/core';
import {PetsService} from "./shared/services/pets.service";
import {PetsType} from "../types/pets.type";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pets: any[] = [];
  arrayPets: any = [];
  petName: string | null = null;
  petPhoto: string | null = null;
  petStatus: string | null = null;
  petCategory: string | null = null;

  constructor(private petsService: PetsService) {

  }

  ngOnInit() {
    this.petsService.getPets()
      .subscribe((data: PetsType[]) => {
        this.pets = data;

        this.pets.forEach(item => {
          if (item) {
            this.arrayPets.push({
              id: item.id, name: item.name,
              photoUrls: [item.photoUrls], status: item.status, category: item.category
            });
          }
        })
      })

    //Модальное окно
    $(document).ready(function () {
      var p = $(".pan1");
      var d = $(".pan2");
      var r = $("#resize");

      var curr_width = p.width()
      var unlock = false;

      $(document).mousemove(function (e: any) {
        var change = curr_width + (e.clientX - curr_width);

        if (unlock) {
          if (change > 199) {
            $("#debug").text(e.clientX + " resize");
            p.css("width", change);
            d.css("margin-left", change);
          } else {
            p.css("width", 200);
            d.css("margin-left", 200);
          }
        }
      });

      r.mousedown(function (e: any) {
        curr_width = p.width();
        unlock = true;
        r.css("background-color", "rgba(0, 0, 0, 0.2)");
      });

      $(document).mousedown(function (e: any) {
        if (unlock) {
          e.preventDefault();
        }
      });

      $(document).mouseup(function (e: any) {
        unlock = false;
        $("#debug").text("");
        r.css("background-color", "rgba(0, 0, 0, 0.1)");
      });
    });
  }

  //Открытие модального окна и передача данных
  open(petName: string, petPhoto: string, petStatus: string, petCategory: string) {
    let pan1: HTMLElement | null = document.getElementById('pan1');

    if (pan1) {
      pan1.style.display = 'block';
    }
    this.petName = petName;
    this.petPhoto = petPhoto;
    this.petStatus = petStatus;
    this.petCategory = petCategory;
  }

  //Закрытие модального окна
  close() {
    let pan1: HTMLElement | null = document.getElementById('pan1');
    if (pan1) {
      pan1.style.display = 'none';
    }
  }
}
