import React from "react";
import {IconSvgProps} from "../../utils/type";

export const SidebarIcon = ({ width,color, ...props}: IconSvgProps) => (
<svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.9349 18.3659C31.1015 18.3659 33.6663 20.8876 33.6663 23.9987C33.6663 27.108 31.1015 29.6296 27.9349 29.6296C24.7701 29.6296 22.2034 27.108 22.2034 23.9987C22.2034 20.8876 24.7701 18.3659 27.9349 18.3659ZM13.8052 21.5966C15.1922 21.5966 16.3181 22.7028 16.3181 24.0655C16.3181 25.4263 15.1922 26.5343 13.8052 26.5343H2.84596C1.45893 26.5343 0.333008 25.4263 0.333008 24.0655C0.333008 22.7028 1.45893 21.5966 2.84596 21.5966H13.8052ZM6.06446 0C9.23111 0 11.7959 2.52164 11.7959 5.63093C11.7959 8.74205 9.23111 11.2637 6.06446 11.2637C2.89966 11.2637 0.333008 8.74205 0.333008 5.63093C0.333008 2.52164 2.89966 0 6.06446 0ZM31.1552 3.16388C32.5404 3.16388 33.6663 4.27005 33.6663 5.63093C33.6663 6.99364 32.5404 8.09981 31.1552 8.09981H20.196C18.809 8.09981 17.6831 6.99364 17.6831 5.63093C17.6831 4.27005 18.809 3.16388 20.196 3.16388H31.1552Z" fill={color}/>
</svg>
)