import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CommonStorageService } from './services/common-storage/common-storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	title: string = 'sap-sf-rpa-client';

	constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private commonStorageService: CommonStorageService) {
		const origin = this.document.location.origin;
		this.commonStorageService.baseUrl = origin;
	}
	ngOnInit(): void {
		let urlRefreshed = this.document.location.hash.substring(2, this.document.location.hash.length);
		if (urlRefreshed) {
			this.router.navigate([urlRefreshed]);
		} else {
			this.router.navigate(['login']);
		}

	}
}
