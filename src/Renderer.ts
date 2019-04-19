import { Cube, Face } from "./Cube";
import { Vertex } from "./Vertex";

export interface IVertex2D {
    x: number;
    y: number;
}

export class Renderer {

    public render(objects: Cube[], ctx, dx, dy) {
        objects.forEach(object => {
            object.faces.forEach(face => {
                // Draw vertex
                let P = this.project(face[0]);
                ctx.beginPath();
                ctx.moveTo(P.x + dx, -P.y + dy);

                for (let k = 1, verticesNo = face.length; k < verticesNo; ++k) {
                    P = this.project(face[k]);
                    ctx.lineTo(P.x + dx, -P.y + dy);
                }

                ctx.closePath();
                ctx.stroke();
                ctx.fill();
            });
        });
    }

    public project(vertex: Vertex): IVertex2D {
        return null;
    }
}