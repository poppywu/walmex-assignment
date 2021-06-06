import Image from 'next/image';
function Product({name,img,weight,department,category}) {
    return (
        <div className="product">
        <div className="product__name">
        <h1>{name}</h1>
      </div>
      <div className="product__img">
        <Image src={`/images/${img}`} alt="product" height={200} width={200} />
      </div>
      <h1>About This Item</h1>
      <h3>Specifications</h3>
      <div className="product__weight">
        <h2>Weight</h2>
        <p>{weight}</p>
      </div>
      <div className="product__department">
        <h2>Department</h2>
        <p>{department}</p>
      </div>
      <div className="product__category">
        <h2>Category</h2>
        <p>{category}</p>
      </div>
      </div>
    )
}

export default Product;
