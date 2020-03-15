import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  public apiUrl = "http://localhost:8080/api/busca"

  constructor(private http: HttpClient) { }

public continuosTypingBusca(busca: string) {
  const params = new HttpParams()
  .set('termo', busca)
  return this.http.get(`${this.apiUrl}?${params}`)
}
}