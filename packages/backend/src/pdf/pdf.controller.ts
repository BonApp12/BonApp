import {Controller, Get, Param, Res} from '@nestjs/common';
import {PdfService} from "./pdf.service";

@Controller('pdf')
export class PdfController {
    constructor(private readonly pdfService: PdfService) {}

    @Get(':id')
    async pdf(@Param('id') id: string, @Res() res: any) {
        const pdf = await this.pdfService.generatePDFToStream('html.html',+id);
        res.setHeader('Content-Type', 'application/pdf');
        pdf.file.pipe(res);
    }
}