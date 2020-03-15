import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { WikiService} from '../service/wiki.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public form: FormGroup;
  public resultados:any;
  public busca: String;
  constructor(public wikiService : WikiService, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      busca: ['']
    });

   }
  ngOnInit(): void {
    this.form.get('busca').valueChanges
    .subscribe((queryField) => {
      if (queryField !== undefined && queryField !== '' && queryField !== null) {
        this.wikiService.continuosTypingBusca(queryField).subscribe((response) => {
          this.resultados = response
          console.log(this.resultados)
        })
      }
    })
  }

  clear(){
    this.form.reset()
    this.resultados = []
  }
}
