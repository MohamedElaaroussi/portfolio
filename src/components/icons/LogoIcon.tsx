import React from 'react'
import { IconSvgProps } from "../../utils/type";

export default function LogoIcon({ width=93,height=105, color, ...props }: IconSvgProps) {
    return(
<svg width={width} height={height} viewBox="0 0 93 105" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M47.1424 0L0.0939557 26.8193L0.0522461 46.256L63.6595 9.80177L47.1424 0Z" fill={color}/>
<path d="M42.2627 31.9495L0.0524902 56.1828L0.0941999 80.2492L16.6946 90.1344L16.9032 65.6509L42.2627 51.2193V31.9495Z" fill={color}/>
<path d="M50.9802 26.9024V104.649L92.7316 80.5411L92.8567 51.5111L76.4231 60.8541L76.5482 70.7393L67.5807 75.8696L67.1636 36.9545L76.0894 31.8659L76.0477 51.7614L92.8567 42.1265V27.2778L72.127 14.8066L50.9802 26.9024Z" fill="#0DC600"/>
<path d="M23.2013 76.4954C22.6174 78.3724 22.3254 80.3744 22.3254 82.4599C22.3254 88.1324 24.5361 93.2627 28.3733 96.9749C31.7935 100.312 36.5067 102.481 42.0124 102.898H42.0541C42.3878 102.898 42.638 102.647 42.638 102.314V101.897C42.638 101.605 42.3878 101.354 42.0958 101.313C38.0083 101.021 34.4212 99.6443 31.5433 97.5588C31.9187 97.5588 32.294 97.6005 32.7111 97.6005C33.1282 97.6005 33.5453 97.6005 33.9624 97.5588C34.2127 97.5588 34.4212 97.5171 34.6298 97.4754C35.0469 97.8091 35.8394 98.393 36.8821 99.0603C38.2585 99.8945 40.052 100.812 41.9707 101.146C42.0124 101.146 42.0541 101.146 42.0541 101.146C42.3878 101.146 42.638 100.896 42.638 100.562V100.103C42.638 99.8111 42.4295 99.6026 42.1792 99.5191C40.636 99.2272 39.0093 98.4347 37.7163 97.6422C37.0072 97.2251 36.4233 96.808 36.0062 96.4743C35.8394 96.3492 35.7142 96.2658 35.6308 96.1824C35.6308 95.7653 35.5891 95.3482 35.5891 94.9728C35.5891 93.1793 35.7977 91.7612 36.0062 90.8018C36.0896 90.3847 36.173 90.0511 36.2565 89.8008C38.9676 89.4671 41.1365 88.5078 42.3461 87.8822C42.5546 87.7987 42.638 87.5902 42.638 87.3816V86.8811C42.638 86.7143 42.5546 86.5474 42.4712 86.464C42.3461 86.3806 42.2209 86.2972 42.0541 86.2972C41.9707 86.2972 41.8873 86.3389 41.7621 86.3806C40.6777 86.9645 38.4254 88.0073 35.6725 88.2575C35.2971 87.9239 34.7132 87.2982 34.0876 86.5474C33.17 85.4213 32.1689 83.9615 31.585 82.5016C31.7935 82.0845 32.2106 81.292 32.7946 80.3327C33.5453 79.1231 34.5881 77.6633 35.756 76.5371C36.2148 76.6206 37.0072 76.7457 37.9249 76.9959C39.1344 77.3296 40.5526 77.8301 41.7204 78.5809C41.8039 78.6226 41.929 78.6643 42.0124 78.6643C42.1792 78.6643 42.3044 78.6226 42.4295 78.4975C42.5546 78.4141 42.5963 78.2472 42.5963 78.0804V77.5799C42.5963 77.3713 42.4712 77.2045 42.3044 77.0794C40.9279 76.2452 39.4264 75.7447 38.1751 75.411C37.2992 75.1607 36.5067 75.0356 36.0479 74.9522C35.9645 74.6185 35.8811 74.1597 35.7977 73.7009C35.6308 72.6164 35.5474 71.3234 35.5057 70.3224C35.5057 69.8219 35.464 69.3631 35.464 69.0711C35.464 69.0294 35.464 68.9877 35.464 68.9043C37.0907 67.361 38.9676 66.4434 40.4691 65.9429C41.0948 65.7343 41.6787 65.5675 42.0958 65.4841C42.3461 65.4424 42.5546 65.1921 42.5546 64.9001V64.4413C42.5546 64.1077 42.3044 63.8574 41.9707 63.8574C41.929 63.8574 41.8873 63.8574 41.8456 63.8574C41.345 63.9825 40.6777 64.1494 39.9269 64.3996C38.3419 64.9418 36.2982 65.9012 34.5047 67.5696C33.9624 67.4861 32.878 67.4027 31.6684 67.4027C31.585 67.4027 31.5433 67.4027 31.4599 67.4027C34.3378 65.2755 37.9249 63.8991 42.0124 63.5654C42.3044 63.5237 42.5546 63.2735 42.5546 62.9815V62.5644C42.5546 62.2307 42.3044 61.9805 41.9707 61.9805C41.9707 61.9805 41.9707 61.9805 41.929 61.9805C36.5484 62.3976 31.8352 64.5665 28.4151 67.9032C26.0793 70.1556 24.3275 72.9501 23.2848 76.0783L23.2013 76.4954ZM23.9521 81.0001C24.119 81.5423 24.3275 82.0428 24.5361 82.5016C24.4109 82.8353 24.1607 83.4609 23.9521 84.17C23.9104 83.6278 23.8687 83.0438 23.8687 82.4599C23.9104 81.9594 23.9104 81.4589 23.9521 81.0001ZM24.9949 86.5057C25.2034 85.5881 25.4954 84.6288 25.7456 83.9615C25.8291 83.7112 25.9125 83.4609 25.9959 83.2941H30.1251C30.8342 85.0042 31.9187 86.5474 32.9197 87.7153C33.6288 88.5495 34.2544 89.1752 34.6298 89.5505C34.3795 90.5099 33.9624 92.4285 33.9624 95.0562C33.9624 95.0562 33.9624 95.0562 33.9624 95.0979C33.9624 95.3899 33.9624 95.6819 33.9624 95.9738C33.9207 95.9738 33.8373 95.9738 33.7956 95.9738C33.4619 96.0155 33.0865 96.0155 32.6694 96.0155C31.8352 96.0155 30.9593 95.9738 30.3337 95.9321C30 95.8904 29.708 95.8904 29.4995 95.8904H29.4578C27.2889 93.7632 25.6622 91.0938 24.7446 88.1324L24.7029 88.0073C24.7029 87.5902 24.8697 87.0897 24.9949 86.5057ZM31.7101 69.0294C32.5026 69.0294 33.2534 69.0711 33.7956 69.1545C33.8373 69.1545 33.8373 69.1545 33.879 69.1545C33.879 69.6968 33.9207 70.5727 33.9624 71.532C34.0041 72.3245 34.0876 73.2004 34.2127 73.9511C34.2961 74.4934 34.3795 75.0356 34.5464 75.4944C33.2117 76.7874 32.1272 78.3306 31.3347 79.6236C30.7925 80.4995 30.4171 81.2086 30.1669 81.6674H25.9125C25.7456 81.292 25.5788 80.8749 25.4537 80.4578C25.1617 79.5402 24.9949 78.5392 24.9114 77.7467C24.8697 77.3713 24.828 77.0377 24.828 76.7874C24.828 76.7457 24.828 76.704 24.828 76.6623C25.7456 73.826 27.3306 71.2817 29.4161 69.1962C30.1251 69.0711 30.9593 69.0294 31.7101 69.0294Z" fill="#0DC600"/>
</svg>
)
}