import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, { description: 'Hola Mundo es lo que retorna', name: 'helloWorld' })
    helloWorld(): string {
        return 'Hello World!';
    }

    @Query(() => Float, { description: 'Retorna un numero', name: 'randomNumber' })
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query(() => Int, { description: 'Retorna un número entero. Default(6)', name: 'randomFromZeroTo' })
    getRandomFromZeroTo(@Args('to', { nullable: true, type: () => Int }) to: number = 6): number {
        return Math.floor(Math.random() * to);
    }
}
