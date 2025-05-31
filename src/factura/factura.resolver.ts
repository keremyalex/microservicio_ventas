import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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
        @Args('numero') numero: string,
        @Args('monto_total') monto_total: number,
    ) {
        return this.facturaService.create(ventaId, numero, monto_total);
    }
}
