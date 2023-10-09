export function add(x: number, y: number) {
    return x + y;
}

describe('add', () => {
    it('should add two numbers', () => {
        expect(add(1, 2)).toBe(3);
    });
})
