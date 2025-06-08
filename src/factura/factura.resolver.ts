import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { Factura } from './entity/factura.entity';
import { FacturaService } from './factura.service';

@Resolver(() => Factura)
export class FacturaResolver {
    constructor(private readonly facturaService: FacturaService) { }

    @Query(() => [Factura])
    facturas() {
        return this.facturaService.findAll();
    }

    @Query(() => Factura)
    factura(@Args('id', { type: () => Int }) id: number) {
        return this.facturaService.findOne(id);
    }

    @Mutation(() => Factura)
    crearFactura(
        @Args('ventaId', { type: () => Int }) ventaId: number,
        @Args('monto_total', { type: () => Float }) monto_total: number,
    ) {
        return this.facturaService.create(ventaId, monto_total);
    }
}
