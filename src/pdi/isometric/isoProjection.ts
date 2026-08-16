import type { IsoPoint3D } from "../model";

export interface IsoProjectOptions {
  scale?: number;
  origin?: { x: number; y: number };
  axisX?: { x: number; y: number };
  axisY?: { x: number; y: number };
  axisZ?: { x: number; y: number };
}

export interface IsoPoint2D {
  x: number;
  y: number;
}

const DEFAULTS: Required<IsoProjectOptions> = {
  scale: 1,
  origin: { x: 0, y: 0 },
  axisX: { x: 1, y: 0.5 },
  axisY: { x: -1, y: 0.5 },
  axisZ: { x: 0, y: -1 },
};

export function projectIsoPoint(point: IsoPoint3D, options: IsoProjectOptions = {}): IsoPoint2D {
  const config = { ...DEFAULTS, ...options };
  return {
    x:
      config.origin.x +
      config.scale *
        (point.x * config.axisX.x + point.y * config.axisY.x + point.z * config.axisZ.x),
    y:
      config.origin.y +
      config.scale *
        (point.x * config.axisX.y + point.y * config.axisY.y + point.z * config.axisZ.y),
  };
}

export function projectIsoPolyline(points: IsoPoint3D[], options: IsoProjectOptions = {}): IsoPoint2D[] {
  return points.map((point) => projectIsoPoint(point, options));
}
