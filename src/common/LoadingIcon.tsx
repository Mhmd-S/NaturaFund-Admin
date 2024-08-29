import React from 'react';

const LoadingIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<circle cx="12" cy="12" r="0">
				<animate
					id="spinner_kIfO"
					fill="freeze"
					attributeName="r"
					begin="0;spinner_xBIM.end"
					calcMode="spline"
					dur="1.2s"
					keySplines=".52,.6,.25,.99"
					values="0;11"
				></animate>
				<animate
					fill="freeze"
					attributeName="opacity"
					begin="0;spinner_xBIM.end"
					calcMode="spline"
					dur="1.2s"
					keySplines=".52,.6,.25,.99"
					values="1;0"
				></animate>
			</circle>
			<circle cx="12" cy="12" r="0">
				<animate
					fill="freeze"
					attributeName="r"
					begin="spinner_kIfO.begin+0.2s"
					calcMode="spline"
					dur="1.2s"
					keySplines=".52,.6,.25,.99"
					values="0;11"
				></animate>
				<animate
					fill="freeze"
					attributeName="opacity"
					begin="spinner_kIfO.begin+0.2s"
					calcMode="spline"
					dur="1.2s"
					keySplines=".52,.6,.25,.99"
					values="1;0"
				></animate>
			</circle>
			<circle cx="12" cy="12" r="0">
				<animate
					id="spinner_xBIM"
					fill="freeze"
					attributeName="r"
					begin="spinner_kIfO.begin+0.4s"
					calcMode="spline"
					dur="1.2s"
					keySplines=".52,.6,.25,.99"
					values="0;11"
				></animate>
				<animate
					fill="freeze"
					attributeName="opacity"
					begin="spinner_kIfO.begin+0.4s"
					calcMode="spline"
					dur="1.2s"
					keySplines=".52,.6,.25,.99"
					values="1;0"
				></animate>
			</circle>
		</svg>
	);
};
export default LoadingIcon;