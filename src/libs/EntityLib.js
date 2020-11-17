import { CarTypeEnum } from "objects/enums";
import { Car, Truck, Point, Block} from "objects";

export const createNewTruck = (x, y, direction) => {
    const point = new Point(x, y);
    const block = new Block(point, direction);

    return new Truck(block);
}

export const createNewCarRed = (x, y, direction) => {
    return _createNewCar(x, y, direction, CarTypeEnum.RED);
}


export const createNewCarObstacle = (x, y, direction) => {
    return _createNewCar(x, y, direction, CarTypeEnum.OBSTACLE);
}

export const _createNewCar = (x, y, direction, type) => {
    const point = new Point(x, y);
    const block = new Block(point, direction);

    return new Car(block, type);
}
