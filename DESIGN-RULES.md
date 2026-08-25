# Billease Landing Page Design Rules

## Purpose

Use this file as the design and implementation guardrail for Billease product landing pages, including the Access Card activation page.

The goal is to make new landing pages feel native to the Billease product ecosystem rather than like a separate marketing website.

These rules are based on the provided Billease design tokens. When a Figma component-library link is available, component-library usage takes priority over recreating components from scratch.

---

## 1. Source of truth

Use this priority order:

1. Existing Billease component library
2. Billease semantic tokens
3. Billease primitive tokens
4. New local styling only when no existing token or component can solve the problem

Do not invent new colors, spacing values, typography styles, radii, or shadows if an existing token can be used.

Prefer semantic tokens over primitives in implementation.

Example:
- Use `bg/primary`, not hardcoded `#E7161A`
- Use `text/base`, not hardcoded `#1A1A1A`
- Use `border/subtle`, not hardcoded `#E0E0E0`

---

## 2. Brand and visual character

Billease pages should feel:

- Clean
- Product-led
- Modern
- Friendly but not playful to the point of reducing trust
- Financially credible
- Visually consistent with the Billease app
- Focused on clarity and action rather than decorative marketing

Avoid:
- Generic SaaS landing-page aesthetics
- Excessive gradients
- Excessive floating cards
- Large decorative shadows
- Random illustration styles
- New brand colors not defined in the token set
- Overly rounded “bubble” UI unless an existing Billease component uses it
- Marketing layouts that look disconnected from the in-app product

Product visuals, real UI, card renders, icons, and simple branded graphics should carry most of the visual identity.

---

## 3. Typography

### Font family

Use:

`Source Sans Pro`

Do not substitute another font unless explicitly requested.

### Approved heading styles

Use only existing typography tokens:

- `heading/heading-xl-bold`
  - 32px
  - Bold
  - 125% line height

- `heading/heading-lg-bold`
  - 24px
  - Bold
  - 125% line height

- `heading/heading-lg-semibold`
  - 24px
  - SemiBold
  - 125% line height

- `heading/heading-md-bold`
  - 20px
  - Bold
  - 150% line height

- `heading/heading-md-semibold`
  - 20px
  - SemiBold
  - 125% line height

- `heading/heading-sm-semibold`
  - 16px
  - SemiBold
  - 125% line height

- `heading/heading-xs-semibold`
  - 14px
  - SemiBold
  - 125% line height

### Approved body styles

Use:

- `body/body-lg-semibold`
- `body/body-lg-regular`
- `body/body-md-semibold`
- `body/body-md-regular`
- `body/body-sm-semibold`
- `body/body-sm-regular`
- `body/body-xs-semibold`
- `body/body-xs-regular`
- `body/body-xxs-semibold`
- `body/body-xxs-regular`

### Links

Use:

- `link/link-md`
- `link/link-sm`

### Landing-page hierarchy

Default hierarchy:

- Hero headline: `heading/heading-xl-bold`
- Major section headings: `heading/heading-lg-bold`
- Card or subsection headings: `heading/heading-md-semibold` or `heading/heading-sm-semibold`
- Main body copy: `body/body-md-regular`
- Supporting copy: `body/body-sm-regular`
- Labels / metadata: `body/body-xs-*` or `body/body-xxs-*`

Do not create oversized marketing typography outside the current type scale unless explicitly approved.

Keep line lengths readable. Long explanatory copy should not span the full viewport width.

---

## 4. Color system

### Core semantic colors

Use semantic tokens first.

#### Surfaces

- `canvas/default`
- `canvas/alt`
- `bg/base`
- `bg/subtle`
- `bg/sunken`
- `bg/elevated`
- `bg/overlay`

#### Brand / product backgrounds

- `bg/primary` = Billease red
- `bg/secondary` = Billease blue
- `bg/loans`
- `bg/credit-line`
- `bg/savings`

#### Text

- `text/base`
- `text/subtle`
- `text/disabled`
- `text/on-dark`
- `text/on-dark subtle`
- `text/brand-primary`
- `text/success`
- `text/warning`
- `text/error`
- `text/info`
- `text/active`

#### Borders

- `border/subtle`
- `border/bold`
- `border/heavy`
- `border/brand-primary`
- `border/success`
- `border/warning-subtle`
- `border/warning-bold`
- `border/error-subtle`
- `border/error-bold`
- `border/info`
- `border/active`

#### Icons

- `icon/base`
- `icon/subtle`
- `icon/soft`
- `icon/disabled`
- `icon/on-dark`
- `icon/brand-primary`
- `icon/success-bold`
- `icon/warning-*`
- `icon/error-bold`
- `icon/info-bold`
- `icon/active`

### Color behavior

