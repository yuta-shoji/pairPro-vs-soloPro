import MyCardManager, {DefaultMyCardManager} from './MyCardManager'
import {AppProps} from './App'
import {NetworkPokemonRepo, PokemonRepo} from "./Repo/NetwoekPokemonRepo";
import {Http, NetworkHttp} from "./Networking/NetworkHttp";
import RandomNumberProvider, {DefaultRandomNumberProvider} from "./RandomNumberProvider";

export default class AppPropsBuilder {
    private myCardManager: MyCardManager
    private readonly http: Http
    private pokemonRepo: PokemonRepo
    private randomNumberProvider: RandomNumberProvider

    constructor() {
        this.myCardManager = new DefaultMyCardManager()
        this.http = new NetworkHttp()
        this.pokemonRepo = new NetworkPokemonRepo(this.http)
        this.randomNumberProvider = new DefaultRandomNumberProvider()
    }

    withMyCardManager(newValue: MyCardManager): AppPropsBuilder {
        this.myCardManager = newValue
        return this
    }

    withPokemonRepo(newValue: PokemonRepo): AppPropsBuilder {
        this.pokemonRepo = newValue
        return this
    }

    withRandomNumberProvider(newValue: RandomNumberProvider): AppPropsBuilder {
        this.randomNumberProvider = newValue
        return this
    }

    build(): AppProps {
        return {
            myCardManager: this.myCardManager,
            pokemonRepo: this.pokemonRepo,
            randomNumberProvider: this.randomNumberProvider
        }
    }
}