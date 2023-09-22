import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'bootstrap-modal',
	templateUrl: './bootstrap-modal.component.html',
	styleUrls: ['./bootstrap-modal.component.scss']
})
export class BootstrapModalComponent implements OnInit {

	@Input() button1Text: string = "Kaydet"
	@Input() button2Text: string = "Vazgeç";
	@Output() closeEventEmit: EventEmitter<any> = new EventEmitter<any>();
	@Output() submitEventEmit: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
	}

	ngOnInit(): void {
	}

	submitEvent() {
		this.submitEventEmit.emit('submit button clicked')
	}

	closeEvent() {
		this.closeEventEmit.emit('close button clicked')
	}

}

