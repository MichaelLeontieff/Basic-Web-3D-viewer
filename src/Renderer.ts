import { Cube, Face } from "./Cube";
import { Vertex } from "./Vertex";
import { Vertex2D } from "./Vertex2D";

export enum Projections {
    PERSPECTIVE = "PERSPECTIVE",
    ORTHOGRAPHIC = "ORTHOGRAPHIC"
}

export class Renderer {

    public static render(objects: Cube[], ctx, dx, dy, projection: Projections) {
        ctx.clearRect(0, 0, 2*dx, 2*dy);
        
        objects.forEach(object => {
            object.faces.forEach(face => {
                // Draw vertex
                let P = Renderer.project(face[0], projection);
                ctx.beginPath();
                ctx.moveTo(P.x + dx, -P.y + dy);

                for (let k = 1, verticesNo = face.length; k < verticesNo; ++k) {
                    P = Renderer.project(face[k], projection);
                    ctx.lineTo(P.x + dx, -P.y + dy);
                }

                ctx.closePath();
                ctx.stroke();
                ctx.fill();
            });
        });
    }

    public static project(vertex: Vertex, type: Projections): Vertex2D {
        switch (type) {
            case Projections.ORTHOGRAPHIC:
                return new Vertex2D(vertex.x, vertex.y);
            case Projections.PERSPECTIVE:
                return new Vertex2D(vertex.x, vertex.y);
        }
    }
}