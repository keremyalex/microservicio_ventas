import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleVenta } from './entity/detalle-venta.entity';

@Injectable()
export class DetalleVentaService {
    constructor(
        @InjectRepository(DetalleVenta)
        private readonly detalleVentaRepository: Repository<DetalleVenta>,
    ) {}

    async create(createDetalleVentaInput: Partial<DetalleVenta>): Promise<DetalleVenta> {
        const detalleVenta = this.detalleVentaRepository.create(createDetalleVentaInput);
        return await this.detalleVentaRepository.save(detalleVenta);
    }

    async findAll(): Promise<DetalleVenta[]> {
        return await this.detalleVentaRepository.find({
            relations: ['venta']
        });
    }

    async findOne(id: number): Promise<DetalleVenta | null> {
        const detalle = await this.detalleVentaRepository.findOne({
            where: { id },
            relations: ['venta']
        });
        if (!detalle) {
            throw new Error(`DetalleVenta con ID ${id} no encontrado`);
        }
        return detalle;
    }

    async findByVenta(ventaId: number): Promise<DetalleVenta[]> {
        return await this.detalleVentaRepository.find({
            where: { venta: { id: ventaId } },
            relations: ['venta']
        });
    }

    async update(id: number, updateDetalleVentaInput: Partial<DetalleVenta>): Promise<DetalleVenta> {
        await this.detalleVentaRepository.update(id, updateDetalleVentaInput);
        const updated = await this.findOne(id);
        if (!updated) {
            throw new Error(`DetalleVenta con ID ${id} no encontrado`);
        }
        return updated;
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.detalleVentaRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
} 