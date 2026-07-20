export default function LogoSVG({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      style={{ opacity: 0 }}
      className={className}
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id="tesla-awwwards-shadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="10"
            floodColor="#f25f00"
            floodOpacity="0.2"
          />
        </filter>

        <linearGradient
          id="tesla-solid-orange"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="50%" stopColor="#f25f00" />
          <stop offset="100%" stopColor="#731d00" />
        </linearGradient>
      </defs>

      <g
        filter="url(#tesla-awwwards-shadow)"
        fill="url(#tesla-solid-orange)"
      >
       <path
  className="logo-wing-fill"
  d="M 80,130
     Q 300,75 520,130
     Q 300,110 80,130 Z"
/>

<path
  className="logo-wing-stroke"
  fill="none"
  stroke="#ff8c00"
  strokeWidth="5"
  strokeLinecap="round"
  d="M 80,130
     Q 300,75 520,130
     Q 300,110 80,130 Z"
/>
        <path
  className="logo-body-fill"
  d="M 100,170
     Q 300,215 500,170
     L 450,225
     Q 350,250 350,260
     L 350,470
     Q 350,500 320,500
     L 280,500
     Q 250,500 250,470
     L 250,260
     Q 250,250 150,225
     Z"
/>
<path
  className="logo-body-stroke"
  fill="none"
  stroke="#ff8c00"
  strokeWidth="5"
  strokeLinecap="round"
  d="M 100,170
     Q 300,215 500,170
     L 450,225
     Q 350,250 350,260
     L 350,470
     Q 350,500 320,500
     L 280,500
     Q 250,500 250,470
     L 250,260
     Q 250,250 150,225
     Z"
/>
      </g>
    </svg>
  );
}