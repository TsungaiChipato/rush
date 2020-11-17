class EnumEntry {

    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    equals(entry) {
        if (entry instanceof EnumEntry) {
            return entry.getValue() === this.value;
        }
    }
}

export { EnumEntry };
