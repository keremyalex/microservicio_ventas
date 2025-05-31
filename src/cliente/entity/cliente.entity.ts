import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Cliente {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    nombre: string;

    @Field(() => String)
    @Column()
    apellido: string;

    @Field(() => String)
    @Column({ unique: true })
    email: string;
}
