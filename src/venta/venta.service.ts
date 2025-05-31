import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entity/venta.entity';
import { Cliente } from 'src/cliente/entity/cliente.entity';


@Injectable()
export class VentaService {
    constructor(
        @InjectRepository(Venta)
        private ventaRepo: Repository<Venta>,

        @InjectRepository(Cliente)
        private clienteRepo: Repository<Cliente>,
    ) { }

    async create(clienteId: number, total: number) {
        const cliente = await this.clienteRepo.findOneBy({ id: clienteId });
        if (!cliente) throw new Error('Cliente no encontrado');

        const venta = this.ventaRepo.create({ cliente, total });
        return this.ventaRepo.save(venta);
    }

    findAll() {
        return this.ventaRepo.find({ relations: ['cliente'] });
    }

    findOne(id: number) {
        return this.ventaRepo.findOne({ where: { id }, relations: ['cliente'] });
    }
}
