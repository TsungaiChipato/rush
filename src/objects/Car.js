import { Entity } from "objects/Entity";

class Car extends Entity {

    constructor(frontBlock, type) {
        super(frontBlock, 2);
        this.type = type;
    }

    getType() {
        return this.type;
    }

    static getLength() {
        return 2;
    }
}

export { Car };
