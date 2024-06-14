export const animateBezier = ({ startPoint, controlPoint1, controlPoint2, endPoint, progress }) => {
  const x =
    Math.pow(1 - progress, 3) * startPoint.x +
    3 * Math.pow(1 - progress, 2) * progress * controlPoint1.x +
    3 * (1 - progress) * Math.pow(progress, 2) * controlPoint2.x +
    Math.pow(progress, 3) * endPoint.x;

  const y =
    Math.pow(1 - progress, 3) * startPoint.y +
    3 * Math.pow(1 - progress, 2) * progress * controlPoint1.y +
    3 * (1 - progress) * Math.pow(progress, 2) * controlPoint2.y +
    Math.pow(progress, 3) * endPoint.y;

  return { x, y };
};

function calculateBezierCurve(points, resolution) {
  // Проверяем, есть ли у нас хотя бы 2 контрольные точки
  if (points.length < 2) {
    throw new Error('At least two control points are required');
  }

  // Вычисляем количество сегментов кривой (каждый сегмент будет иметь точку на кривой)
  const segments = points.length / 3;

  console.log(segments);

  // Массив для хранения точек на кривой
  const bezierPoints = [];

  // Вычисляем точки на кривой для каждого сегмента
  for (let i = 0; i < segments; i++) {
    // Получаем контрольные точки для текущего сегмента
    const p0 = points[i * 3];
    const p1 = points[i * 3 + 1];
    const p2 = points[i * 3 + 2];
    const p3 = points[i * 3 + 3] || p2; // Если у нас нет следующей точки, мы используем последнюю точку

    console.log(p0, p1, p2, p3);

    // Вычисляем точки на кривой для текущего сегмента
    for (let t = 0; t <= resolution; t++) {
      const tNorm = t / resolution;

      const x =
        Math.pow(1 - tNorm, 3) * p0.x +
        3 * Math.pow(1 - tNorm, 2) * tNorm * p1.x +
        3 * (1 - tNorm) * Math.pow(tNorm, 2) * p2.x +
        Math.pow(tNorm, 3) * p3.x;

      const y =
        Math.pow(1 - tNorm, 3) * p0.y +
        3 * Math.pow(1 - tNorm, 2) * tNorm * p1.y +
        3 * (1 - tNorm) * Math.pow(tNorm, 2) * p2.y +
        Math.pow(tNorm, 3) * p3.y;

      bezierPoints.push({ x, y });
    }
  }

  return bezierPoints;
}

export { calculateBezierCurve };
