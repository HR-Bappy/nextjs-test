import React from "react";
import "./home.scss";
import ProductCard from "../component/product-list";

async function getProductList() {
	const res = await fetch(
		"https://dummyjson.com/products" ,
			
		{
			next: {
				revalidate: 15,
			},
		}
	);

	return res.json();
}

export default async function ProductList() {
	const productList = await getProductList();
	return (
		<section className="product-list-page">
			<div className="container">
				{
					productList?.products?.length &&
				<ProductCard productList={productList?.products} />
				}
			</div>
		</section>
	);
}

