import {Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {PlateService} from './plate.service';
import {PlateDto} from './dto/plate.dto';
import {UpdatePlateDto} from './dto/update-plate.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {v4 as uuidv4} from 'uuid';
import {Plate} from "./entities/plate.entity";
import {PlateAdapter} from "../Adapter/PlateAdapter";
import * as fs from "fs";


@Controller('plate')
export class PlateController {
    constructor(private readonly plateService: PlateService,) {
    }


    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const path = `./client/uploads/`;
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                }
                return cb(null, path)
            },
            filename: (req, file, cb) => {
                cb(null, uuidv4() + '.' + file.mimetype.slice(file.mimetype.indexOf('/') + 1));
            }
        }),
    }))
    @Post()
    create(@UploadedFile() file: Express.Multer.File, @Body() plate: Plate) {


        const plateDto = PlateAdapter.toDtoWithMultiPart({...plate, photo: file?.filename});
        return this.plateService.create(plateDto);
    }

    @Get()
    findAll() {
        return this.plateService.findAll();
    }

    @Get('/plateCategories')
    async findCategories() {
        return this.plateService.findCategories();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.plateService.findOne(+id);
    }

    @Get('/restaurant/:id')
    findByRestaurant(@Param('id') id: string): Promise<PlateDto[]> {
        return this.plateService.findByRestaurant(+id);
    }

    @Get("/uploads/:filename")
    async getFile(@Param("filename") filename: string, @Res() res: any) {
        res.sendFile(filename, {root: 'client/uploads/'});
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlateDto: UpdatePlateDto) {
        return this.plateService.update(+id, updatePlateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.plateService.remove(+id);
    }
}
