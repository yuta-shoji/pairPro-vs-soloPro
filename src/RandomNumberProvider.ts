export default interface RandomNumberProvider {
    random(): number
}

export class DefaultRandomNumberProvider implements RandomNumberProvider {
    random(): number {
        return Math.floor(Math.random() * 1010) + 1
    }
}
