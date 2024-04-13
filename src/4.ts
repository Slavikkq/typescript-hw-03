interface IKey {
    getSignature(): number;
}

interface IPerson {
    getKey(): Key;
}

interface IHouse {
    tenants: Person[];

    comeIn(person: Person): void;
    openDoor(key: Key): void;
}

class Key implements IKey {
    private signature: number;

    constructor() {
        this.signature = Math.random();
    }

    public getSignature(): number {
        return this.signature;
    }
}

class Person implements IPerson {
    private key: Key;

    constructor(key: Key) {
        this.key = key;
    }

    public getKey(): Key {
        return this.key;
    }
}

abstract class House implements IHouse {
    protected door: boolean = false;
    protected key: Key;
    public tenants: Person[] = [];

    constructor(key: Key) {
        this.key = key;
    }

    public comeIn(person: Person): void {
        if (this.door) {
            this.tenants.push(person);
        }
    }

    abstract openDoor(key: Key): void
}

class MyHouse extends House {
    public openDoor(key: Key): void {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = !this.door;
        }
    }
}

const key = new Key();
const person = new Person(key);
const house = new MyHouse(key);

house.openDoor(person.getKey());
house.comeIn(person);

console.log(house.tenants);



export { };