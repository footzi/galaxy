export const getIsCollision = (entity, area) => {
  return (
    entity.coords.x <= area.coords.x + area.options.width &&
    entity.coords.x + entity.options.width >= area.coords.x &&
    entity.coords.y <= area.coords.y + area.options.height &&
    entity.coords.y + entity.options.height >= area.coords.y
  );
};
