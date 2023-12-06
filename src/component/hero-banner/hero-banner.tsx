"use client";
import Link from "next/link";
import React from "react";
import "./hero-banner.scss";

interface IHeroBanner {
	imageList: any[];
	delay?: number;
}

const HeroBanner = ({ imageList, delay = 5000 }: IHeroBanner) => {
	const [active, setActive] = React.useState<any>(0);
	const [autoplay] = React.useState<any>(1);
	const max = imageList?.length;

	const intervalBetweenSlides = () =>
		autoplay && setActive(active === max - 1 ? 0 : active + 1);

	React.useEffect(() => {
		const interval = setInterval(() => intervalBetweenSlides(), delay);
		return () => clearInterval(interval);
	});

	const nextOne = () => active < max - 1 && setActive(active + 1);
	const prevOne = () => active > 0 && setActive(active - 1);
	const isActive = (value: any) => active === value && "active";

	const setSliderStyles = () => {
		const sliderWidth = getWidth();
		const transition = active * -sliderWidth;
		return {
			width: imageList?.length * sliderWidth + "px",
			transform: "translateX(" + transition + "px)",
		};
	};

	const getWidth = () => {
		const sliderSection = document.querySelector(".container");
		let width = sliderSection?.clientWidth || 0;
		if (width && width != 0) width = +width - 24;
		return width || 0;
	};


	return (
		<section className="hero-slider">
			<div className="wrapper" style={setSliderStyles()}>
				{imageList?.map((item, index) => (
					<div
						className="each-slide"
						key={index}
						style={{
							backgroundImage: `url(${JSON.stringify(item)})`,
							width: getWidth(),
						}}
					>
						
					</div>
				))}
			</div>
			<button type="button" className="arrows prev" onClick={() => prevOne()}>
				<svg viewBox="0 0 24 24">
					<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
					<path d="M0 0h24v24H0z" fill="none" />
				</svg>
			</button>
			<button type="button" className="arrows next" onClick={() => nextOne()}>
				<svg viewBox="0 0 24 24" width="50">
					<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
					<path d="M0 0h24v24H0z" fill="none" />
				</svg>
			</button>
			<ul className="dots-container">
				{imageList?.map((_, index) => (
					<li className={isActive(index) + " dots"} key={index}>
						<button onClick={() => setActive(index)}>
							<span>&#9679;</span>
						</button>
					</li>
				))}
			</ul>
		</section>
	);
};

export default HeroBanner;