Use red primarily for:
- Primary Billease actions
- Brand emphasis
- Critical brand moments

Do not use red decoratively everywhere.

Use blue for:
- Secondary branded emphasis
- Active / selected states
- Loans-related contexts where appropriate

Use green for:
- Savings
- Success
- Positive status

Use magenta for:
- Credit Line-specific contexts

Use semantic status colors only for their intended meaning.

Do not use warning, error, or success colors purely for decoration.

---

## 5. Spacing

Use the existing spacing scale only:

- `spacing/050` = 2
- `spacing/100` = 4
- `spacing/200` = 8
- `spacing/300` = 12
- `spacing/400` = 16
- `spacing/500` = 20
- `spacing/600` = 24
- `spacing/700` = 28
- `spacing/800` = 32
- `spacing/900` = 40
- `spacing/1000` = 48

### Default spacing behavior

Recommended defaults:

- Icon to label: 8–12px
- Label to supporting copy: 4–8px
- Heading to body: 8–12px
- Internal card padding: 16–24px
- Between related content groups: 24–32px
- Between major landing-page sections: 40–48px minimum on mobile, larger through layout composition on desktop

Do not introduce arbitrary values such as 18px, 22px, 36px, or 60px unless technically unavoidable.

---

## 6. Border radius

Use:

- `border/radius/sm` = 4
- `border/radius/md` = 8
- `border/radius/lg` = 12
- `border/radius/xl` = 16
- `border/radius/2xl` = 24
- `border/radius/radius-full` = 9999

Default guidance:

- Buttons: use the existing component radius
- Small controls / inputs: 8–12px where consistent with components
- Standard cards: 12–16px
- Large promotional containers: 16–24px
- Pills / chips: full radius

Do not make every section a rounded container.

---

## 7. Borders and elevation

### Border widths

Use:
- `border/width/xs` = 1
- `border/width/sm` = 2
- `border/width/md` = 3

Prefer subtle 1px borders for standard content separation.

### Effects

Available:
- `Effects/xs`
- `Effects/sm`
- `Effects/md`
- `Effects/lg`

Use elevation sparingly.

Default preference:
- Flat surface + subtle border
- `xs` or `sm` when elevation is genuinely needed
- Avoid `md` and `lg` for normal content cards

Landing pages should not become a stack of floating cards.

---

## 8. Icons

Approved sizes:

- `icon/size/xs` = 16
- `icon/size/sm` = 20
- `icon/size/md` = 24
- `icon/size/lg` = 32
- `icon/size/xl` = 40
- `icon/size/2xl` = 48

Use icons from the Billease component/icon library when available.

Do not mix unrelated icon families.

Use flat icons as the default UI language unless the approved component library specifically uses 3D assets for a marketing or promotional moment.

3D illustrations should not replace functional icons.

---

## 9. Components

When the Billease Figma component library is provided:

- Reuse existing components directly
- Preserve component variants and interaction states
- Do not rebuild buttons, accordions, cards, navigation, alerts, chips, tabs, inputs, or other standard patterns from scratch
- Do not detach components only to force a visual variation
- If a required pattern does not exist, compose it from existing foundations before creating a new component

Component-library rules override visual assumptions in this file.

### Landing-page components likely to reuse

Prefer existing Billease versions of:

- Header / navigation
- Primary button
- Secondary button
- Cards
- Accordion
- FAQ rows
- Alert / info message
- Chips / badges
- Icon containers
- Bottom sheets if the landing page connects to activation
- Product / account cards
- Status messages

---

## 10. Layout

### General

Landing pages should use a clear vertical narrative.

Default product activation structure:

1. Hero
2. Key benefits
3. Where / how the product can be used
4. How activation works
5. Important conditions
6. Security and control
7. FAQ
8. Final CTA

Do not add sections just to make the page feel longer.

Every section must answer a real user question.

### Hero

Hero must include:

- Product name or clear product identifier
- Strong benefit-led headline
- Short supporting statement
- Primary CTA
- Relevant product visual

Avoid more than one equally prominent CTA.

### Content width

Use a readable constrained content area on desktop.

Do not stretch text paragraphs edge to edge.

Allow product visuals and section backgrounds to use wider layouts where useful.

### Section backgrounds

Alternate between:
- `bg/base`
- `bg/subtle`
- product-specific backgrounds only when meaningful

Do not alternate background colors mechanically after every section.

---

## 11. Access Card activation page rules

This page is for an existing eligible Billease user.

It is not a generic acquisition page.

The main questions it must answer are:

1. Why should I activate this?
2. What can I do with it?
3. What will happen when I activate?
4. What conditions should I know?
5. Is it safe?
6. What should I do next?

### Required content

