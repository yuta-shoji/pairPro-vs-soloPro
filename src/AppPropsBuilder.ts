import MyCardManager, {DefaultMyCardManager} from './MyCardManager'
import {AppProps} from './App'

export default class AppPropsBuilder {
    private myCardManager: MyCardManager = new DefaultMyCardManager()

    withMyCardManager(newValue: MyCardManager): AppPropsBuilder {
        this.myCardManager = newValue
        return this
    }

    build(): AppProps {
        return {
            myCardManager: this.myCardManager
        }
    }
}