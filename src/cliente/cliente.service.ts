import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entity/cliente.entity';
import { CreateClienteInput } from './dto/create-cliente.input';
import { UpdateClienteInput } from './dto/update-cliente.input';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepo: Repository<Cliente>,
    ) { }

    create(createClienteInput: CreateClienteInput) {
        const cliente = this.clienteRepo.create(createClienteInput);
        return this.clienteRepo.save(cliente);
    }

    findAll() {
        return this.clienteRepo.find();
    }

    findOne(id: number) {
        return this.clienteRepo.findOneBy({ id });
    }

    update(id: number, updateClienteInput: UpdateClienteInput) {
        const { id: _, ...data } = updateClienteInput;
        return this.clienteRepo.update(id, data);
    }

    remove(id: number) {
        return this.clienteRepo.delete(id);
    }
}
