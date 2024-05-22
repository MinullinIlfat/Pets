import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PetsType} from "../../../types/pets.type";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http: HttpClient) {

  }

  getPets(): Observable<PetsType[]> {
    return this.http.get<PetsType[]>(environment.api + '/pet/findByStatus?status=available,sold,pending')
  }
}
