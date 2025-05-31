import { Module } from '@nestjs/common';
import { ClienteResolver } from './cliente.resolver';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entity/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClienteResolver, ClienteService]
})
export class ClienteModule {}
