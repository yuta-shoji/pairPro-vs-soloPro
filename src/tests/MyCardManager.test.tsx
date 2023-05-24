import {StubSpyMyCardListProvider} from "./StubSpyMyCardListProvider";
import {DefaultMyCardManager} from "../MyCardManager";

describe('MuCardManager', () => {
    let stubSpyMyCardListProvider: StubSpyMyCardListProvider

    beforeEach(() => {
        stubSpyMyCardListProvider = new StubSpyMyCardListProvider()
    })

    test('getAll 保存されたcardsを取得する', () => {
        stubSpyMyCardListProvider.cards = [
            {id: 1, name: "name1", types: ["type1"], imageUrl: "https://image1.png"},
            {id: 2, name: "name2", types: ["type2"], imageUrl: "https://image2.png"},
            {id: 3, name: "name3", types: ["type3", "type4"], imageUrl: "https://image3.png"},
        ]
        const myCardManager = new DefaultMyCardManager(stubSpyMyCardListProvider)


        const actualCards = myCardManager.getAll()


        const expectedCards = [
            {id: 1, name: "name1", types: ["type1"], imageUrl: "https://image1.png"},
            {id: 2, name: "name2", types: ["type2"], imageUrl: "https://image2.png"},
            {id: 3, name: "name3", types: ["type3", "type4"], imageUrl: "https://image3.png"},
        ]
        expect(actualCards.length).toEqual(3)
        expect(actualCards).toEqual(expectedCards)
    })

    test('set 受け取ったcardsを保存する', () => {
        const myCardManager = new DefaultMyCardManager(stubSpyMyCardListProvider)


        myCardManager.set({id: 1, name: "name1", types: ["type1"], imageUrl: "https://image1.png"})
        myCardManager.set({id: 2, name: "name2", types: ["type2"], imageUrl: "https://image2.png"})
        myCardManager.set({id: 3, name: "name3", types: ["type3", "type4"], imageUrl: "https://image3.png"})


        const expectedCards = [
            {id: 1, name: "name1", types: ["type1"], imageUrl: "https://image1.png"},
            {id: 2, name: "name2", types: ["type2"], imageUrl: "https://image2.png"},
            {id: 3, name: "name3", types: ["type3", "type4"], imageUrl: "https://image3.png"},
        ]
        expect(stubSpyMyCardListProvider.cards).toEqual(expectedCards)
    })
})