#### Hero
- Access Card
- Benefit-led headline
- Short supporting copy
- Access Card visual
- Primary CTA: `Activate card`

#### Benefits
Use 3–4 benefits maximum.

Focus on outcomes, not implementation details.

#### Use cases
Show concrete supported use cases.

Examples only if confirmed:
- Online purchases
- In-store purchases
- Other supported card use cases

#### How activation works
Clearly communicate the process.

The page must explain that:
- The user completes required verification
- Billease then processes activation
- Activation can take up to 24 hours
- The user does not need to do anything else after completing their steps
- Billease will notify them when the card is ready to use

Do not imply instant activation if that is not true.

#### Important things to know
Surface important terms before FAQ.

Examples:
- Activation itself does not create a charge, if confirmed
- How the card uses the user's Billease funds or limit
- Fees or repayment implications
- Spending limits
- Processing time

Do not invent or assume financial terms.

#### Security and control
Use short, benefit-led reassurance.

Only mention supported features.

#### FAQ
Questions should address genuine conversion blockers.

#### Final CTA
Repeat `Activate card`.

---

## 12. Content and tone

Billease copy should be:

- Clear
- Direct
- Short
- Human
- Specific
- Reassuring without sounding defensive

Prefer:
- “Activate your card”
- “We’ll notify you when it’s ready”
- “This can take up to 24 hours”

Avoid:
- Vague hype
- Overly promotional claims
- Long fintech/legal language in primary content
- Technical backend terminology
- “Almost there” when no user action remains
- Claims that have not been confirmed by Product, Risk, Legal, or Engineering

Use “Billease” exactly with this capitalization.

---

## 13. Responsive behavior

Design mobile-first, then scale intentionally for desktop.

### Mobile
- Single-column layout
- Primary CTA easy to reach
- Avoid side-by-side text blocks
- Cards stack vertically
- Keep headings concise
- Maintain comfortable touch targets

### Desktop
- Do not simply stretch mobile sections
- Use two-column layouts when they improve comprehension
- Product visual can sit beside hero content
- Benefit cards may use 3-column layouts
- “How it works” may use horizontal step layouts
- FAQ should remain readable and not become excessively wide

Preserve content hierarchy across breakpoints.

---

## 14. Accessibility

Minimum requirements:

- Text and controls must meet WCAG contrast requirements
- Do not communicate meaning through color alone
- Interactive targets should be comfortably tappable
- Focus states must remain visible
- All meaningful images need accessible text equivalents
- Decorative imagery should not receive redundant descriptions
- Accordion / FAQ states must be keyboard accessible
- Motion must not be required to understand content
- Respect reduced-motion preferences

---

## 15. Motion

Motion should support comprehension, not decoration.

Allowed:
- Subtle section entrance
- Lightweight card / product motion
- One-time attention cues
- Microinteractions on controls

Avoid:
- Constant looping animations
- Excessive parallax
- Animated gradients across many elements
- Motion that delays access to information

If an animation exists only to “make the page feel premium,” remove it unless it clearly improves the experience.

---

## 16. Financial-product guardrails

Never invent:
- Fees
- Interest
- Eligibility
- Credit limits
- Repayment terms
- Merchant availability
- Card acceptance
- Security capabilities
- Activation timing
- Regulatory claims

If information is not confirmed, mark it as a content dependency instead of guessing.

Transparency takes priority over conversion copy.

Important financial or activation conditions should not be hidden exclusively inside FAQ or legal text.

---

## 17. Design review checklist

Before considering the page ready, verify:

- Does it use Billease components where available?
- Are semantic tokens used instead of hardcoded styles?
- Is Source Sans Pro used throughout?
- Are typography styles from the token system?
- Is spacing taken from the approved scale?
- Are colors token-based?
- Are radii and shadows consistent with Billease?
- Does the page feel like part of the Billease product?
- Is the primary CTA obvious?
- Are benefits limited to the strongest 3–4?
- Is “How it works” understandable without additional explanation?
- Are important conditions visible before FAQ?
- Are all financial claims confirmed?
- Does the page work on mobile and desktop?
- Are loading, error, disabled, and unavailable states considered where relevant?
- Is accessibility preserved?
- Is unnecessary decorative UI removed?

---

## 18. Claude implementation instruction

When generating or editing the landing page:

1. Read this file before changing the UI.
2. Treat the Billease token file and component library as authoritative.
3. Reuse existing components instead of inventing replacements.
4. Do not introduce new visual styles without explaining why an existing Billease pattern cannot solve the problem.
5. If a component-library rule conflicts with a generic landing-page convention, follow the Billease component library.
6. Keep the product narrative and information architecture intact unless explicitly asked to change it.
7. Flag missing product content instead of inventing it.
8. Keep all output visually consistent with the Billease native app and design system.
