export const sortStrings = (a, b) => {

    if (!a) {
        a = ""
    }

    if (!b) {
        b = ""
    }

    const lowercase_a = a.toLowerCase().trim().replace(" ", "");
    const lowercase_b = b.toLowerCase().trim().replace(" ", "");

    if (lowercase_a < lowercase_b) {
        return -1;
    } else if (lowercase_a > lowercase_b) {
        return 1;
    }
    return 0;
}

export const sortQuarters = (a, b) => {
    if (!a) {
        a = ""
    }

    if (!b) {
        b = ""
    }

    const lowercase_a = a.toLowerCase().trim().replace(" ", "");
    const lowercase_b = b.toLowerCase().trim().replace(" ", "");

    const quarterA = lowercase_a.slice(0, 2)
    const yearA = lowercase_a.slice(2)

    const quarterB = lowercase_b.slice(0, 2)
    const yearB = lowercase_b.slice(2)

    if (yearA < yearB) {
        return -1;
    } else if ( yearA > yearB) {
        return 1;
    } else {
        if (quarterA < quarterB) {
            return -1
        } else if (quarterA > quarterB) {
            return 1
        }
        return 0
    }
}