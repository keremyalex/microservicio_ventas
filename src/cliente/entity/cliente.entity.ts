import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Directive } from '@nestjs/graphql';

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
}
