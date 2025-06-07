import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { TipoCliente } from '../entity/tipo-cliente.enum';

@InputType()
export class CreateClienteInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    apellido: string;

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    ci: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    telefono: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    direccion: string;

    @Field(() => TipoCliente)
    @IsEnum(TipoCliente)
    @IsNotEmpty()
    tipo_cliente: TipoCliente;
} 