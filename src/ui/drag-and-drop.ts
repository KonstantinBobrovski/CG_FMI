import Figure from "../models/figure";
import Group from "../models/group";
import { SvgInHtml } from "../types/svg";
const svgRoot: SvgInHtml = document.querySelector("#svg-root")!;

export const dragAndDropBootstrap = (entity: Figure | Group) => {
  entity.svgElement.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startTranslateY = +entity.properties["translateY"]?.value || 0;
    const startTranslateX = +entity.properties["translateX"]?.value || 0;

    const moveAt = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const ctm = svgRoot.getScreenCTM()!;
      const rotate = +entity.properties["rotate"].value;
      const scaleX = +entity.properties["scaleX"].value;
      const scaleY = +entity.properties["scaleY"].value;
      const radians = rotate * (Math.PI / 180);
      const dx = (currentX - startX) / ctm.a / scaleX;
      const dy = (currentY - startY) / ctm.d / scaleY;
      const rotatedDx = dx * Math.cos(-radians) - dy * Math.sin(-radians);
      const rotatedDy = dx * Math.sin(-radians) + dy * Math.cos(-radians);

      entity.properties["translateX"].value = (
        startTranslateX + rotatedDx
      ).toString();
      entity.properties["translateY"].value = (
        startTranslateY + rotatedDy
      ).toString();
      entity.refreshProperties();
    };

    const stopMoving = () => {
      document.removeEventListener("mousemove", moveAt);
      document.removeEventListener("mouseup", stopMoving);
    };

    document.addEventListener("mousemove", moveAt);
    document.addEventListener("mouseup", stopMoving);
  });
};
