import { registerEnumType } from '@nestjs/graphql';

export enum TipoCliente {
    PARTICULAR = 'PARTICULAR',
    EMPRESA = 'EMPRESA'
}

registerEnumType(TipoCliente, {
    name: 'TipoCliente',
    description: 'Los tipos de cliente disponibles',
}); 