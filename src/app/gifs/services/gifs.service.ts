import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'ZuzUtYQEkG3iCZDKCoMe227AhwB3NXh3';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'


  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs service Ready');
  }

  get getTagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory.length > 0) this.searchTag(this._tagsHistory[0]);
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  searchTag( tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params: params})
    .subscribe( resp => {

      this.gifsList = resp.data;
      // console.log(resp.data);
      // console.log({gifs: this.gifsList});
    })
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=ZuzUtYQEkG3iCZDKCoMe227AhwB3NXh3&q=valorant&limit=10')
    // .then( resp => resp.json())
    // .then(data => console.log(data));
  }

}
