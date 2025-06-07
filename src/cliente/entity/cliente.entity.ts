import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { TipoCliente } from './tipo-cliente.enum';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity()
export class Cliente {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    nombre: string;

    @Field()
    @Column()
    apellido: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    ci: string;

    @Field()
    @Column()
    telefono: string;

    @Field()
    @Column()
    direccion: string;

    @Field(() => TipoCliente)
    @Column({
        type: 'enum',
        enum: TipoCliente,
        default: TipoCliente.PARTICULAR
    })
    tipo_cliente: TipoCliente;

    @Field()
    @CreateDateColumn()
    fecha_registro: Date;
}
