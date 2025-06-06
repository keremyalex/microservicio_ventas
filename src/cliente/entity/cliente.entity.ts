import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
