import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Float } from '@nestjs/graphql';
import { Venta, EstadoVenta, MetodoPago } from './entity/venta.entity';
import { VentaService } from './venta.service';
import { DetalleVenta } from './entity/detalle-venta.entity';
import { ProductoMasVendido, FiltroFechaInput } from './dto/producto-mas-vendido.dto';

@Resolver(() => Venta)
export class VentaResolver {
    constructor(private readonly ventaService: VentaService) { }

    @Query(() => [Venta])
    ventas() {
        return this.ventaService.findAll();
    }

    @Query(() => Venta)
    venta(@Args('id', { type: () => Int }) id: number) {
        return this.ventaService.findOne(id);
    }

    @Mutation(() => Venta)
    crearVenta(
        @Args('clienteId', { type: () => Int }) clienteId: number,
        @Args('vendedorId', { type: () => String }) vendedorId: string,
        @Args('total', { type: () => Float }) total: number,
        @Args('metodoPago', { type: () => MetodoPago }) metodoPago: MetodoPago,
        @Args('estado', { type: () => EstadoVenta, nullable: true }) estado?: EstadoVenta,
    ) {
        return this.ventaService.create(clienteId, vendedorId, total, estado, metodoPago);
    }

    @Mutation(() => Venta)
    actualizarVenta(
        @Args('id', { type: () => Int }) id: number,
        @Args('estado', { type: () => EstadoVenta, nullable: true }) estado?: EstadoVenta,
        @Args('metodoPago', { type: () => MetodoPago, nullable: true }) metodoPago?: MetodoPago,
    ) {
        return this.ventaService.update(id, { estado, metodo_pago: metodoPago });
    }

    @ResolveField(() => [DetalleVenta])
    async detalles(@Parent() venta: Venta) {
        return venta.detalles;
    }

    @Query(() => [ProductoMasVendido])
    async productosMasVendidos(
        @Args('filtro', { type: () => FiltroFechaInput }) filtro: FiltroFechaInput,
        @Args('limite', { type: () => Int, nullable: true, defaultValue: 5 }) limite?: number
    ) {
        return this.ventaService.getProductosMasVendidos(filtro, limite);
    }
}
