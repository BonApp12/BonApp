import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleDto {
    @IsString()
    @IsNotEmpty()
    token: string;
}

export default GoogleDto;