import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Float } from '@nestjs/graphql';
import { DetalleVenta } from './entity/detalle-venta.entity';
import { DetalleVentaService } from './detalle-venta.service';
import { Venta } from './entity/venta.entity';

interface VentaReference {
    __typename: 'Venta';
    id: number;
}

@Resolver(() => DetalleVenta)
export class DetalleVentaResolver {
    constructor(private readonly detalleVentaService: DetalleVentaService) {}

    @Query(() => [DetalleVenta])
    detallesVenta() {
        return this.detalleVentaService.findAll();
    }

    @Query(() => DetalleVenta)
    detalleVenta(@Args('id', { type: () => Int }) id: number) {
        return this.detalleVentaService.findOne(id);
    }

    @Query(() => [DetalleVenta])
    detallesPorVenta(@Args('ventaId', { type: () => Int }) ventaId: number) {
        return this.detalleVentaService.findByVenta(ventaId);
    }

    @Mutation(() => DetalleVenta)
    async crearDetalleVenta(
        @Args('ventaId', { type: () => Int }) ventaId: number,
        @Args('productoId', { type: () => Int }) productoId: number,
        @Args('cantidad', { type: () => Int }) cantidad: number,
        @Args('precioUnitario', { type: () => Float }) precioUnitario: number,
    ) {
        const subtotal = cantidad * precioUnitario;
        const ventaRef: VentaReference = { __typename: 'Venta', id: ventaId };
        return this.detalleVentaService.create({
            venta: ventaRef as any,
            producto_id: productoId,
            cantidad,
            precio_unitario: precioUnitario,
            subtotal
        });
    }

    @Mutation(() => DetalleVenta)
    actualizarDetalleVenta(
        @Args('id', { type: () => Int }) id: number,
        @Args('cantidad', { type: () => Int, nullable: true }) cantidad?: number,
        @Args('precioUnitario', { type: () => Float, nullable: true }) precioUnitario?: number,
    ) {
        const updateData: any = {};
        if (cantidad !== undefined) updateData.cantidad = cantidad;
        if (precioUnitario !== undefined) updateData.precio_unitario = precioUnitario;
        if (cantidad && precioUnitario) {
            updateData.subtotal = cantidad * precioUnitario;
        }
        return this.detalleVentaService.update(id, updateData);
    }

    @Mutation(() => Boolean)
    eliminarDetalleVenta(@Args('id', { type: () => Int }) id: number) {
        return this.detalleVentaService.remove(id);
    }

    @ResolveField(() => Venta)
    venta(@Parent() detalleVenta: DetalleVenta): VentaReference {
        return { __typename: 'Venta', id: detalleVenta.venta.id };
    }
} 