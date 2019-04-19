import { Vertex } from "./Vertex";

export type Face = Vertex[];

export class Cube {

    public vertices: Vertex[];
    public faces: Face[];
    public d: number;

    constructor(center: Vertex, size: number) {
        this.d = size / 2;
        this.vertices = this.getVertices(center ,this.d);
        this.faces = this.getFaces(this.vertices);
    }

    private getVertices(center: Vertex, d: number): Vertex[] {
        return [
            new Vertex(center.x - d, center.y - d, center.z + d),
            new Vertex(center.x - d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z + d),

            new Vertex(center.x + d, center.y + d, center.z + d),
            new Vertex(center.x + d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z + d),
        ]
    }

    private getFaces(vertices: Vertex[]): Face[] {
        return [
            [vertices[0], vertices[1], vertices[2], vertices[3]],
            [vertices[3], vertices[2], vertices[5], vertices[4]],
            [vertices[7], vertices[6], vertices[5], vertices[4]],
            [vertices[0], vertices[1], vertices[6], vertices[7]],

            [vertices[0], vertices[3], vertices[4], vertices[7]],
            [vertices[1], vertices[2], vertices[5], vertices[6]],
        ]
    }

    public translate(x: number, y: number, z: number) {
        this.vertices.forEach(vertex => {
            vertex.x += x;
            vertex.y += y;
            vertex.z += z;
        });
    }
}