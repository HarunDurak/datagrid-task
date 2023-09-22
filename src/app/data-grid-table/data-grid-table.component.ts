import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataGridTableModalComponent } from './data-grid-table-modal/data-grid-table-modal.component';
import { DataTableService } from 'src/app/shared/services/data-table.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalCloseEvent } from '../shared/enums/modal-close-event';

@Component({
  selector: 'app-data-grid-table',
  templateUrl: './data-grid-table.component.html',
  styleUrls: ['./data-grid-table.component.css'],
})
export class DataGridTableComponent implements OnInit {
  btnText: string = 'Yeni Hesap Ekle';
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  data: any[] = [];
  dtOptions: ADTSettings = {
    ordering: false,
    responsive:true,
    data: [],
    columns: [
      {
        title: 'Sosyal Medya Linki',
        data: 'url',
      },
      {
        title: 'Sosyal Medya Adı',
        data: 'name',
      },
      {
        title: 'Açıklama',
        data: 'description',
      },
    ],
  };
  constructor(
    private modalService: NgbModal,
    private dataTableService: DataTableService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataTableService.get().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dtOptions.data = response.reverse();
        this.rerender();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openModel() {
    const modalRef = this.modalService.open(DataGridTableModalComponent, {
      size: 'l',
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.modalCloseEvent.subscribe(
      (event: ModalCloseEvent) => {
        if (event === ModalCloseEvent.SAVE) {
          this.getData();
          console.log( event);
        }
      }
    );
  }

  rerender(): void {
    if (!this.dtElement.dtInstance) {
      this.dtTrigger.next();
      return;
    }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
