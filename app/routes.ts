import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/login', 'routes/login.tsx'),
  route('/household-account-book', 'routes/household-account-book.tsx'),
  route('/stock', 'routes/stock.tsx'),
] satisfies RouteConfig;
