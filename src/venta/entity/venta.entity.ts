import { Field, ID, ObjectType, Int, registerEnumType, Directive } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entity/cliente.entity';
import { DetalleVenta } from './detalle-venta.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
class Vendedor {
    @Field(() => ID)
    @Directive('@external')
    id: string;
}

export enum EstadoVenta {
    PENDIENTE = 'PENDIENTE',
    COMPLETADA = 'COMPLETADA',
    CANCELADA = 'CANCELADA'
}

export enum MetodoPago {
    EFECTIVO = 'EFECTIVO',
    TARJETA = 'TARJETA',
    TRANSFERENCIA = 'TRANSFERENCIA'
}

registerEnumType(EstadoVenta, {
    name: 'EstadoVenta',
});

registerEnumType(MetodoPago, {
    name: 'MetodoPago',
});

@ObjectType()
@Directive('@key(fields: "id")')
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

    @Field(() => String)
    @Column()
    vendedor_id: string;

    @Field(() => EstadoVenta)
    @Column({
        type: 'enum',
        enum: EstadoVenta,
        default: EstadoVenta.PENDIENTE
    })
    estado: EstadoVenta;

    @Field(() => MetodoPago)
    @Column({
        type: 'enum',
        enum: MetodoPago
    })
    metodo_pago: MetodoPago;

    @OneToMany(() => DetalleVenta, detalle => detalle.venta, { eager: true })
    @Field(() => [DetalleVenta])
    detalles: DetalleVenta[];

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    created_by: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    updated_by: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    notas: string;

    @Field(() => Vendedor, { nullable: true })
    vendedor?: Vendedor;
}
