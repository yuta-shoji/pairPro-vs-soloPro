import RandomNumberProvider from "../RandomNumberProvider";

export class StubRandomNumberProvider implements RandomNumberProvider {
    get_call_count: number = 0
    random_returnValue_1st: number = 0
    random_returnValue_2nd: number = 0;
    random_returnValue_3rd: number = 0;
    random_returnValue_4th: number = 0;
    random_returnValue_5th: number = 0;

    random(): number {
        this.get_call_count++
        return this.getResultValue()
    }

    private getResultValue(): number {
        if (this.get_call_count == 1) {
            return this.random_returnValue_1st
        } else if (this.get_call_count == 2) {
            return this.random_returnValue_2nd
        } else if (this.get_call_count == 3) {
            return this.random_returnValue_3rd
        } else if (this.get_call_count == 4) {
            return this.random_returnValue_4th
        } else if (this.get_call_count == 5) {
            return this.random_returnValue_5th
        }
        return 0
    }
}