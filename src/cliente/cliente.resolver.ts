import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { Cliente } from './entity/cliente.entity';
import { ClienteService } from './cliente.service';
import { CreateClienteInput } from './dto/create-cliente.input';
import { UpdateClienteInput } from './dto/update-cliente.input';

@Resolver(() => Cliente)
export class ClienteResolver {
    constructor(private readonly clienteService: ClienteService) { }

    @ResolveReference()
    resolveReference(reference: { __typename: string; id: number }) {
        return this.clienteService.findOne(reference.id);
    }

    @Query(() => [Cliente])
    clientes() {
        return this.clienteService.findAll();
    }

    @Query(() => Cliente)
    cliente(@Args('id', { type: () => Int }) id: number) {
        return this.clienteService.findOne(id);
    }

    @Mutation(() => Cliente)
    crearCliente(
        @Args('createClienteInput') createClienteInput: CreateClienteInput
    ) {
        return this.clienteService.create(createClienteInput);
    }

    @Mutation(() => Cliente)
    async actualizarCliente(
        @Args('updateClienteInput') updateClienteInput: UpdateClienteInput
    ): Promise<Cliente> {
        await this.clienteService.update(updateClienteInput.id, updateClienteInput);
        const updatedCliente = await this.clienteService.findOne(updateClienteInput.id);
        if (!updatedCliente) {
            throw new Error('Cliente no encontrado');
        }
        return updatedCliente;
    }

    @Mutation(() => Boolean)
    async eliminarCliente(@Args('id') id: number): Promise<boolean> {
        const result = await this.clienteService.remove(id);
        return !!result && !!result.affected && result.affected > 0;
    }
}
