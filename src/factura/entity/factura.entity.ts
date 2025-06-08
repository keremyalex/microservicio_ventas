import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Venta } from 'src/venta/entity/venta.entity';

@ObjectType()
@Entity()
export class Factura {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    numero: string;

    @Column({ type: 'int', default: 0 })
    secuencial: number;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

    @Field()
    @Column('decimal', { precision: 10, scale: 2 })
    monto_total: number;

    @ManyToOne(() => Venta)
    @JoinColumn({ name: 'venta_id' })
    @Field(() => Venta)
    venta: Venta;
}
