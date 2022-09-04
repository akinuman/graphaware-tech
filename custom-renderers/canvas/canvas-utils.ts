import { NodeDisplayData, PartialButFor } from "sigma/types";
import { Settings } from "sigma/settings";

/**
 * Custom label renderer
 */
export default function drawLabel(
  context: CanvasRenderingContext2D,
  data: PartialButFor<NodeDisplayData, "x" | "y" | "size" | "label" | "color">,
  settings: Settings,
): void {
  if (!data.label) return;
  const size = settings.labelSize,
    font = settings.labelFont,
    weight = settings.labelWeight,
    color = settings.labelColor.attribute
      ? data[settings.labelColor.attribute] || settings.labelColor.color || "#000"
      : settings.labelColor.color;
  context.fillStyle = color;
  context.font = `${weight} ${size}px ${font}`;
  const width = context.measureText(data.label).width;
  context.fillText(data.label, data.x - width / 2, data.y + size * 2);
}
/**
 * Custom hover renderer
 */
export function drawHover(
  context: CanvasRenderingContext2D,
  data: PartialButFor<NodeDisplayData, "x" | "y" | "size" | "label" | "color">,
  settings: Settings,
) {
  const size = settings.labelSize,
    font = settings.labelFont,
    weight = settings.labelWeight;

  // Then we draw the label background
  context.fillStyle = "#32CD32";
  const START_ANGLE = 0;
  const FINISH_ANGLE = Math.PI * 2;

  if (typeof data.label === "string") {
    const textWidth = context.measureText(data.label).width;
    const boxWidth = Math.round(textWidth + 5);
    const boxHeight = Math.round(size + 2);
    context.beginPath();
    context.rect(data.x - boxWidth / 2, data.y + boxHeight, boxWidth, boxHeight);
    context.arc(data.x, data.y, 20, START_ANGLE, FINISH_ANGLE);
    context.closePath();
    context.fill();
    context.fillStyle = "#FFFFFF";
    context.font = `${weight} ${size}px ${font}`;
    context.fillText(data.label, data.x - textWidth / 2, data.y + size * 2);
  }
}
