import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entity/venta.entity';
import { Cliente } from '../cliente/entity/cliente.entity';
import { EstadoVenta, MetodoPago } from './entity/venta.entity';

@Injectable()
export class VentaService {
    constructor(
        @InjectRepository(Venta)
        private readonly ventaRepo: Repository<Venta>,

        @InjectRepository(Cliente)
        private readonly clienteRepo: Repository<Cliente>,
    ) { }

    async create(clienteId: number, vendedorId: string, total: number, estado: EstadoVenta = EstadoVenta.PENDIENTE, metodoPago: MetodoPago): Promise<Venta> {
        const cliente = await this.clienteRepo.findOneBy({ id: clienteId });
        if (!cliente) {
            throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
        }

        const venta = this.ventaRepo.create({ 
            cliente, 
            vendedor_id: vendedorId,
            total,
            estado,
            metodo_pago: metodoPago,
            fecha: new Date()
        });
        return this.ventaRepo.save(venta);
    }

    async findAll(): Promise<Venta[]> {
        return this.ventaRepo.find({ 
            relations: ['cliente', 'detalles'] 
        });
    }

    async findOne(id: number): Promise<Venta> {
        const venta = await this.ventaRepo.findOne({ 
            where: { id }, 
            relations: ['cliente', 'detalles'] 
        });
        
        if (!venta) {
            throw new NotFoundException(`Venta con ID ${id} no encontrada`);
        }
        
        return venta;
    }

    async update(id: number, updateData: Partial<Venta>): Promise<Venta> {
        await this.ventaRepo.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.ventaRepo.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
