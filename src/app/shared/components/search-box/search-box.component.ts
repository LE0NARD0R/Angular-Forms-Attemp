import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Option } from '../../information/interfaces/option.type';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformationTableService } from '../../information/information-table.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete/autocomplete.interface';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();

  private debouncerSubscription?: Subscription;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  public myForm: FormGroup = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(3)]],
  });

  public filteredOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private getInf: InformationTableService
  ) {}

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.onValue.emit(value);
      });
  }

  public search(): void {
    const searchTerm = this.myForm.value.text;
    this.debouncer.next(searchTerm);
  }
}
