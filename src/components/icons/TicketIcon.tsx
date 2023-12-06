import React from 'react'
import { IconSvgProps } from "../../utils/type";
export default function TicketIcon({ width, height, ...props }: IconSvgProps) {
    return (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.34961 1.78125C8.60848 1.78125 8.81836 1.99111 8.81836 2.25V3.90953C8.81836 4.16841 8.60848 4.37828 8.34961 4.37828C8.09067 4.37828 7.88086 4.16841 7.88086 3.90953V2.25C7.88086 1.99111 8.09067 1.78125 8.34961 1.78125Z" fill="#0DC600" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.34961 10.4962C8.60848 10.4962 8.81836 10.7061 8.81836 10.965V12.3525C8.81836 12.6114 8.60848 12.8213 8.34961 12.8213C8.09067 12.8213 7.88086 12.6114 7.88086 12.3525V10.965C7.88086 10.7061 8.09067 10.4962 8.34961 10.4962Z" fill="#0DC600" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.34961 5.3158C8.60848 5.3158 8.81836 5.52566 8.81836 5.78455V9.08995C8.81836 9.34883 8.60848 9.5587 8.34961 9.5587C8.09067 9.5587 7.88086 9.34883 7.88086 9.08995V5.78455C7.88086 5.52566 8.09067 5.3158 8.34961 5.3158Z" fill="#0DC600" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.98675 1.93779C4.86169 1.78502 6.00678 1.71875 7.5 1.71875C8.99325 1.71875 10.1383 1.78502 11.0133 1.93779C11.8847 2.08996 12.5371 2.33579 13.0004 2.73299C13.4783 3.14266 13.7009 3.66612 13.8061 4.2523C13.9063 4.81071 13.9063 5.46906 13.9063 6.1846V6.21792C13.9063 6.47681 13.6964 6.68669 13.4375 6.68669C13.1469 6.68669 12.9621 6.79244 12.8444 6.92706C12.7186 7.07087 12.6449 7.27713 12.6449 7.49969C12.6449 7.72231 12.7186 7.9285 12.8444 8.07231C12.9621 8.20694 13.1469 8.31275 13.4375 8.31275C13.6964 8.31275 13.9063 8.52262 13.9063 8.7815V8.81481C13.9063 9.5305 13.9063 10.1889 13.8061 10.7474C13.7009 11.3337 13.4783 11.8572 13.0004 12.2669C12.5371 12.6642 11.8847 12.91 11.0133 13.0622C10.1383 13.215 8.99325 13.2812 7.5 13.2812C6.00678 13.2812 4.86168 13.215 3.98675 13.0622C3.11533 12.91 2.46286 12.6642 1.99957 12.2669C1.52174 11.8572 1.29906 11.3337 1.19389 10.7474C1.09371 10.1889 1.09373 9.5305 1.09375 8.81481V8.7815C1.09375 8.52262 1.30362 8.31275 1.5625 8.31275C1.85307 8.31275 2.03789 8.20694 2.15564 8.07231C2.28142 7.9285 2.35504 7.72231 2.35504 7.49969C2.35504 7.27713 2.28142 7.07087 2.15564 6.92706C2.03789 6.79244 1.85307 6.68669 1.5625 6.68669C1.30362 6.68669 1.09375 6.47681 1.09375 6.21792V6.1846C1.09373 5.46906 1.09371 4.81071 1.19389 4.2523C1.29906 3.66612 1.52176 3.14266 1.99959 2.73299C2.46288 2.33579 3.11534 2.08996 3.98675 1.93779ZM2.03198 5.80574C2.36933 5.89099 2.65014 6.06846 2.86129 6.30988C3.15594 6.64675 3.29254 7.08138 3.29254 7.49969C3.29254 7.918 3.15594 8.35269 2.86129 8.68956C2.65014 8.93094 2.36933 9.10844 2.03198 9.19369C2.03483 9.75331 2.04877 10.2034 2.11666 10.5819C2.19704 11.03 2.34544 11.3286 2.60981 11.5553C2.88871 11.7944 3.34952 11.9992 4.14802 12.1387C4.94301 12.2775 6.02448 12.3438 7.5 12.3438C8.9755 12.3438 10.057 12.2775 10.852 12.1387C11.6505 11.9992 12.1113 11.7944 12.3902 11.5553C12.6546 11.3286 12.8029 11.03 12.8833 10.5819C12.9513 10.2034 12.9652 9.75331 12.968 9.19369C12.6307 9.10844 12.3499 8.93094 12.1387 8.68956C11.8441 8.35269 11.7074 7.918 11.7074 7.49969C11.7074 7.08138 11.8441 6.64675 12.1387 6.30988C12.3499 6.06846 12.6307 5.891 12.968 5.80575C12.9652 5.24622 12.9513 4.79624 12.8834 4.41786C12.8029 3.96986 12.6546 3.67137 12.3902 3.44472C12.1113 3.2056 11.6505 3.00076 10.852 2.86132C10.057 2.7225 8.9755 2.65625 7.5 2.65625C6.02448 2.65625 4.94301 2.7225 4.14802 2.86132C3.34951 3.00076 2.88869 3.2056 2.60979 3.44472C2.34543 3.67137 2.19704 3.96986 2.11666 4.41786C2.04877 4.79624 2.03483 5.24623 2.03198 5.80574Z" fill="#0DC600" />
    </svg>)
}
