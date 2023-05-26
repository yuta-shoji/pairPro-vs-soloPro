import {StubSpyMyCardListProvider} from "./StubSpyMyCardListProvider";
import {DefaultMyCardManager} from "../MyCardManager";

describe('MuCardManager', () => {
    let stubSpyMyCardListProvider: StubSpyMyCardListProvider

    beforeEach(() => {
        stubSpyMyCardListProvider = new StubSpyMyCardListProvider()
    })

    test('getAll 保存されたcardsを取得する', () => {
        const cards = [
            {
                id: 1,
                name: "name1",
                types: ["type1"],
                imageUrl: "https://image1.png",
                weight: 10,
                height: 100,
                genus: "genus1",
                flavor_text: "flavorText1",
            },
            {
                id: 2,
                name: "name2",
                types: ["type2"],
                imageUrl: "https://image2.png",
                weight: 20,
                height: 200,
                genus: "genus2",
                flavor_text: "flavorText2",
            },
            {
                id: 3,
                name: "name3",
                types: ["type3", "type4"],
                imageUrl: "https://image3.png",
                weight: 30,
                height: 300,
                genus: "genus3",
                flavor_text: "flavorText3",
            },
        ]
        stubSpyMyCardListProvider.cards = cards
        const myCardManager = new DefaultMyCardManager(stubSpyMyCardListProvider)


        const actualCards = myCardManager.getAll()


        expect(actualCards.length).toEqual(3)
        expect(actualCards).toEqual(cards)
    })

    test('set 受け取ったcardsを保存する', () => {
        const myCardManager = new DefaultMyCardManager(stubSpyMyCardListProvider)

        const cards = [
            {
                id: 1,
                name: "name1",
                types: ["type1"],
                imageUrl: "https://image1.png",
                weight: 10,
                height: 100,
                genus: "genus1",
                flavor_text: "flavorText1",
            },
            {
                id: 2,
                name: "name2",
                types: ["type2"],
                imageUrl: "https://image2.png",
                weight: 20,
                height: 200,
                genus: "genus2",
                flavor_text: "flavorText2",
            },
            {
                id: 3,
                name: "name3",
                types: ["type3", "type4"],
                imageUrl: "https://image3.png",
                weight: 30,
                height: 300,
                genus: "genus3",
                flavor_text: "flavorText3",
            },
        ]
        cards.forEach(card => {
            myCardManager.set(card)
        })


        expect(stubSpyMyCardListProvider.cards).toEqual(cards)
    })
})
