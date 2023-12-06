export const sortStrings = (a, b) => {

    const lowercase_a = a.toLowerCase().trim().replace(" ", "");
    const lowercase_b = b.toLowerCase().trim().replace(" ", "");

    if (lowercase_a < lowercase_b) {
        return -1;
    } else if (lowercase_a > lowercase_b) {
        return 1;
    }
    return 0;
}