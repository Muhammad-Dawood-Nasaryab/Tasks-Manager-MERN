import React from "react";
import { Outlet } from "react-router-dom";

import Modal from "./Modal";
import Navbar from "./Navbar";

const LayoutComponent = () => {
	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Modal />
		</>
	);
};

export default LayoutComponent;
