import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ModalCloseEvent } from '../../shared/enums/modal-close-event';
import { DataGridModel } from '../../shared/models/data-table';
import { DataTableService } from '../../shared/services/data-table.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-grid-table-modal',
  templateUrl: './data-grid-table-modal.component.html',
  styleUrls: ['./data-grid-table-modal.component.css'],
})
export class DataGridTableModalComponent implements OnInit {

  @Output() modalCloseEvent:EventEmitter<ModalCloseEvent> = new EventEmitter<ModalCloseEvent>()

  tableForm = new FormGroup({
    url: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private activeModalService: NgbActiveModal,
    private dataTableService: DataTableService,
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  tableUpdateEvent(){
    this.modalCloseEvent.emit(ModalCloseEvent.CLOSE)
  }

  getAllData() {
    this.dataTableService.get().subscribe({
      next: (value: any) => {
        console.log(value);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  submitEvent() {

    if (
      !this.tableForm.value.url ||
      !this.tableForm.value.name ||
      !this.tableForm.value.description
    )  {
			return;
		}

    const dataGrid: DataGridModel = {
      url: this.tableForm.value.url,
      name: this.tableForm.value.name,
      description: this.tableForm.value.description,
    };

    this.dataTableService.add(dataGrid).subscribe({
      next: (response: any) => {
        console.log(response);
        this.modalCloseEvent.emit(ModalCloseEvent.SAVE)
        this.activeModalService.close()
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  closeEvent() {
    this.activeModalService.close();
  }
}
