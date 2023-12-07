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


async function getCategoryList() {
	const res = await fetch("https://dummyjson.com/products/categories");

	return res.json();
}

export default async function ProductList() {
	const [productList, categoryList] = await Promise.all([
		getProductList(),
		getCategoryList(),
	]);
	// const productList = await getProductList();
	return (
		<section className="product-list-page">
			<div className="container">
				{productList?.products?.length && (
					<ProductCard
						productList={productList?.products}
						categoryList={categoryList}
					/>
				)}
			</div>
		</section>
	);
}

