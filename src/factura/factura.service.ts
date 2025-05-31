import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entity/factura.entity';
import { Venta } from 'src/venta/entity/venta.entity';


@Injectable()
export class FacturaService {
    constructor(
        @InjectRepository(Factura)
        private facturaRepo: Repository<Factura>,

        @InjectRepository(Venta)
        private ventaRepo: Repository<Venta>,
    ) { }

    async create(ventaId: number, numero: string, monto_total: number) {
        const venta = await this.ventaRepo.findOneBy({ id: ventaId });
        if (!venta) throw new Error('Venta no encontrada');

        const factura = this.facturaRepo.create({ venta, numero, monto_total });
        return this.facturaRepo.save(factura);
    }

    findAll() {
        return this.facturaRepo.find({ relations: ['venta'] });
    }

    findOne(id: number) {
        return this.facturaRepo.findOne({ where: { id }, relations: ['venta'] });
    }
}
