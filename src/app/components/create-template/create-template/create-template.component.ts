import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileConverterService } from 'src/app/services/file-converter/file-converter.service';
import { FileConverterInterface } from 'src/app/models/file-converter-interface';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CommonStorageService } from 'src/app/services/common-storage/common-storage.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  moduleSelected: string = "";
  modelSelected: string = "";
  directionSelected: string = "exceltoxml";
  file!: File;
  fileWbpLogin!: File;
  fileJobLogin!: File;
  fileConverter!: FileConverterInterface;
  fileName: string = "";
  fileNameWbpGenerate: string = "";
  fileNameJobGenerate: string = "";
  errorMessage: string = "";
  errorMessageWbpLogin: string = "";
  errorMessageJobLogin: string = "";
  errorMessageDownload: string = "";
  convertButtonValue: string = "Convert";
  generateJobButtonValue: string = "Generate";
  generateWbpButtonValue: string = "Generate";
  fileTypeAllowed: string = ".xlsx";

  @ViewChild('fileUploader') fileUploader!: ElementRef;

  constructor(private fileConverterService: FileConverterService, private router: Router, private userService: UserService, private commonService: CommonStorageService) { }

  ngOnInit(): void {
    if (!this.userService.isUserActive) {
      this.router.navigate(["login"]);
    }
  }
  // On file Select 
  onChange(event: any) {
    this.reset();
    this.file = event.target.files[0];
  }
  onChangeWbpLogin(event: any) {
    this.fileWbpLogin = event.target.files[0];
  }
  onChangeJobLogin(event: any) {
    this.fileJobLogin = event.target.files[0];
  }

  refreshPage(): void {
    this.moduleSelected = "";
    this.modelSelected = "";
    this.directionSelected = "exceltoxml";
    this.fileName = "";
    this.fileNameWbpGenerate = "";
    this.fileNameJobGenerate = "";
    this.errorMessage = "";
    this.errorMessageDownload = "";
    this.convertButtonValue = "Convert";
    this.fileTypeAllowed = ".xlsx";
    this.fileUploader.nativeElement.value = null;
  }
  reset(): void {
    this.errorMessage = "";
    this.fileName = "";
    this.fileNameJobGenerate = "";
    this.fileNameJobGenerate = "";
    this.errorMessageDownload = "";
    this.errorMessageWbpLogin = "";
    this.errorMessageJobLogin = "";
  }

  onModuleChange(): void {
    this.modelSelected = "";
    this.fileUploader.nativeElement.value = null;
    this.reset();
  }

  onModelChange(): void {
    this.fileUploader.nativeElement.value = null;
    this.reset();
  }

  onConversionTypeChange(directionSelected: any): void {
    if (directionSelected === "xmltoexcel") {
      this.fileTypeAllowed = ".xml";
    } else if (directionSelected === "exceltoxml") {
      this.fileTypeAllowed = ".xlsx";
    }
    this.moduleSelected = "";
    this.modelSelected = "";
    this.fileUploader.nativeElement.value = null;
    this.reset();
  }

  convertFile(): void {
    if (!this.moduleSelected || !this.modelSelected || !this.directionSelected || !this.file) {
      this.commonService.openSnackBarValidation("Please fill the mandatory fields.");
    } else {
      this.reset();
      this.fileConverter = {
        moduleSelected: this.moduleSelected,
        modelSelected: this.modelSelected,
        directionSelected: this.directionSelected,
        file: this.file,
      }
      try {
        this.convertButtonValue = "Processing...";
        this.fileConverterService.covertFile(this.fileConverter).subscribe(response => {
          this.convertButtonValue = "Convert";
          if (response.fileName) {
            this.fileName = response.fileName;
          } else {
            this.commonService.openSnackBarFailure('Failed to convert the file. Please check your input file (or) retry.');
            //this.errorMessage = 'Failed to convert the file. Please check your input file (or) retry.';
          }
        });
      } catch (err) {
        this.convertButtonValue = "Convert";
        this.commonService.openSnackBarFailure('Failed to convert the file. Please check your input file (or) retry.');
        //this.errorMessage = 'Failed to convert the file. Please check your input file (or) retry.';
      }
    }
  }

  generateWbpFile(): void {
    if (!this.fileWbpLogin) {
      this.commonService.openSnackBarValidation("Please choose a file to login.");
      //alert("Please choose a file to login.");
    } else {
      this.reset();
      try {
        this.generateWbpButtonValue = "Generating...";
        this.fileConverterService.generateWbpFile(this.fileWbpLogin).subscribe(response => {
          this.generateWbpButtonValue = "Generate";
          if (response.fileName) {
            this.fileNameWbpGenerate = response.fileName;
          } else {
            this.commonService.openSnackBarFailure('Failed to generate the file. Please check your input file (or) retry.');
            //this.errorMessageWbpLogin = 'Failed to generate the file. Please check your input file (or) retry.';
          }
        });
      } catch (err) {
        this.generateWbpButtonValue = "Generate";
        this.commonService.openSnackBarFailure('Failed to generate the file. Please check your input file (or) retry.');
        //this.errorMessageWbpLogin = 'Failed to generate the file. Please check your input file (or) retry.';
      }
    }
  }

  generateJobFile(): void {
    if (!this.fileJobLogin) {
      //alert("Please choose a file to login.");
      this.commonService.openSnackBarValidation("Please choose a file to login.");
    } else {
      this.reset();
      try {
        this.generateJobButtonValue = "Generating...";
        this.fileConverterService.generateJobFile(this.fileJobLogin).subscribe(response => {
          this.generateJobButtonValue = "Generate";
          if (response.fileName) {
            this.fileNameJobGenerate = response.fileName;
          } else {
            this.commonService.openSnackBarFailure('Failed to generate the file. Please check your input file (or) retry.');
            //this.errorMessageJobLogin = 'Failed to generate the file. Please check your input file (or) retry.';
          }
        });
      } catch (err) {
        this.generateJobButtonValue = "Generate";
        this.commonService.openSnackBarFailure('Failed to generate the file. Please check your input file (or) retry.');
        //this.errorMessageJobLogin = 'Failed to generate the file. Please check your input file (or) retry.';
      }
    }
  }

  downloadFile(fileName: string): void {
    this.errorMessageDownload = "";
    if (this.fileConverterService.readBlobFileResponse()) {
      var binaryData = [];
      binaryData.push(this.fileConverterService.readBlobFileResponse());
      var url = window.URL.createObjectURL(new Blob(binaryData, { type: "application/octet-stream" }));
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', 'blank');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      this.refreshPage();
    } else {
      //this.errorMessageDownload = 'Failed to download the file. Please try again.';
      this.commonService.openSnackBarFailure('Failed to download the file. Please try again.');
    }
  }
}
