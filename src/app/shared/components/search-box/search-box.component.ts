import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Option } from '../../information/interfaces/option.type';
import {  of } from 'rxjs';
import { debounceTime, map, tap, } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformationTableService } from '../../information/information-table.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete/autocomplete.interface';


@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter

  public myForm: FormGroup = this.fb.group({
    text: ['', [ Validators.required, Validators.minLength(3) ] ],
  });

  public filteredOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private getInf: InformationTableService,
  ){}

  public search(): void {
    of(this.myForm.value).pipe(
      map( ({ text }) => text ),
      tap( console.log )
    ).subscribe( {next : value => this.onValue.emit(value) ,
    error: error => console.warn('error:', error ),
    complete: () => console.info('completado')} )
    this.myForm.reset()
  }

  public filter(event: AutoCompleteCompleteEvent) {
    this.filteredOptions = this.getInf.filterSellers( event.query , true )
    console.log(this.filteredOptions)
  }


};

