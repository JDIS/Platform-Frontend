/**
 * https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-a-array-of-objects#comment64856953_34890276
 */
export class HelperMethods {
    public static groupByArray(xs, key) {
        return xs.reduce((rv, x) => {
            const v = key instanceof Function ? key(x) : x[key];
            const el = rv.find((r) => r && r.key === v);
            if (el) {
                el.values.push(x);
            } else {
                rv.push({key: v, values: [x]});
            }
            return rv;
        }, []);
    }

}
