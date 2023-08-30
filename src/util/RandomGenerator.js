import { Generator } from './Generator.js';
import { BuiltinType } from './BuiltIn.js';

export class RandomGenerator extends Generator {

    constructor(outType, range, offset, uniformRange, uniformOffset, normalize) {
        super(outType);
        this.range = range;
        this.offset = offset;
        this.uniformRange = uniformRange;
        this.uniformOffset = uniformOffset;
        this.normalize = normalize;
    }

    generate(out) {
        const uniformRange = Math.random() * this.uniformRange;
        switch (this.outTypeID) {
            case BuiltinType.Scalar:
                out = Math.random() * this.range + this.offset;
                if (this.normalize) out = out < 0 ? -1.0 : 1.0;
                return 0;
            break;
            case BuiltinType.Vector2:
                out.set(generateForElement(uniformRange, 'x'),
                        generateForElement(uniformRange, 'y'));
            break;
            case BuiltinType.Vector3:
                out.set(generateForElement(uniformRange, 'x'),
                        generateForElement(uniformRange, 'y'),
                        generateForElement(uniformRange, 'z'));
            break;
            case BuiltinType.Vector4:
                out.set(generateForElement(uniformRange, 'x'),
                        generateForElement(uniformRange, 'y'),
                        generateForElement(uniformRange, 'z'),
                        generateForElement(uniformRange, 'w'));
            break;
        }

        if (this.normalize) out.normalize();
        return out;
    }

    generateForElement(uniformRange, e) {
        return uniformRange + Math.random() * this.range[e] + this.offset[e] + this.uniformOffset;
    }

    clone() {
        const clone = new RandomGenerator<T>(this.range, this.offset, this.uniformRange,
                                             this.uniformOffset, this.normalize);
        return clone;
    }

}
