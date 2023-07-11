import ItemOrder from '../History/ItemOrder';
function ProductOrder({ detail }) {
    return (
        <div className="bg-white rounded-xl mt-3">
            <ItemOrder data={detail} />
        </div>
    );
}

export default ProductOrder;
