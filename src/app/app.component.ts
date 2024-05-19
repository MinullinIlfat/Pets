import {Component, OnInit} from '@angular/core';
import {PetsService} from "./shared/services/pets.service";
import {PetsType} from "../types/pets.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pets: PetsType[] = []
  constructor(private petsService: PetsService) {

  }

  ngOnInit() {
    this.petsService.getPets()
      .subscribe(data => {
        this.pets = data
        console.log(this.pets)

      })
  }

}
