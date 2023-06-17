import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelLearningService {

  public url = "http://127.0.0.1:8000/prediction"
  public url_oit = "https://api.thingspeak.com/channels/2178077/feeds.json?api_key=VF8OOFLGD1195UIF&results=1"
  constructor(private http: HttpClient) { }

  getEarning(): Observable<any> {
    return this.http.get(this.url)
  }


  get_Last_Mesure(): Observable<any> {
    return this.http.get(this.url_oit)
  }
}
