import { Module } from '@nestjs/common';
import { VentaResolver } from './venta.resolver';
import { VentaService } from './venta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entity/venta.entity';
import { Cliente } from 'src/cliente/entity/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, Cliente])],
  providers: [VentaResolver, VentaService]
})
export class VentaModule {}
