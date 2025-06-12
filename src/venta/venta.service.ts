import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Venta } from './entity/venta.entity';
import { Cliente } from '../cliente/entity/cliente.entity';
import { EstadoVenta, MetodoPago } from './entity/venta.entity';
import { DetalleVenta } from './entity/detalle-venta.entity';
import { ProductoMasVendido, FiltroFechaInput, TipoFiltroFecha } from './dto/producto-mas-vendido.dto';

@Injectable()
export class VentaService {
    constructor(
        @InjectRepository(Venta)
        private readonly ventaRepo: Repository<Venta>,

        @InjectRepository(Cliente)
        private readonly clienteRepo: Repository<Cliente>,

        @InjectRepository(DetalleVenta)
        private readonly detalleVentaRepo: Repository<DetalleVenta>,
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

    private getDateRange(filtro: FiltroFechaInput): { inicio: Date; fin: Date } {
        const hoy = new Date();
        const inicio = new Date();
        const fin = new Date();

        switch (filtro.tipo) {
            case TipoFiltroFecha.HOY:
                inicio.setHours(0, 0, 0, 0);
                fin.setHours(23, 59, 59, 999);
                break;
            case TipoFiltroFecha.ULTIMOS_7_DIAS:
                inicio.setDate(hoy.getDate() - 7);
                inicio.setHours(0, 0, 0, 0);
                fin.setHours(23, 59, 59, 999);
                break;
            case TipoFiltroFecha.ULTIMOS_30_DIAS:
                inicio.setDate(hoy.getDate() - 30);
                inicio.setHours(0, 0, 0, 0);
                fin.setHours(23, 59, 59, 999);
                break;
            case TipoFiltroFecha.ESTE_MES:
                inicio.setDate(1);
                inicio.setHours(0, 0, 0, 0);
                fin.setMonth(fin.getMonth() + 1);
                fin.setDate(0);
                fin.setHours(23, 59, 59, 999);
                break;
            case TipoFiltroFecha.ESTE_ANIO:
                inicio.setMonth(0, 1);
                inicio.setHours(0, 0, 0, 0);
                fin.setMonth(11, 31);
                fin.setHours(23, 59, 59, 999);
                break;
            case TipoFiltroFecha.RANGO:
                if (!filtro.fecha_inicio || !filtro.fecha_fin) {
                    throw new Error('Para el tipo RANGO, se requieren fecha_inicio y fecha_fin');
                }
                inicio.setTime(new Date(filtro.fecha_inicio).getTime());
                fin.setTime(new Date(filtro.fecha_fin).getTime());
                inicio.setHours(0, 0, 0, 0);
                fin.setHours(23, 59, 59, 999);
                break;
            default:
                throw new Error('Tipo de filtro de fecha no válido');
        }

        return { inicio, fin };
    }

    async getProductosMasVendidos(
        filtro: FiltroFechaInput,
        limite: number = 5
    ): Promise<ProductoMasVendido[]> {
        const { inicio, fin } = this.getDateRange(filtro);

        const ventas = await this.ventaRepo.find({
            where: {
                fecha: Between(inicio, fin),
                estado: EstadoVenta.COMPLETADA
            },
            relations: ['detalles']
        });

        // Agrupar y contar productos
        const productosMap = new Map<number, ProductoMasVendido>();

        ventas.forEach(venta => {
            venta.detalles.forEach(detalle => {
                const productoId = detalle.producto_id;
                const existente = productosMap.get(productoId) || {
                    producto_id: productoId,
                    cantidad_total: 0,
                    monto_total: 0,
                    numero_ventas: 0
                };

                existente.cantidad_total += detalle.cantidad;
                // Asegurarnos de que los valores sean números
                existente.monto_total = Number(existente.monto_total) + Number(detalle.subtotal);
                existente.numero_ventas += 1;

                productosMap.set(productoId, existente);
            });
        });

        // Convertir a array y ordenar
        const productos = Array.from(productosMap.values())
            .sort((a, b) => b.cantidad_total - a.cantidad_total)
            .slice(0, limite);

        // Asegurarnos de que los montos sean números válidos
        return productos.map(producto => ({
            ...producto,
            monto_total: Number(producto.monto_total.toFixed(2))
        }));
    }
}
