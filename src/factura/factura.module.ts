import { Module } from '@nestjs/common';
import { FacturaResolver } from './factura.resolver';
import { FacturaService } from './factura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entity/factura.entity';
import { Venta } from 'src/venta/entity/venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, Venta])],
  providers: [FacturaResolver, FacturaService]
})
export class FacturaModule {}
