import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import {join} from "path";
import {OrdersService} from "../orders/orders.service";
import {orderVariable} from "./order.variable";
import {HttpService} from "@nestjs/axios";
import {OrderPlateService} from "../order-plate/order-plate.service";

@Injectable()
export class PdfService {
    constructor(private orderService: OrdersService,private readonly httpService: HttpService, private orderPlateService: OrderPlateService) {}

    async generatePDFToStream(template: string, orderId: number): Promise<any>{
        const order = await this.orderService.findOne(orderId);
        if(order.status === 'completed'){
            const html = this.createHtml(template, order);
            const pdf = await this.httpService.axiosRef.post('http://192.168.0.45:8080',{"content":html,"options":{ "pageSize": "letter" }},{
                "headers": {
                    "Content-Type": "application/json"
                },
                responseType: "stream"
            });
            //create file inside directory
            // pdf.data.pipe(fs.createWriteStream(join(__dirname,'/'+fileNamePdf)));
            const fileNamePdf = `BON-${order.id}-INVOICE.pdf`;
            return {file: pdf.data, fileName: fileNamePdf};
        }
    }

    private createHtml(template: string, order) {
        const getOrderFormated = orderVariable(order);
        let html = fs.readFileSync(join(__dirname,'templates/'+template), 'utf8');
        let plates = '';
        let total = 0;
        Object.keys(getOrderFormated).forEach(key => {
            if(key === 'plates'){
                getOrderFormated[key].forEach(plate => {
                    plates += `
                        <tr>
                            <td valign='top' style='font-size:12px;'>${plate.name}</td>
                            <td valign='top' style='font-size:12px;'>${(plate.type.toLowerCase()).charAt(0).toUpperCase() + (plate.type.toLowerCase()).slice(1)}</td>
                            <td valign='top' style='font-size:12px;'>${plate.quantity}</td>
                            <td valign='top' style='font-size:12px;'>${plate.price.toFixed(2)}</td>
                            <td valign='top' style='font-size:12px;'>${(plate.price * plate.quantity).toFixed(2)}</td>
                        </tr>`;
                    total += plate.price * plate.quantity;
                });
                getOrderFormated[key] = plates;
            }
            html = html.replace(`{{${key}}}`, getOrderFormated[key]);
        });
        html = html.replace(`{{total}}`, total.toFixed(2));
        return html;
    }
}