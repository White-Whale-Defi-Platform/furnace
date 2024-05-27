interface Props {
  color?: string
  width?: number
  height?: number
}

export const Discord: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = '#00ff94',
}: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 21 16" fill="none">
      <path
        d="M18.1036 1.95846C16.3721 0.567031 13.6343 0.331322 13.5186 0.321322C13.3357 0.305602 13.1621 0.409182 13.0871 0.576322C13.0843 0.582032 12.9314 1.0256 12.7836 1.45346C14.7957 1.8056 16.1629 2.58703 16.2357 2.62989C16.5771 2.82846 16.6914 3.26632 16.4921 3.60703C16.36 3.83417 16.1207 3.96132 15.875 3.96132C15.7529 3.96132 15.63 3.9306 15.5171 3.86489C15.4971 3.85275 13.4914 2.71132 10.8764 2.71132C8.26071 2.71132 6.25429 3.85346 6.23429 3.86489C5.89357 4.06275 5.45643 3.94632 5.25857 3.60489C5.06071 3.26489 5.17571 2.82846 5.51571 2.62989C5.58857 2.58703 6.96071 1.80275 8.97857 1.45132C8.82286 1.01846 8.66571 0.582032 8.66286 0.576322C8.58786 0.408462 8.41429 0.302752 8.23143 0.321322C8.11571 0.330602 5.37786 0.566322 3.62357 1.97703C2.70643 2.82418 0.875 7.77701 0.875 12.0592C0.875 12.1349 0.894286 12.2085 0.932143 12.2742C2.19714 14.4956 5.64571 15.077 6.43143 15.102C6.43643 15.1027 6.44071 15.1027 6.445 15.1027C6.58357 15.1027 6.71429 15.0363 6.79643 14.9242L7.64643 13.7727C5.78214 13.3235 4.79643 12.617 4.73714 12.5734C4.42 12.3399 4.35143 11.8927 4.585 11.5749C4.81786 11.2585 5.26357 11.1885 5.58071 11.4206C5.60714 11.4377 7.42643 12.7113 10.875 12.7113C14.3371 12.7113 16.1514 11.4327 16.1693 11.4199C16.4864 11.1899 16.9336 11.2592 17.1657 11.5777C17.3971 11.8949 17.33 12.3392 17.0143 12.572C16.955 12.6156 15.9743 13.3206 14.1143 13.7699L14.9536 14.9234C15.0357 15.0363 15.1664 15.102 15.305 15.102C15.31 15.102 15.3143 15.102 15.3186 15.1013C16.105 15.0763 19.5536 14.4949 20.8179 12.2734C20.8557 12.2077 20.875 12.1342 20.875 12.0585C20.875 7.77701 19.0436 2.82418 18.1036 1.95846ZM8.01786 10.5685C7.22857 10.5685 6.58929 9.76921 6.58929 8.78271C6.58929 7.79631 7.22857 6.99703 8.01786 6.99703C8.80714 6.99703 9.44643 7.79631 9.44643 8.78271C9.44643 9.76921 8.80714 10.5685 8.01786 10.5685ZM13.7321 10.5685C12.9429 10.5685 12.3036 9.76921 12.3036 8.78271C12.3036 7.79631 12.9429 6.99703 13.7321 6.99703C14.5214 6.99703 15.1607 7.79631 15.1607 8.78271C15.1607 9.76921 14.5214 10.5685 13.7321 10.5685Z"
        fill={color}
      />
    </svg>
  )
}
