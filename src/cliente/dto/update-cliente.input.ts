import { CreateClienteInput } from './create-cliente.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateClienteInput extends PartialType(CreateClienteInput) {
    @Field(() => Int)
    @IsNotEmpty()
    id: number;
} 