import { EnumEntry } from "objects/EnumEntry";

class Enum {

    constructor(definition) {
        Object.entries(definition).forEach(([key, value]) => {
            this[key] = new EnumEntry(key, value);
        });
    }

    getEntryByValueOrNull(value) {
        const enumEntries = Object.values(this);
        const entryForValue = enumEntries.find((enumEntry) => {
            return enumEntry.getValue() === value;
        });

        return entryForValue || null;
    }
}

export { Enum };
