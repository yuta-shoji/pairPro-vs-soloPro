import MyCardManager, {DefaultMyCardManager} from './MyCardManager'
import {AppProps} from './App'
import RandomNumberProvider, {DefaultRandomNumberProvider} from "./RandomNumberProvider";
import CardListProvider, {MyCardListProvider} from './MyCardListProvider';
import {Http, NetworkHttp} from "./pokemonVendingMachine/Networking/NetworkHttp";
import {NetworkPokemonRepo, PokemonRepo} from "./pokemonVendingMachine/Repo/NetwoekPokemonRepo";

export default class AppPropsBuilder {
    private readonly myCardListProvider: CardListProvider
    private myCardManager: MyCardManager
    private readonly http: Http
    private pokemonRepo: PokemonRepo
    private randomNumberProvider: RandomNumberProvider

    constructor() {
        this.myCardListProvider = new MyCardListProvider()
        this.myCardManager = new DefaultMyCardManager(this.myCardListProvider)
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