import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class PdfmakeService {

  stylePadrao: any = {
    contentSmallCenter: {
      fontSize: 8,
      alignment: 'center'
    },
    thCenter: {
      fontSize: 8,
      bold: 'true',
      alignment: 'center',
      fillColor: '#C9C9C9'
    },
    th: {
      fontSize: 10,
      bold: true,
      alignment: 'left',
      fillColor: '#C9C9C9'
    },
    underHeader: {
      fontSize: 11,
      alignment: 'center',
      color: '#000'
    },
    boxExp: {
      fontSize: 10,
      alignment: 'justify'
    },
    assinaText: {
      fontSize: 9,
      alignment: 'center',
      color: '#000'
    },
    descText: {
      alignment: 'justify',
      fontSize: 8,
      color: '#000'
    },
    header: {
      fontSize: 26,
      bold: true,
      alignment: 'center',
      color: '#000'
    },
    headerAlter: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
      color: '#000'
    },
    header2: {
      fontSize: 12,
      bold: 'true',
      alignment: 'center',
      color: '#000'
    },
    subHeader: {
      fontSize: 11,
      bold: 'true',
      alignment: 'center',
      color: '#000',
      fillColor: '#C9C9C9'
    },
    label: {
      fontSize: 9,
      bold: 'true',
      alignment: 'left',
      color: '#000'
    },
    content: {
      fontSize: 9.5,
      alignment: 'center'
    },
    contentAlter: {
      fontSize: 10,
      alignment: 'left'
    },
    content2: {
      fontSize: 9,
      italic: true,
      alignment: 'left'
    },
    negrito: {
      bold: true
    },
    textMarging: {
      alignment: 'justify',
      fontSize: 8.5,
      margin: [40, 0, 0, 0]
    }
  };

  relatorioImprimir = {
    content: [],
    footer: {},
    styles: this.stylePadrao,
    pageSize: 'A4',
    pageMargins: [20, 20, 20, 20],
    pageOrientation: 'portrait',
    defaultStyle: {
    }
  };

  constructor() { }

  gerarPdf(relatorio, orientation = 'portrait') {
    this.relatorioImprimir.content = relatorio;
    this.relatorioImprimir.pageOrientation = orientation;
    pdfMake.createPdf(this.relatorioImprimir).open();
  }

}
