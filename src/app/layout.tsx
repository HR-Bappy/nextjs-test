import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Static meta data",
	description: "Static page metadata",
	openGraph: {
		url: "https://example.com",
		title: "My Website",
		description: "My Website Description",
		siteName: "My Website",
		images: [
			{
				url: "https://pragativadi.com/wp-content/uploads/2021/02/SpaceX-Tesmanian_1600x.jpg",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}
			<script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
				crossOrigin="anonymous"
			/>
			</body>
		</html>
	);
}
