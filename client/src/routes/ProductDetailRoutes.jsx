import ProductDetail from '../pages/ProductDetail';

const urls = ['phone/:productSlug', 'laptop/:productSlug', 'tablet/:productSlug'];

export const productDetailRoutes = urls.map((url) => ({
    path: url,
    element: <ProductDetail />,
}));
