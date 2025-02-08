class RandomizedSet {
    hashMap: Map<number, number>;
    data: number[];
    constructor() {
        this.hashMap = new Map<number, number>();
        this.data = [];
    }

    insert(val: number): boolean {
        if (this.hashMap.has(val)) return false;
        this.data[this.hashMap.size] = val;
        this.hashMap.set(val, this.hashMap.size);
        return true;
    }

    remove(val: number): boolean {
        if (!this.hashMap.has(val)) return false;
        const lastIndex = this.hashMap.size - 1;
        const currentIndex = this.hashMap.get(val)!;

        if (lastIndex > 0) {
            this.data[currentIndex] = this.data[lastIndex];       // fill the gap
            this.hashMap.set(this.data[lastIndex], currentIndex); // update the index of the item used to fill gap
        }
        return this.hashMap.delete(val);
    }

    getRandom(): number {
        const randomIndex = Math.floor(Math.random() * this.hashMap.size);
        return this.data[randomIndex];
    }
}


const set = new RandomizedSet();
set.remove(0);
set.remove(0);
set.insert(0);
console.log(set.getRandom());
set.remove(0);
console.log(set.insert(0));