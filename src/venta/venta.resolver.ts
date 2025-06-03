import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Float } from '@nestjs/graphql';
import { Venta } from './entity/venta.entity';
import { VentaService } from './venta.service';

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
        @Args('vendedorId', { type: () => Int }) vendedorId: number,
        @Args('total', { type: () => Float }) total: number,
    ) {
        return this.ventaService.create(clienteId, vendedorId, total);
    }
}
