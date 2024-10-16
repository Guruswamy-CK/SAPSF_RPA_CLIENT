import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonStorageService } from '../common-storage/common-storage.service';
import { FileConverterInterface } from 'src/app/models/file-converter-interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileConverterService {
  blobFileResponse: any;
  constructor(private commonStorageService: CommonStorageService, private httpClient: HttpClient) { }
 public generateWbpFile(fileLogin: File): Observable<any> {
    // Create form data 
    const formData = new FormData();
    // Store form name as "file" with file data 
    formData.append("file", fileLogin);
    return this.httpClient.post(this.commonStorageService.baseUrl + '/api/wbp-file-generate', formData, { responseType: 'blob' }).pipe(map((response) => {
      this.storeBlobFileResponse(response);
      return {
        fileName: "RBP_Workbook.xlsx"
      };
    }));
  }
  public generateJobFile(fileLogin: File): Observable<any> {
    // Create form data 
    const formData = new FormData();
    // Store form name as "file" with file data 
    formData.append("file", fileLogin);
    return this.httpClient.post(this.commonStorageService.baseUrl + '/api/job-file-generate', formData, { responseType: 'blob' }).pipe(map((response) => {
      this.storeBlobFileResponse(response);
      return {
        fileName: "Job_Workbook.xlsx"
      };
    }));
  }
  public covertFile(fileConverter: FileConverterInterface): Observable<any> {
    // Create form data 
    const formData = new FormData();
    // Store form name as "file" with file data 
    formData.append("file", fileConverter.file);
    formData.append('moduleSelected', fileConverter.moduleSelected);
    formData.append('modelSelected', fileConverter.modelSelected);
    formData.append('directionSelected', fileConverter.directionSelected);
    return this.httpClient.post(this.commonStorageService.baseUrl + '/api/file-convert', formData, { responseType: 'blob' }).pipe(map((response) => {
      this.storeBlobFileResponse(response);
      return {
        fileName: this.makeFileName(fileConverter.file)
      };
    }));
  }
  makeFileName(file: File): string {
    if (file.name && file.name.endsWith(".xlsx")) {
      return file.name.replace(".xlsx", ".xml");
    } else if (file.name && file.name.endsWith(".xml")) {
      return file.name.replace(".xml", ".xlsx");
    }
    return "";
  }
  storeBlobFileResponse(response: any) {
    this.blobFileResponse = response;
  }
  readBlobFileResponse() {
    return this.blobFileResponse;
  }
}
