import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Cliente } from 'src/cliente/entity/cliente.entity';


@ObjectType()
@Entity()
export class Venta {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

    @Field()
    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'cliente_id' })
    @Field(() => Cliente)
    cliente: Cliente;
}
