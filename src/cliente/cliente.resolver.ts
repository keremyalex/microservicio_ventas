import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Cliente } from './entity/cliente.entity';
import { ClienteService } from './cliente.service';

@Resolver(() => Cliente)
export class ClienteResolver {
    constructor(private readonly clienteService: ClienteService) { }

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
        @Args('nombre') nombre: string,
        @Args('apellido') apellido: string,
        @Args('email') email: string,
    ) {
        return this.clienteService.create({ nombre, apellido, email });
    }

    @Mutation(() => Cliente)
    async actualizarCliente(
        @Args('id') id: number,
        @Args('nombre', { nullable: true }) nombre: string,
        @Args('apellido', { nullable: true }) apellido: string,
        @Args('email', { nullable: true }) email: string,
    ): Promise<Cliente> {
        await this.clienteService.update(id, { nombre, apellido, email });
        const updatedCliente = await this.clienteService.findOne(id);
        if (!updatedCliente) {
            throw new Error('Cliente no encontrado');
        }
        return updatedCliente; // retornamos el cliente actualizado
    }

    @Mutation(() => Boolean)
    async eliminarCliente(@Args('id') id: number): Promise<boolean> {
        const result = await this.clienteService.remove(id);
        return !!result && !!result.affected && result.affected > 0;
    }
}
