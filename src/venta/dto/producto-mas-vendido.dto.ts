import { Field, ID, ObjectType, Int, Float, InputType, registerEnumType } from '@nestjs/graphql';

export enum TipoFiltroFecha {
    HOY = 'HOY',
    ULTIMOS_7_DIAS = 'ULTIMOS_7_DIAS',
    ULTIMOS_30_DIAS = 'ULTIMOS_30_DIAS',
    ESTE_MES = 'ESTE_MES',
    ESTE_ANIO = 'ESTE_ANIO',
    RANGO = 'RANGO'
}

registerEnumType(TipoFiltroFecha, {
    name: 'TipoFiltroFecha',
    description: 'Tipos de filtro de fecha disponibles para productos más vendidos'
});

@ObjectType()
export class ProductoMasVendido {
    @Field(() => ID)
    producto_id: number;

    @Field(() => String, { nullable: true })
    nombre_producto?: string;

    @Field(() => Int)
    cantidad_total: number;

    @Field(() => Float)
    monto_total: number;

    @Field(() => Int)
    numero_ventas: number;
}

@InputType()
export class FiltroFechaInput {
    @Field(() => TipoFiltroFecha)
    tipo: TipoFiltroFecha;

    @Field(() => String, { nullable: true })
    fecha_inicio?: string;

    @Field(() => String, { nullable: true })
    fecha_fin?: string;
} 