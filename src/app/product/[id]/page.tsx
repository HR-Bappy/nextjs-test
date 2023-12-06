import HeroBanner from "@/src/component/hero-banner/hero-banner";
import React from "react";

async function getProductDetails(id: number) {
	const res = await fetch(
		"https://dummyjson.com/products/" + id,

		{
			cache: "no-store",
		}
	);

	return res.json();
}

export default async function ProductDetails({ params }: any) {
	const product = await getProductDetails(params?.id);

	return (
		<section className="product-details">
			<div className="container">
				<HeroBanner imageList={product.images} delay={5000} />

				<div className="row mt-5">
					<h2>{product.title}</h2>
          <div className="description">{product.description}</div>
          <h4>Price: {product.price}</h4>
          <p className="stock">Stock: {product.stock}</p>
				</div>
			</div>
		</section>
	);
}
