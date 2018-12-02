export function convertVelocityToAngle(velocity) {
  const { x, y } = velocity;
 
  return Math.atan2(y, x) * (180 / Math.PI);
}