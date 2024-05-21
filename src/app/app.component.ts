import {Component, OnInit} from '@angular/core';
import {PetsService} from "./shared/services/pets.service";
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pets: any[] = []
  arrayPets: any[] = []
  isOpen: boolean = false;
  petName: string | null = null;
  petPhoto: string | null = null;


  constructor(private petsService: PetsService) {

  }
  ngOnInit() {
    this.petsService.getPets()
      .subscribe(data => {
        this.pets = data

        this.pets.forEach(item => {
          if (item) {
            if (item.photoUrls == "string") {
              item.photoUrls = ''
            }
            this.arrayPets.push({id: item.id, name: item.name,
              photoUrls: [item.photoUrls]})
          }
        })
      })

    $(document).ready(function() {
      var p = $(".pan1");
      var d = $(".pan2");
      var r = $("#resize");

      var curr_width = p.width()
      var unlock = false;

      $(document).mousemove(function(e:any) {
        var change = curr_width + (e.clientX - curr_width);

        if(unlock) {
          if(change > 199) {
            $("#debug").text(e.clientX + " resize");
            p.css("width", change);
            d.css("margin-left", change);
          }
          else {
            p.css("width", 200);
            d.css("margin-left", 200);
          }
        }
      });

      r.mousedown(function(e:any) {
        curr_width = p.width();
        unlock = true;
        r.css("background-color", "rgba(0, 0, 0, 0.2)");
      });

      $(document).mousedown(function(e:any) {
        if(unlock) {
          e.preventDefault();
        }
      });

      $(document).mouseup(function(e:any) {
        unlock = false;
        $("#debug").text("");
        r.css("background-color", "rgba(0, 0, 0, 0.1)");
      });
    });
  }

  open(petName:string, petPhoto: string) {
    this.isOpen = true;
    this.petName = petName;
    this.petPhoto = petPhoto;
  }
}
