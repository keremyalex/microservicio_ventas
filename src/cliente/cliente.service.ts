import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entity/cliente.entity';


@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepo: Repository<Cliente>,
    ) { }

    create(data: Partial<Cliente>) {
        const cliente = this.clienteRepo.create(data);
        return this.clienteRepo.save(cliente);
    }

    findAll() {
        return this.clienteRepo.find();
    }

    findOne(id: number) {
        return this.clienteRepo.findOneBy({ id });
    }

    update(id: number, data: Partial<Cliente>) {
        return this.clienteRepo.update(id, data);
    }

    remove(id: number) {
        return this.clienteRepo.delete(id);
    }
}
