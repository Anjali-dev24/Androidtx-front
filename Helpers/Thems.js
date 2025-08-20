import Metrics from './Metrics';

export const appHitSlop = (t = 0, r = 0, b = 0, l = 0) => {
  return {
    top: Metrics.rfv(t),
    right: Metrics.rfv(r),
    bottom: Metrics.rfv(b),
    left: Metrics.rfv(l),
  };
};
