import React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export function LegalScalesIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 3v17" />
      <path d="M5 20h14" />
      <path d="M4 7h16" />
      <path d="M4 7l-2 7h6L4 7z" />
      <path d="M20 7l-2 7h6L20 7z" />
      <circle cx="12" cy="4" r="1.5" />
    </svg>
  )
}

export function LexBridgeMark({ size = 32, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      {...props}
    >
      <rect width="36" height="36" rx="6" fill="#0F172A" />
      <path d="M8 28h20" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M11 28v-6c0-3.866 3.134-7 7-7s7 3.134 7 7v6"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M18 8v20" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 12h14" stroke="#F8FAFC" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M11 12l-2.5 5h5L11 12z" stroke="#38BDF8" strokeWidth="1.25" fill="#38BDF8" fillOpacity="0.25" />
      <path d="M25 12l-2.5 5h5L25 12z" stroke="#38BDF8" strokeWidth="1.25" fill="#38BDF8" fillOpacity="0.25" />
    </svg>
  )
}

export function LexiconTranslateIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 5h7M7.5 5v14M5 19h5" />
      <path d="M14 10l3.5 9 3.5-9" />
      <path d="M15.5 15h4" />
      <path d="M13 5h6" />
      <path d="M16 3v2" />
    </svg>
  )
}

export function DocumentVaultIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <rect x="9" y="13" width="6" height="5" rx="1" />
      <path d="M10 13V11a2 2 0 0 1 4 0v2" />
    </svg>
  )
}

export function AsylumSealIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="10" r="7" />
      <path d="M12 7v6" />
      <path d="M9 10h6" />
      <path d="M8.5 16l-1.5 5 5-2 5 2-1.5-5" />
    </svg>
  )
}

export function DossierIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 4h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  )
}

export function AttorneyReviewIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      <path d="M15 5l3 3" />
    </svg>
  )
}

export function ApiKeyIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M10.5 12.5L20 3" />
      <path d="M16 3l4 4" />
      <path d="M14 7l2 2" />
    </svg>
  )
}
