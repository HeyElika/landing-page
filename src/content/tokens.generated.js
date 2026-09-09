// GENERATED FILE — do not edit. Run `npm run tokens` to regenerate.
// Extracted from tokens.css, landing.css, the icon set and the DS Button,
// scoped to what the live page paints.

export const tokenData = {
  "scale": [
    {
      "name": "--font-size-xs",
      "px": "13px",
      "from": "var(--text-sm)"
    },
    {
      "name": "--font-size-sm",
      "px": "14px",
      "from": "var(--text-md)"
    },
    {
      "name": "--font-size-md",
      "px": "16px",
      "from": "var(--text-lg)"
    },
    {
      "name": "--font-size-lg",
      "px": "20px",
      "from": "var(--text-xl)"
    },
    {
      "name": "--font-size-xl",
      "px": "24px",
      "from": "var(--text-2xl)"
    },
    {
      "name": "--font-size-2xl",
      "px": "32px",
      "from": "var(--text-3xl)"
    },
    {
      "name": "--font-size-3xl",
      "px": "40px",
      "from": "40px"
    },
    {
      "name": "--font-size-4xl",
      "px": "48px",
      "from": "48px"
    },
    {
      "name": "--font-size-5xl",
      "px": "56px",
      "from": "56px"
    },
    {
      "name": "--font-size-6xl",
      "px": "80px",
      "from": "80px"
    }
  ],
  "displaySteps": [
    {
      "step": "--display-sm",
      "cls": "display-sm",
      "weight": "600",
      "purpose": "Card and sub-section headings",
      "perTier": [
        {
          "tier": "Phone",
          "px": "20px"
        },
        {
          "tier": "Tablet 768+",
          "px": "24px"
        },
        {
          "tier": "Desktop 1200+",
          "px": "32px"
        }
      ]
    },
    {
      "step": "--display-md",
      "cls": "display-md",
      "weight": "700",
      "purpose": "Section headings",
      "perTier": [
        {
          "tier": "Phone",
          "px": "24px"
        },
        {
          "tier": "Tablet 768+",
          "px": "32px"
        },
        {
          "tier": "Desktop 1200+",
          "px": "48px"
        }
      ]
    },
    {
      "step": "--display-lg",
      "cls": "display-lg",
      "weight": "700",
      "purpose": "Hero headline",
      "perTier": [
        {
          "tier": "Phone",
          "px": "32px"
        },
        {
          "tier": "Tablet 768+",
          "px": "40px"
        },
        {
          "tier": "Desktop 1200+",
          "px": "56px"
        }
      ]
    },
    {
      "step": "--display-xl",
      "cls": "display-xl",
      "weight": "700",
      "purpose": "Full-screen statement",
      "perTier": [
        {
          "tier": "Phone",
          "px": "32px"
        },
        {
          "tier": "Tablet 768+",
          "px": "48px"
        },
        {
          "tier": "Desktop 1200+",
          "px": "80px"
        }
      ]
    }
  ],
  "fixed": [
    {
      "name": "heading-lg-regular",
      "uses": 6,
      "px": "24px",
      "tshirt": "--font-size-xl",
      "weight": "400",
      "lh": "1.25",
      "token": "var(--text-2xl)"
    },
    {
      "name": "heading-md-semibold",
      "uses": 8,
      "px": "20px",
      "tshirt": "--font-size-lg",
      "weight": "600",
      "lh": "1.25",
      "token": "20px"
    },
    {
      "name": "body-lg-regular",
      "uses": 3,
      "px": "20px",
      "tshirt": "--font-size-lg",
      "weight": "400",
      "lh": "1.5",
      "token": "20px"
    },
    {
      "name": "heading-sm-semibold",
      "uses": 4,
      "px": "16px",
      "tshirt": "--font-size-md",
      "weight": "600",
      "lh": "1.25",
      "token": "16px"
    },
    {
      "name": "body-md-regular",
      "uses": 22,
      "px": "16px",
      "tshirt": "--font-size-md",
      "weight": "400",
      "lh": "1.5",
      "token": "16px"
    },
    {
      "name": "link-md",
      "uses": 1,
      "px": "16px",
      "tshirt": "--font-size-md",
      "weight": "600",
      "lh": "1.5",
      "token": "16px"
    },
    {
      "name": "body-sm-regular",
      "uses": 1,
      "px": "14px",
      "tshirt": "--font-size-sm",
      "weight": "400",
      "lh": "1.5",
      "token": "14px"
    },
    {
      "name": "body-xs-regular",
      "uses": 5,
      "px": "13px",
      "tshirt": "--font-size-xs",
      "weight": "400",
      "lh": "1.5",
      "token": "13px"
    }
  ],
  "semantic": [
    {
      "label": "Background",
      "items": [
        {
          "name": "--bg-base",
          "primitive": "--color-neutral-white",
          "hex": "#FFFFFF"
        },
        {
          "name": "--bg-subtle",
          "primitive": "--color-neutral-100",
          "hex": "#F5F5F5"
        },
        {
          "name": "--bg-primary",
          "primitive": "--color-red-500",
          "hex": "#E7161A"
        }
      ]
    },
    {
      "label": "Text",
      "items": [
        {
          "name": "--text-base",
          "primitive": "--color-neutral-900",
          "hex": "#1A1A1A"
        },
        {
          "name": "--text-subtle",
          "primitive": "--color-neutral-700",
          "hex": "#545454"
        },
        {
          "name": "--text-disabled",
          "primitive": "--color-neutral-400",
          "hex": "#B0B0B0"
        },
        {
          "name": "--text-on-dark",
          "primitive": "--color-neutral-white",
          "hex": "#FFFFFF"
        },
        {
          "name": "--text-on-dark-subtle",
          "primitive": "--alpha-white-70",
          "hex": "#FFFFFFB3"
        },
        {
          "name": "--text-on-dark-disabled",
          "primitive": "--alpha-white-50",
          "hex": "#FFFFFF80"
        }
      ]
    },
    {
      "label": "Border",
      "items": [
        {
          "name": "--border-subtle",
          "primitive": "--color-neutral-200",
          "hex": "#E0E0E0"
        },
        {
          "name": "--border-bold",
          "primitive": "--color-neutral-500",
          "hex": "#919191"
        },
        {
          "name": "--border-heavy",
          "primitive": "--color-neutral-800",
          "hex": "#363636"
        },
        {
          "name": "--border-active",
          "primitive": "--color-blue-600",
          "hex": "#265CE5"
        }
      ]
    },
    {
      "label": "Icon",
      "items": [
        {
          "name": "--icon-base",
          "primitive": "--color-neutral-900",
          "hex": "#1A1A1A"
        },
        {
          "name": "--icon-subtle",
          "primitive": "--color-neutral-700",
          "hex": "#545454"
        }
      ]
    },
    {
      "label": "Transparency",
      "items": [
        {
          "name": "--alpha-white-50",
          "primitive": null,
          "hex": "#FFFFFF80"
        },
        {
          "name": "--alpha-white-70",
          "primitive": null,
          "hex": "#FFFFFFB3"
        },
        {
          "name": "--alpha-black-10",
          "primitive": null,
          "hex": "#0000001A"
        },
        {
          "name": "--alpha-black-20",
          "primitive": null,
          "hex": "#00000033"
        },
        {
          "name": "--alpha-black-30",
          "primitive": null,
          "hex": "#0000004D"
        },
        {
          "name": "--alpha-black-70",
          "primitive": null,
          "hex": "#000000B3"
        }
      ]
    }
  ],
  "primitives": [
    {
      "name": "--color-neutral-100",
      "hex": "#F5F5F5",
      "via": [
        "--bg-subtle"
      ]
    },
    {
      "name": "--color-red-500",
      "hex": "#E7161A",
      "via": [
        "--bg-primary"
      ]
    },
    {
      "name": "--color-blue-600",
      "hex": "#265CE5",
      "via": [
        "--border-active"
      ]
    },
    {
      "name": "--color-blue-700",
      "hex": "#204BBA",
      "via": []
    },
    {
      "name": "--color-neutral-200",
      "hex": "#E0E0E0",
      "via": [
        "--border-subtle"
      ]
    },
    {
      "name": "--color-neutral-400",
      "hex": "#B0B0B0",
      "via": [
        "--text-disabled"
      ]
    },
    {
      "name": "--color-neutral-500",
      "hex": "#919191",
      "via": [
        "--border-bold"
      ]
    },
    {
      "name": "--color-neutral-700",
      "hex": "#545454",
      "via": [
        "--text-subtle",
        "--icon-subtle"
      ]
    },
    {
      "name": "--color-neutral-800",
      "hex": "#363636",
      "via": [
        "--border-heavy"
      ]
    },
    {
      "name": "--color-neutral-900",
      "hex": "#1A1A1A",
      "via": [
        "--text-base",
        "--icon-base"
      ]
    },
    {
      "name": "--color-neutral-white",
      "hex": "#FFFFFF",
      "via": [
        "--bg-base",
        "--text-on-dark"
      ]
    }
  ],
  "icons": [
    "close",
    "burger-menu",
    "wallet",
    "cash",
    "card",
    "auto-debit",
    "repayment",
    "installment-outline",
    "bill",
    "store",
    "calendar-outline",
    "clock",
    "security",
    "incognito",
    "lock",
    "chat-outline",
    "user",
    "document",
    "phone"
  ],
  "iconSizes": [
    {
      "name": "--icon-size-sm",
      "tshirt": "sm",
      "px": "20px"
    },
    {
      "name": "--icon-size-md",
      "tshirt": "md",
      "px": "24px"
    }
  ],
  "buttons": {
    "heights": {
      "xl": "52",
      "lg": "48",
      "md": "40",
      "sm": "32"
    },
    "padding": {
      "xl": "24",
      "lg": "20",
      "md": "16",
      "sm": "12"
    },
    "overlay": {
      "hover": "var(--alpha-black-10)",
      "pressed": "var(--alpha-black-30)"
    },
    "variants": [
      {
        "key": "primary",
        "label": "Primary",
        "bg": "var(--bg-primary)",
        "text": "var(--text-on-dark)",
        "disabledBg": "var(--bg-primary)",
        "disabledText": "rgba(255,255,255,0.5)"
      },
      {
        "key": "secondary",
        "label": "Secondary",
        "bg": "var(--bg-sunken)",
        "text": "var(--text-base)",
        "disabledBg": "var(--bg-sunken)",
        "disabledText": "var(--text-disabled)"
      },
      {
        "key": "ghost",
        "label": "Text link",
        "bg": "transparent",
        "text": "var(--text-subtle)",
        "disabledBg": "transparent",
        "disabledText": "var(--text-disabled)"
      }
    ]
  }
}

export default tokenData
