import ProductCard from '../../components/DisplayProduct/ProductCard';

const ListProduct = ({ products, isBorder }) => {
    return (
        <div className="grid grid-cols-5 gap-6">
            {products.map((product, index) => (
                <ProductCard key={index} data={product} isBorder={isBorder} />
            ))}
        </div>
    );
};
export default ListProduct;
