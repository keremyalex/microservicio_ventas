import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entity/venta.entity';
import { VentaService } from './venta.service';
import { VentaResolver } from './venta.resolver';
import { DetalleVenta } from './entity/detalle-venta.entity';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaResolver } from './detalle-venta.resolver';
import { Cliente } from '../cliente/entity/cliente.entity';
import { ClienteModule } from '../cliente/cliente.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Venta, DetalleVenta, Cliente]),
        ClienteModule
    ],
    providers: [
        VentaService,
        VentaResolver,
        DetalleVentaService,
        DetalleVentaResolver
    ],
    exports: [VentaService, DetalleVentaService]
})
export class VentaModule { }
