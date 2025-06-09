# Microservicio de Ventas

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

Microservicio de Ventas desarrollado con [NestJS](https://github.com/nestjs/nest) framework, utilizando TypeScript y Docker para su despliegue y ejecución. Este microservicio maneja todo el proceso de ventas, incluyendo la gestión de ventas, detalles de venta y facturación.

## Características Principales

- **Gestión de Ventas**
  - Creación y seguimiento de ventas
  - Estados de venta (Pendiente, Completada, Cancelada)
  - Múltiples métodos de pago (Efectivo, Tarjeta, Transferencia)
  - Asociación con clientes y vendedores

- **Detalles de Venta**
  - Registro de productos por venta
  - Cálculo automático de subtotales
  - Gestión de cantidades y precios unitarios

- **Facturación**
  - Generación automática de números de factura
  - Asociación con ventas
  - Registro de montos totales

- **Integración con Otros Microservicios**
  - Clientes (gestión de información de clientes)
  - Productos (referencia a productos)
  - Vendedores (gestión de vendedores)

## Tecnologías Utilizadas

- **Backend**: NestJS, TypeScript
- **Base de Datos**: PostgreSQL
- **API**: GraphQL
- **Contenedorización**: Docker
- **ORM**: TypeORM

## Requisitos Previos

- Docker
- Docker Compose
- Node.js (para desarrollo local)
- Yarn (para desarrollo local)

## Configuración del Proyecto

### Usando Docker (Recomendado)

```bash
# Construir y levantar los contenedores
$ docker-compose up --build

# Para ejecutar en modo desarrollo
$ docker-compose up

# Para detener los contenedores
$ docker-compose down
```

### Desarrollo Local (Sin Docker)

```bash
# Instalar dependencias
$ yarn install

# Ejecutar en modo desarrollo
$ yarn run start:dev

# Ejecutar en modo producción
$ yarn run start:prod
```

## Estructura de Contenedores

El proyecto utiliza los siguientes servicios en Docker:

- **API**: Servicio principal de NestJS (puerto 3000)
- **Base de Datos**: PostgreSQL (puerto 5432)
- **Redis**: Para caché y gestión de sesiones (puerto 6379)

## API GraphQL

El microservicio expone una API GraphQL con las siguientes operaciones principales:

### Schemas y Ejemplos de Uso

#### Tipos de Datos Principales

```graphql
type Venta {
  id: ID!
  fecha: DateTime!
  total: Float!
  cliente: Cliente!
  vendedor_id: String!
  estado: EstadoVenta!
  metodo_pago: MetodoPago!
  detalles: [DetalleVenta!]!
  notas: String
}

type DetalleVenta {
  id: ID!
  venta: Venta!
  producto_id: Int!
  cantidad: Int!
  precio_unitario: Float!
  subtotal: Float!
  notas: String
}

type Factura {
  id: ID!
  numero: String!
  fecha: DateTime!
  monto_total: Float!
  venta: Venta!
}

enum EstadoVenta {
  PENDIENTE
  COMPLETADA
  CANCELADA
}

enum MetodoPago {
  EFECTIVO
  TARJETA
  TRANSFERENCIA
}
```

### Ejemplos de Queries

#### 1. Obtener todas las ventas con sus detalles
```graphql
query {
  ventas {
    id
    fecha
    total
    estado
    metodo_pago
    cliente {
      nombre
      apellido
    }
    detalles {
      producto_id
      cantidad
      precio_unitario
      subtotal
    }
  }
}
```

#### 2. Obtener una venta específica con su factura
```graphql
query {
  venta(id: 1) {
    id
    total
    estado
    cliente {
      nombre
      apellido
      email
    }
    detalles {
      producto_id
      cantidad
      subtotal
    }
  }
  factura(id: 1) {
    numero
    monto_total
    fecha
  }
}
```

#### 3. Obtener detalles de una venta específica
```graphql
query {
  detallesPorVenta(ventaId: 1) {
    id
    producto_id
    cantidad
    precio_unitario
    subtotal
    notas
  }
}
```

### Ejemplos de Mutations

#### 1. Crear una nueva venta
```graphql
mutation {
  crearVenta(
    clienteId: 1
    vendedorId: "VEND001"
    total: 1500.00
    metodoPago: TARJETA
    estado: PENDIENTE
  ) {
    id
    fecha
    total
    estado
    metodo_pago
  }
}
```

#### 2. Agregar productos a una venta
```graphql
mutation {
  crearDetalleVenta(
    ventaId: 1
    productoId: 101
    cantidad: 2
    precioUnitario: 750.00
  ) {
    id
    cantidad
    precio_unitario
    subtotal
  }
}
```

#### 3. Generar una factura
```graphql
mutation {
  crearFactura(
    ventaId: 1
    monto_total: 1500.00
  ) {
    id
    numero
    fecha
    monto_total
  }
}
```

#### 4. Actualizar el estado de una venta
```graphql
mutation {
  actualizarVenta(
    id: 1
    estado: COMPLETADA
    metodoPago: TARJETA
  ) {
    id
    estado
    metodo_pago
    fecha
  }
}
```

### Respuestas de Ejemplo

#### Respuesta de una venta
```json
{
  "data": {
    "venta": {
      "id": "1",
      "fecha": "2024-03-20T15:30:00Z",
      "total": 1500.00,
      "estado": "COMPLETADA",
      "cliente": {
        "nombre": "Juan",
        "apellido": "Pérez",
        "email": "juan.perez@email.com"
      },
      "detalles": [
        {
          "producto_id": 101,
          "cantidad": 2,
          "precio_unitario": 750.00,
          "subtotal": 1500.00
        }
      ]
    }
  }
}
```

#### Respuesta de una factura
```json
{
  "data": {
    "factura": {
      "id": "1",
      "numero": "FAC-000001",
      "fecha": "2024-03-20T15:35:00Z",
      "monto_total": 1500.00
    }
  }
}
```

## Variables de Entorno

Las variables de entorno necesarias están configuradas en el archivo `.env` y son cargadas automáticamente por Docker Compose:

```env
# Base de datos
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=ventas_db

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# API
PORT=3000
```

## Pruebas

```bash
# Pruebas unitarias
$ yarn run test

# Pruebas e2e
$ yarn run test:e2e

# Cobertura de pruebas
$ yarn run test:cov
```

## Documentación de la API

La documentación de la API GraphQL está disponible en:
- GraphQL Playground: `http://localhost:3000/graphql` (cuando la aplicación está en ejecución)

## Soporte

Para soporte y consultas, por favor contactar al equipo de desarrollo.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
