import { AbstractNodeProgram } from "./node";
/**
 * Please, modify this class to fulfill the technical assignment part 2.
 *
 * This class copies sigma/rendering/webgl/programs/node.fast, but with a tiny
 * difference: The fragment shader ("./node.border.frag.glsl") draws a white
 * disc with a colored border.
 */
import { floatColor } from "sigma/utils";
import { NodeDisplayData } from "sigma/types";
import { RenderParams } from "sigma/rendering/webgl/programs/common/program";

// @ts-ignore
import vertexShaderSource from "!raw-loader!../shaders/node.border.vert.glsl";
// @ts-ignore
import fragmentShaderSource from "!raw-loader!../shaders/node.border.frag.glsl";

const POINTS = 1,
  ATTRIBUTES = 5;

export default class NodeProgramBorder extends AbstractNodeProgram {
  constructor(gl: WebGLRenderingContext) {
    super(gl, vertexShaderSource, fragmentShaderSource, POINTS, ATTRIBUTES);
    this.bind();
  }

  process(data: NodeDisplayData & { donut: number }, hidden: boolean, offset: number): void {
    const array = this.array;
    let i = offset * POINTS * ATTRIBUTES;
    if (hidden) {
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      return;
    }

    const color = floatColor(data.color);

    array[i++] = data.x;
    array[i++] = data.y;
    array[i++] = data.size;
    array[i++] = color;
    //array[i++] = data.donut
  }

  render(params: RenderParams): void {
    if (this.hasNothingToRender()) return;
    const gl = this.gl;
    const program = this.program;
    gl.useProgram(program);
    gl.uniform1f(this.ratioLocation, 1 / Math.sqrt(params.ratio));
    gl.uniform1f(this.scaleLocation, params.scalingRatio);
    gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
    gl.drawArrays(gl.POINTS, 0, this.array.length / ATTRIBUTES);
  }
}
