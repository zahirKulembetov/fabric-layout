class LayoutUtil {
    static getLayout(type) {
        if(!type) return;
        return `src/image/layouts/${type}.png`;
    }
}
export default LayoutUtil;