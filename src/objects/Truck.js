import { Entity } from "objects/Entity";

class Truck extends Entity {

    constructor(frontBlock) {
        super(frontBlock, 3);
    }

    static getLength() {
        return 3;
    }
}

export { Truck };
