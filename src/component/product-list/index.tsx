"use client";

import React, { useEffect, useState } from "react";
import "./product-list.scss";
import Link from "next/link";
import Dropdown from "../dropdown";

async function getProductList(category: string) {
	const res = await fetch(
		"https://dummyjson.com/products/category/" + category,

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

function ProductCard({
	productList,
	categoryList,
}: {
	productList: {}[];
	categoryList: string[];
}) {
	const [categories, setCategories] = useState(categoryList);
	const [products, setProducts] = useState(productList);
	const [sortText, setSortText] = useState<any>({ id: 1, value: "Reset" });

	const handleClick = (category: any) => {
		if (category)
			getProductList(category).then((resp: any) => {
				setProducts(resp?.products);
			});
		else setProducts(productList);
		setSortText({ id: 1, value: "Reset" });
	};

	const handleSort = () => {
		if (sortText.id == 1) {
			setSortText({
				id: 2,
				value: "Low To High",
			});
			setLowToHigh();
		} else if (sortText.id == 2) {
			setSortText({
				id: 0,
				value: "High To Low",
			});
			setHighToLow();
		} else if (sortText.id == 0) {
			setSortText({
				id: 1,
				value: "Reset",
			});
			setReset();
		}
	};

	const setReset = () => {
		const sortedProducts = products.sort((a: any, b: any) => a.id - b.id);
		setProducts([...sortedProducts]);
	};
	const setLowToHigh = () => {
		const sortedProducts = products.sort((a: any, b: any) => a.price - b.price);
		setProducts([...sortedProducts]);
	};
	const setHighToLow = () => {
		const reverseSortedProducts = products.sort(
			(a: any, b: any) => b.price - a.price
		);
		setProducts([...reverseSortedProducts]);
	};

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center">
				<h2>Product List</h2>
				<div className="filter-section d-flex align-items-center">
					{categories && (
						<Dropdown data={categories} handleClick={handleClick} />
					)}
					<div className="sort-by-price">
						<button className="btn border ms-5" onClick={handleSort}>
							Price {sortText.value}
						</button>
					</div>
				</div>
			</div>
			<div className="product-group d-flex flex-wrap">
				{products?.map((item: any, index: number) => {
					return (
						<div className="single-product-card" key={index}>
							<Link href={`/product/${item.id}`}>
								<div className="single-product">
									<div className="product-img text-center mb-1">
										<img
											className="card-image"
											src={item.thumbnail}
											alt={item.title}
										/>
									</div>
									<div className="align-items-center  p-0 m-0">
										<p
											className="card-title body-1 text-center p-0 mb-2"
											title={item.title}
										>
											{item.title}
										</p>
									</div>
									<p className="caption text-center mb-1">Price</p>
									<div className="">
										<p className=" text-center subtitle-2 mb-0">{item.price}</p>
									</div>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ProductCard;
