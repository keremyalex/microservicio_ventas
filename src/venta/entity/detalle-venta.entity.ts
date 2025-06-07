import { Field, ID, ObjectType, Int, Float, Directive } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from './venta.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
class Producto {
    @Field(() => ID)
    @Directive('@external')
    id: number;
}

@ObjectType()
@Directive('@key(fields: "id")')
@Entity()
export class DetalleVenta {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Venta, venta => venta.detalles)
    @JoinColumn({ name: 'venta_id' })
    @Field(() => Venta)
    venta: Venta;

    @Field(() => Int)
    @Column()
    producto_id: number;

    @Field(() => Int)
    @Column()
    cantidad: number;

    @Field(() => Float)
    @Column('decimal', { precision: 10, scale: 2 })
    precio_unitario: number;

    @Field(() => Float)
    @Column('decimal', { precision: 10, scale: 2 })
    subtotal: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    notas: string;

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

    @Field(() => Producto)
    // @Directive('@requires(fields: "producto_id")')
    producto?: Producto;
} 