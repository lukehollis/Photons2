import * as THREE from 'three';
import { geometry } from './geometry.js';
import { material } from './material.js';

export const mesh = () => {
    const mesh = new THREE.Mesh(geometry(), material());
    return mesh;
};
