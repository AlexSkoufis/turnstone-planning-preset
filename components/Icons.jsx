const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

export function ArrowRight({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Phone({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 4h3.5l1.8 4.4-2.3 1.4a11 11 0 0 0 5.2 5.2l1.4-2.3L19 14.5V18a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function Pin({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function Check({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Plus({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Lock({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...props}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

export function Download({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
    </svg>
  );
}

/* Section icons */
export function IconInvestments(props) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" {...base} {...props}>
      <path d="M4 26h24" />
      <path d="M7 21l6-6 5 4 9-10" />
      <path d="M21 9h6v6" />
    </svg>
  );
}

export function IconInsurance(props) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 4 6 8v7c0 6.3 4.2 11 10 13 5.8-2 10-6.7 10-13V8L16 4Z" />
      <path d="m11.5 16 3.2 3.2 6-6.4" />
    </svg>
  );
}

export function IconTaxes(props) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" {...base} {...props}>
      <rect x="7" y="4" width="18" height="24" rx="2.5" />
      <path d="M11 10h10M11 15h10M11 20h5" />
      <path d="m19 23 4-4" />
    </svg>
  );
}

export function IconLegacy(props) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" {...base} {...props}>
      <path d="M16 28V15" />
      <path d="M16 15c0-5 3.5-9 9-9 0 5.5-3.8 9-9 9Z" />
      <path d="M16 19c0-4-2.8-7-7-7 0 4.2 3 7 7 7Z" />
      <path d="M9 28h14" />
    </svg>
  );
}

export function IconTraining(props) {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" {...base} {...props}>
      <path d="M3 12 16 6l13 6-13 6L3 12Z" />
      <path d="M8 14.5V21c2.4 2 5 3 8 3s5.6-1 8-3v-6.5" />
      <path d="M29 12v7" />
    </svg>
  );
}

export function IconExperience(props) {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" {...base} {...props}>
      <path d="M4 22c4-1 6-6 12-6s8 5 12 6" />
      <path d="M4 27h24" />
      <circle cx="16" cy="9" r="4" />
    </svg>
  );
}

export function IconFamily(props) {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" {...base} {...props}>
      <circle cx="10" cy="9" r="3.2" />
      <circle cx="22" cy="9" r="3.2" />
      <circle cx="16" cy="17" r="2.4" />
      <path d="M4 26c0-4 2.7-7 6-7 1.4 0 2.6.4 3.6 1.2" />
      <path d="M28 26c0-4-2.7-7-6-7-1.4 0-2.6.4-3.6 1.2" />
      <path d="M12 27c0-2.6 1.8-4.6 4-4.6s4 2 4 4.6" />
    </svg>
  );
}

export const serviceIcons = {
  investments: IconInvestments,
  insurance: IconInsurance,
  taxes: IconTaxes,
  legacy: IconLegacy,
};

export const whyIcons = {
  training: IconTraining,
  experience: IconExperience,
  family: IconFamily,
};
