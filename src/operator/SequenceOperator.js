import { ParticleStateOperator } from './ParticleStateOperator.js';

export class SequenceOperator extends ParticleStateOperator {

    constructor(particleSequences, speed, loop, reverse) {
        super();
        this.particleSequences = particleSequences;
        this.speed = speed;
        this.loop = loop;
        this.reverse = reverse;
    }

   updateState(state, timeDelta) {
        const sequenceElement = state.sequenceElement;
        const activeSequence = this.particleSequences.getSequence(sequenceElement.y);
        tdOverS = timeDelta / this.speed;
        if (reverse) {
            sequenceElement.x -= tdOverS;
            if (sequenceElement.x < activeSequence.start) {
                sequenceElement.x = activeSequence.start + activeSequence.length;
                if (!this.loop) return false;
            }
        } else {
            sequenceElement.x += tdOverS;
            if (sequenceElement.x >= activeSequence.start + activeSequence.length) {
                sequenceElement.x = activeSequence.start;
                if (!this.loop) return false;
            }
        }
        return true;
    }

}
