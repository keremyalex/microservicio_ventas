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

    private async generateNumeroFactura(): Promise<{ numero: string; secuencial: number }> {
        // Obtener el último secuencial
        const lastFactura = await this.facturaRepo
            .createQueryBuilder('factura')
            .orderBy('factura.secuencial', 'DESC')
            .getOne();

        // Incrementar el secuencial
        const secuencial = lastFactura ? lastFactura.secuencial + 1 : 1;
        
        // Generar el número de factura con formato FAC-XXXXXX
        const numero = `FAC-${secuencial.toString().padStart(6, '0')}`;

        return { numero, secuencial };
    }

    async create(ventaId: number, monto_total: number) {
        const venta = await this.ventaRepo.findOneBy({ id: ventaId });
        if (!venta) throw new Error('Venta no encontrada');

        // Generar el número de factura
        const { numero, secuencial } = await this.generateNumeroFactura();

        const factura = this.facturaRepo.create({ 
            venta, 
            monto_total,
            numero,
            secuencial
        });
        
        return this.facturaRepo.save(factura);
    }

    findAll() {
        return this.facturaRepo.find({ relations: ['venta'] });
    }

    findOne(id: number) {
        return this.facturaRepo.findOne({ where: { id }, relations: ['venta'] });
    }
}
