import { DirectionEnum } from "objects/enums";

class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x},${this.y}`;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    equals(point) {
        if (point instanceof Point) {
            return this.x === point.getX() && this.y === point.getY();
        }
    }

    hasNegativeCoordinates() {
        return this.x < 0 || this.y < 0;
    }

    static getNextPositionInDirectionForPointOrNull(point, direction) {
        if (point instanceof Point) {
            const positionX = point.getX();
            const positionY = point.getY();

            if (DirectionEnum.UP.equals(direction)) {
                return new Point(positionX - 1, positionY);
            } else if (DirectionEnum.RIGHT.equals(direction)) {
                return new Point(positionX, positionY + 1);
            } else if (DirectionEnum.DOWN.equals(direction)) {
                return new Point(positionX + 1, positionY);
            } else if (DirectionEnum.LEFT.equals(direction)) {
                return new Point(positionX, positionY - 1);
            } else {
                return null;
            }
        }
    }
}

export { Point };
