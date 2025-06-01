import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export class TranslationLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  getTranslation(lang: string): Observable<any> {
    const baseHref = this.document.getElementsByTagName('base')[0]?.getAttribute('href') || '/';
    return this.http.get(`${baseHref}assets/i18n/${lang}.json`);
  }
}

export function createTranslationLoader(http: HttpClient, document: Document) {
  return new TranslationLoader(http, document);
}
