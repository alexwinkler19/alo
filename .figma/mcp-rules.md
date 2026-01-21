# Figma MCP: Code Generation Rulebook

These rules define how to turn Figma designs into React Native components and
screens using the Figma MCP server.

---

## 0. Figma File Prerequisites

Before any MCP extraction, the Figma file MUST meet these requirements. If any
requirement is not met, request design updates before proceeding with
implementation.

### 0.1. Auto Layout

All containers MUST use Auto Layout, not absolute positioning. Absolute
positioning breaks responsive behavior and produces incorrect layout code.

### 0.2. Semantic Layer Naming

Layer names must be semantic and descriptive:

- Valid: `CardContainer`, `PriceLabel`, `ActionButton`, `HeaderSection`
- Invalid: `Frame 47`, `Group 12`, `Rectangle 3`

### 0.3. Variables Required

All style values MUST reference Figma variables:

- Colors: color variables (e.g., `semantic/color/bg/surface`)
- Spacing: spacing variables (e.g., `semantic/spaceGap/lg`)
- Typography: text styles linked to variables
- Border radius: radius variables

Hardcoded hex values or pixel numbers without variable references indicate an
incomplete design file.

### 0.4. Component Structure

Reusable UI elements MUST be Figma components with properly defined variants.
One-off frames that should be components are design debt that blocks accurate
code generation.

### 0.5. Code Connect Status

For components in `/packages/ui`, verify Code Connect mappings exist in the
Figma file. Missing mappings mean the MCP server cannot reference your actual
codebase components. See Section 6 for Code Connect setup requirements.

### 0.6. Prerequisite Failure Protocol

If prerequisites are not met:

1. Document which requirements are unmet
2. Create a list of specific issues (e.g., "Frame X uses absolute positioning")
3. Coordinate with design before implementation
4. Do NOT proceed with code generation until resolved

---

## 1. Your Operating Model

You use the Figma MCP server as your only specification source for visual and
structural decisions.

For any component or screen:

### 1.1. Single Source of Truth

The visual reference (screenshot) and the extracted node properties from the MCP
server together are the single source of truth.

### 1.2. Strict Replication Requirements

You must strictly replicate:

- Text content (copy, prices, labels, placeholders, button text)
- Icon usage and order
- Component hierarchy and layout structure

Any deviation from this specification is a hard failure unless explicitly
allowed by the Exception Triage Guideline in the Constitution.

### 1.3. Prohibited Actions

You must never:

- Guess styling or structure
- Infer spacing or sizes from "what looks typical"
- Change hierarchy or content to "simplify" implementation
- Accept default React+Tailwind output (see Section 2.5)

Your job is: read the MCP output, mirror it, and map it to tokens (or temporary
literals with TODO).

---

## 2. Figma MCP Extraction Workflow (Non-Negotiable)

For every generation task, you must follow this exact sequence before writing
code or an implementation plan.

### 2.0. Tool Selection Matrix

The Figma MCP server provides multiple tools. Using the wrong tool produces
wrong output. Always select tools based on this matrix:

| Scenario                          | Tool(s) to Use                                      |
| --------------------------------- | --------------------------------------------------- |
| Single component (<12k tokens)    | `get_design_context` + `get_screenshot`             |
| Full screen or large frame        | `get_metadata` first, then `get_design_context` on specific nodes |
| Design token extraction           | `get_variable_defs` (always run before implementation) |
| Visual reference for layout       | `get_screenshot` (always enable)                    |
| Check existing DS component maps  | `get_code_connect_map`                              |
| Generate design system rules file | `create_design_system_rules`                        |

**Critical:** Never call `get_design_context` on frames larger than 12,000
tokens without first using `get_metadata` to identify specific nodes.

### 2.1. Pull Raw Figma Data

Using the MCP server, fetch all properties of the selected Figma node (component
or screen):

- Component name
- Variant structure (e.g., `Size=Large`, `State=Pressed`, `Tone=Primary`)
- Layout: flex direction (HStack/VStack), absolute/relative, alignment, padding,
  gap, constraints
- Typography: family, size, weight, line height, letter spacing
- Spacing: gaps and insets (padding/margin) with exact pixel values
- Colors: background, borders, text, icons
- Radii and borders
- Icon names
- Content (all text literals and dynamic placeholders)

You must work from these concrete values, not from memory or intuition.

### 2.2. Token Mapping Algorithm

For every style value (spacing, radius, typography, color), apply this strict
decision tree:

1. **Check for explicit token name:** If the MCP output includes a design token
   reference (e.g., `semantic.spaceGap.lg` or `semantic.color.bg.surface`), you
   must use the respective token in Tamagui.

2. **Match by value if no token:** If the Figma file does not have a token
   reference, use the literal value and add a TODO comment:
   ```typescript
   // TODO: missing token in design system (<value>px from Figma)
   ```

This priority order is mandatory. You are not allowed to "simplify" spacing or
other styles by picking a nicer token if it violates this order.

### 2.3. Implementation Plan Rules

When you write an implementation plan that mentions a numeric style (e.g.,
"Spacing between questions: 24px"), you must:

1. Derive that number from the MCP data, not from intuition.

2. Reference its origin:
   - Either the token name: `semantic.spaceGap.xl` (24px)
   - Or the literal MCP value: `56px (no matching token, will use literal + TODO)`

You are not allowed to treat your implementation plan as speculation. If later
analysis shows your initial value was wrong, you must treat the plan as
incorrect and update it.

### 2.4. Token Limit Management

If `get_design_context` fails with token limit errors:

1. Use `get_metadata` to retrieve sparse XML structure with layer IDs
2. Identify specific node IDs from the metadata
3. Call `get_design_context` on individual nodes (not the entire frame)
4. Combine results while respecting the original hierarchy

**Environment Configuration:**

- Claude Code: Set `MAX_MCP_OUTPUT_TOKENS=100000` in environment
- Cursor: Default limits usually sufficient; increase if needed

**Prevention:** For screens with >20 elements, always start with `get_metadata`.

### 2.5. Framework Specification (Required in Every Prompt)

The MCP server defaults to React + Tailwind output. This is NOT our stack.

Every MCP extraction prompt MUST include this specification:

```
Generate using React Native with Tamagui styling.
Use components from /packages/ui where available.
Use tokens from /apps/mobile/src/theme/ for all styling.
Do NOT use Tailwind classes or web-specific CSS.
```

Never accept default React+Tailwind output. If you receive Tailwind classes in
the response, re-prompt with explicit framework specification.

---

## 3. Token System & Exception Rules

All tokens are defined in `/packages/theme` (see Constitution: Design System
section). The app accesses these tokens through Tamagui config in
`/apps/mobile/src/theme/`.

### 3.1. When Figma Uses a Token

- Use that exact token (e.g., `semantic.spaceInset.horizontal.md`)
- Do not "improve" or rename it in the implementation
- Do not replace it with a near match (>1px deviance)

### 3.2. When Figma Uses a Literal Value (No Token Exists)

- Use the same literal value (e.g., `gap={56}`)
- You must add: `// TODO: missing token in design system (56px from Figma)`

This is expected and valid. Clean code never beats fidelity.

### 3.3. Spacing Accuracy

The spacing system is built on an 8-point grid:

- Base values: 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64...
- All spacings and gaps must follow this system
- Values not on the grid indicate either a design bug or intentional exception

---

## 4. Rules for Building Components in /packages/ui

### 4.1. Variant Logic

If Figma defines variants (e.g., Size, State, Tone):

- Implement a single TypeScript component that exposes those variants as props
- Property names must mirror Figma variant names exactly
- Branching must use tokens, never ad-hoc values

Example: A Button must encode all Figma variants (size, state, tone) in a single
component rather than multiple button files.

### 4.2. Layout Fidelity

- Layout (direction, alignment, justification, gaps) must mirror the Figma
  hierarchy
- Spacing between sub-elements must follow the token mapping algorithm in
  Section 2.2

Do not re-group or flatten elements "for convenience" if it changes the visual
hierarchy.

### 4.3. Typography Rules

- All typography must come from `/apps/mobile/src/theme/typography.ts`
- You may not define inline typography like `fontSize: 16` or
  `fontFamily: 'Inter'` directly
- Map Figma text styles to existing typography tokens

### 4.4. Multi-Variant Extraction Workflow

For components with multiple variants:

1. **List all variant combinations** from Figma:
   ```
   Size: sm, md, lg
   State: default, pressed, disabled, loading
   Tone: primary, secondary, destructive
   ```

2. **Extract `get_design_context`** for each significant combination (at minimum:
   default state for each size/tone, plus all states for the primary variant)

3. **Map extracted values** to a single component with variant props:
   ```typescript
   type ButtonProps = {
     size: 'sm' | 'md' | 'lg';
     state: 'default' | 'pressed' | 'disabled' | 'loading';
     tone: 'primary' | 'secondary' | 'destructive';
   };
   ```

4. **Verify all states** render correctly against Figma screenshots

---

## 5. Rules for Building Screens in /apps/mobile/src/features/*/screens

### 5.1. Mandatory Screen Wrapper

Every screen must use the shared `Screen` component as the top-level container.

`Screen` applies OS safe area insets using `useSafeAreaInsets()` from
`react-native-safe-area-context`.

- `paddingTop` and `paddingBottom` come from safe area insets, not from tokens
- All other spacing and styling uses tokens or literal values per Section 2.2

Example:

```typescript
export function FeedbackScreen() {
  return (
    <Screen>
      {/* Exact visual hierarchy from Figma goes here */}
    </Screen>
  );
}
```

### 5.2. Start from Figma Frame Structure

1. Use MCP to read the full Figma frame tree
2. Mirror the layout using Tamagui primitives only when no DS component exists
3. Replace any Figma instances of DS components with the real components from
   `/packages/ui`

### 5.3. Maintain Layout Hierarchy

If Figma shows: `Frame → Header → Filters → Content`, your screen must mirror
this (inside Screen):

```typescript
<Screen>
  <HeaderComponent ... />
  <Filters ... />
  <ContentList ... />
</Screen>
```

You may only change hierarchy to satisfy Constitution-level architecture rules:

- No API calls in components
- Clean separation of UI / business logic / data
- Moving data-fetching into `/services` or `/lib/supabase`

When you do that, you still must keep the same visual hierarchy in the UI layer.

### 5.4. Local Wrapper Components

You may create local wrappers when:

- A layout block is unique to this screen, and
- It is not generic enough for `/packages/ui`

Location:

- Shared across features: `/apps/mobile/src/components/<ComponentName>`
- Feature-specific: `/apps/mobile/src/features/<feature>/components/<ComponentName>`

Local components must follow the same rules for tokens, typography, and layout
fidelity.

### 5.5. State Management

Generated screens and components must follow the Constitution's state
architecture:

- **Component-local UI state:** `useState` / `useReducer`
- **Server state:** Never in screens/components directly; use React Query hooks
  from `/services` or `/lib/supabase`
- **Forms:** `react-hook-form` + `zodResolver` + Zod schemas
- **Global client state:** Jotai or Zustand only for minimal non-server global
  state and only where justified

---

## 6. Code Connect Integration

Code Connect maps Figma components to your actual codebase components. This is
critical for accurate code generation.

### 6.1. Why Code Connect Matters

Without Code Connect:

- MCP generates generic React code instead of using your components
- AI agents don't know your `Button` in `/packages/ui` matches Figma's Button
- Every screen recreates components instead of importing existing ones

With Code Connect:

- MCP references your actual component paths and prop signatures
- Generated code imports from `/packages/ui` correctly
- Variant props match your TypeScript interfaces

### 6.2. Setup Requirements

1. Install Code Connect CLI:
   ```bash
   pnpm add -D @figma/code-connect
   ```

2. Create `.figma/` files alongside components in `/packages/ui`:
   ```
   /packages/ui/
     Button/
       Button.tsx
       Button.figma.tsx  # Code Connect mapping
   ```

### 6.3. Property Mapping Syntax

Map Figma variants to component props:

```typescript
// Button.figma.tsx
import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(Button, 'https://figma.com/file/xxx/Button', {
  props: {
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    tone: figma.enum('Tone', {
      Primary: 'primary',
      Secondary: 'secondary',
    }),
    disabled: figma.boolean('State', { Disabled: true, '*': false }),
    label: figma.string('Label'),
  },
  example: (props) => <Button {...props} />,
});
```

### 6.4. Publishing Mappings

After creating mappings, publish to Figma:

```bash
npx figma-code-connect publish
```

Verify in Figma Dev Mode that components show your actual code snippets.

### 6.5. MCP Integration

Once published, use `get_code_connect_map` to verify mappings are available:

```
Use the get_code_connect_map tool to check which components have code mappings.
```

When generating screens, the MCP server will automatically use these mappings.

---

## 7. MCP Client Configuration

Proper client configuration ensures consistent behavior across the team.

### 7.1. Project-Level Configuration

Create `.cursor/mcp.json` in the project root:

```json
{
  "servers": {
    "figma": {
      "type": "http",
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

For remote server (no desktop app required):

```json
{
  "servers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

### 7.2. Claude Code Setup

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Verify with:

```bash
claude mcp list
```

### 7.3. VS Code Setup

1. Open Command Palette (`Cmd+Shift+P`)
2. Search "MCP: Add Server"
3. Select HTTP protocol
4. Enter URL: `http://127.0.0.1:3845/mcp` (local) or `https://mcp.figma.com/mcp` (remote)
5. Assign server ID: `figma`

### 7.4. Authentication Troubleshooting

If MCP tools fail unexpectedly:

**Cursor:**
1. Open Command Palette (`Cmd+Shift+P`)
2. Select "Clear All MCP Tokens"
3. Re-authenticate when prompted
4. Restart Cursor

**Claude Code:**
1. Run `claude mcp remove figma`
2. Re-add: `claude mcp add --transport http figma https://mcp.figma.com/mcp`
3. Re-authenticate

**Desktop Server Issues:**
1. Ensure Figma desktop app is running
2. Verify Dev Mode is enabled (`Shift+D`)
3. Check server is running at `http://127.0.0.1:3845/mcp`

### 7.5. Explicit Tool Invocation

Never rely on automatic tool selection. The AI model doesn't always choose the
right tool. Always specify explicitly:

```
Use the get_design_context tool to extract the Button component.
Use the get_variable_defs tool to list all design tokens used.
Use the get_screenshot tool to capture the visual reference.
```

---

## 8. Post-Generation Validation (Mandatory)

After code generation, validation is required before considering the task
complete.

### 8.1. Visual Comparison

1. Render the component/screen in Storybook or simulator
2. Place side-by-side with Figma screenshot (use `get_screenshot`)
3. Check for deviations in:
   - Spacing (padding, margins, gaps)
   - Colors (backgrounds, text, borders)
   - Typography (size, weight, line height)
   - Alignment (horizontal, vertical, distribution)
   - Border radius
   - Shadow/elevation

### 8.2. Token Audit

1. Search generated code for hardcoded values:
   ```bash
   grep -E "(#[0-9a-fA-F]{3,8}|[0-9]+px|fontSize:|fontWeight:)" src/
   ```

2. Verify all values either:
   - Map to a token from `/packages/theme`
   - Have a `// TODO: missing token` comment

3. Confirm token names match Figma variable names exactly

### 8.3. Component Reuse Verification

1. Check that DS components from `/packages/ui` are used where applicable
2. No duplicate component definitions (e.g., creating a new Button when one
   exists)
3. Props match Figma variant structure

### 8.4. Deviation Thresholds

| Deviation Type | Acceptable | Requires Review | Hard Failure |
| -------------- | ---------- | --------------- | ------------ |
| Spacing        | ±1px       | ±2-4px          | >4px         |
| Colors         | Exact      | -               | Any mismatch |
| Typography     | Exact      | ±1px size       | Wrong font   |
| Border radius  | Exact      | ±1px            | >2px         |
| Layout order   | Exact      | -               | Any change   |

Deviations in "Requires Review" must be documented and approved per the
Exception Triage Guideline.

---

## 9. Design System Rules File

Use the `create_design_system_rules` tool to generate persistent rules that
align AI output with your design system.

### 9.1. Generating Rules

```
Use the create_design_system_rules tool to generate design system rules
for this project. Save to .cursor/rules/figma-ds.md
```

### 9.2. Required Content

The rules file should document:

- Tamagui component mappings (Figma name → code component)
- Token naming conventions
- Layout primitives (`XStack`, `YStack`, `ZStack`)
- File organization patterns
- Import paths for common components

### 9.3. Maintenance

Regenerate the rules file when:

- New components are added to `/packages/ui`
- Design tokens are updated in `/packages/theme`
- Code Connect mappings change

---

## 10. Error Recovery Procedures

### 10.1. Token Limit Exceeded

**Symptom:** `MCP tool response exceeds maximum allowed tokens`

**Solution:**
1. Switch to `get_metadata` to get sparse XML structure
2. Identify specific node IDs for the elements you need
3. Call `get_design_context` on individual nodes
4. Combine results respecting original hierarchy

### 10.2. Authentication Failed

**Symptom:** Tool calls fail with auth errors or timeout

**Solution:**
1. Clear MCP tokens in your IDE
2. Restart the IDE completely
3. Re-authenticate with Figma
4. For desktop server: ensure Figma app is running with Dev Mode active

### 10.3. Wrong Tool Called

**Symptom:** Only seeing `get_image` or `get_screenshot` results, no design
context

**Solution:**
1. Explicitly specify the tool in your prompt
2. Verify the MCP server connection is active
3. Check that the Figma file is a Design file (not FigJam for design context)

### 10.4. Output Quality Poor (>20% Deviation)

**Symptom:** Generated code significantly differs from Figma design

**Solution:**
1. Verify Figma file meets prerequisites (Section 0)
2. Check Auto Layout is used (not absolute positioning)
3. Verify variables are assigned (not hardcoded values)
4. Use `get_screenshot` for visual reference in addition to `get_design_context`
5. Extract `get_variable_defs` separately for explicit token references
6. Check Code Connect mappings are published

### 10.5. Components Not Recognized

**Symptom:** MCP generates custom code instead of using `/packages/ui` components

**Solution:**
1. Run `get_code_connect_map` to verify mappings exist
2. If mappings missing, create Code Connect files (Section 6)
3. Publish mappings: `npx figma-code-connect publish`
4. Verify in Figma Dev Mode that code snippets appear

### 10.6. Stale Tool List

**Symptom:** Tool calls fail with "unknown tool" or use old tool names (e.g.,
`get_code` instead of `get_design_context`)

**Solution:**
1. Disconnect and reconnect to the MCP server
2. Clear MCP tokens and re-authenticate
3. Restart IDE to refresh tool list

---

## Appendix A: Quick Reference

### MCP Tools Summary

| Tool                        | Purpose                                      | When to Use                     |
| --------------------------- | -------------------------------------------- | ------------------------------- |
| `get_design_context`        | Extract structured design data               | Components, small frames        |
| `get_metadata`              | Sparse XML with node IDs                     | Large frames, initial scan      |
| `get_variable_defs`         | List design tokens                           | Always, before implementation   |
| `get_screenshot`            | Visual reference image                       | Always, for validation          |
| `get_code_connect_map`      | Check component mappings                     | Before generating screens       |
| `create_design_system_rules`| Generate rules file                          | Project setup, after DS changes |
| `get_figjam`                | Extract FigJam content                       | Diagrams, flows                 |
| `whoami`                    | Check auth status                            | Troubleshooting                 |

### Standard Prompt Template

```
Using the Figma MCP server:

1. Use get_variable_defs to extract all design tokens
2. Use get_code_connect_map to check existing component mappings
3. Use get_design_context for [component/frame name]
4. Use get_screenshot for visual reference

Generate using React Native with Tamagui styling.
Use components from /packages/ui where available.
Use tokens from /apps/mobile/src/theme/ for all styling.
Do NOT use Tailwind classes.
```

### Checklist Before Code Generation

- [ ] Figma file uses Auto Layout
- [ ] Layer names are semantic
- [ ] Variables are assigned to all style values
- [ ] Code Connect mappings are published
- [ ] MCP client is authenticated
- [ ] Framework specification is in prompt

---

## 11. Post-Generation Transformations (Mandatory)

Figma designs are visual specifications. They do not capture platform behavior,
interactivity, or responsive requirements. After generating code from Figma, you
MUST apply the transformations in this section.

### 11.1. Figma-to-Code Translation Gap

Figma outputs presentational elements that must be converted to functional
components:

| Figma Output | Required Transformation |
| ------------ | ----------------------- |
| `Text` layer for form input | Replace with `TextField` or `TextArea` from `@alo/ui` |
| Fixed width (e.g., `width: 295`) | Use `width: '100%'` for responsive layout |
| Static icon in input field | Add `onIconPress` handler if icon should be interactive |
| No keyboard configuration | Add platform props (see Section 11.2) |
| No screen wrapper | Wrap with keyboard-aware layout (see Section 11.3) |

**Critical Rule:** Figma `Text` elements inside form fields are placeholders for
the visual design. They must ALWAYS be replaced with actual input components.
Never render a `Text` component where user input is expected.

### 11.2. Input Field Platform Props (Required)

Every input field MUST include platform-specific props for proper keyboard
behavior, autofill, and accessibility. Use this reference:

#### Email Fields

```typescript
<TextField
  // ... other props
  keyboardType="email-address"
  autoCapitalize="none"
  textContentType="emailAddress"  // iOS autofill
  autoComplete="email"            // Android autofill
/>
```

#### Password Fields (New Password / Sign Up)

```typescript
const [showPassword, setShowPassword] = useState(false);

<TextField
  // ... other props
  secureTextEntry={!showPassword}
  autoCapitalize="none"
  textContentType="newPassword"   // iOS strong password suggestion
  autoComplete="password-new"     // Android
  showIcon
  icon={showPassword ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
  onIconPress={() => setShowPassword(!showPassword)}
/>
```

#### Password Fields (Login / Existing Password)

```typescript
<TextField
  // ... other props
  secureTextEntry={!showPassword}
  autoCapitalize="none"
  textContentType="password"      // iOS autofill existing password
  autoComplete="password"         // Android
  showIcon
  icon={showPassword ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
  onIconPress={() => setShowPassword(!showPassword)}
/>
```

#### Name Fields

```typescript
<TextField
  // ... other props
  autoCapitalize="words"
  textContentType="name"
  autoComplete="name"
/>
```

#### Phone Fields

```typescript
<TextField
  // ... other props
  keyboardType="phone-pad"
  textContentType="telephoneNumber"
  autoComplete="tel"
/>
```

#### Generic Text Fields

```typescript
<TextField
  // ... other props
  autoCapitalize="sentences"      // Default, capitalize first letter
/>
```

### 11.3. Screen Layout Pattern for Forms

Screens containing form inputs MUST use this structure to handle keyboard
display correctly:

```typescript
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { ScrollView, Stack, styled } from 'tamagui';

const Container = styled(Stack, {
  flex: 1,
  backgroundColor: semantic.color.bg.primary,
});

export const FormScreen: React.FC = () => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Screen content here */}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
```

**Key requirements:**

- `KeyboardAvoidingView` prevents the keyboard from covering input fields
- `behavior` differs by platform: `'padding'` for iOS, `'height'` for Android
- `keyboardShouldPersistTaps="handled"` allows tapping buttons while keyboard is
  open
- `contentContainerStyle={{ flexGrow: 1 }}` ensures content fills available
  space

### 11.4. TextField Controlled Input Rules

The `TextField` component from `@alo/ui` has specific requirements for
controlled inputs:

**Always use `value` prop for controlled inputs:**

```typescript
// Correct
<TextField
  value={email}
  onChangeText={setEmail}
  state={email ? 'Filled' : 'Empty'}
/>

// Incorrect - content prop is for display-only scenarios
<TextField
  content={email}  // DON'T use content for controlled inputs
  onChangeText={setEmail}
/>
```

**State management pattern:**

```typescript
const [fieldValue, setFieldValue] = useState('');

<TextField
  value={fieldValue}
  onChangeText={setFieldValue}
  state={fieldValue ? 'Filled' : 'Empty'}  // Derive state from value
/>
```

**Never use fallback patterns that prevent empty states:**

```typescript
// Incorrect - prevents field from being cleared
value={fieldValue || 'default'}

// Correct - allow empty string
value={fieldValue}
```

### 11.5. Interactive Icon Handling

When Figma shows an icon inside an input field (e.g., eye icon for password
visibility), determine if it should be interactive:

**Interactive icons require:**

1. `showIcon={true}` prop on TextField
2. `icon` prop with the icon component
3. `onIconPress` handler for the interaction
4. State to track toggle status (e.g., `showPassword`)

**Pattern for password visibility toggle:**

```typescript
const [showPassword, setShowPassword] = useState(false);

<TextField
  secureTextEntry={!showPassword}
  showIcon
  icon={showPassword ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
  onIconPress={() => setShowPassword(!showPassword)}
/>
```

**Icons that are NOT interactive** (purely decorative) still use `showIcon` and
`icon` but omit `onIconPress`.

---

## 12. Component Implementation Checklist

Run this checklist after generating any component or screen from Figma. All
items must pass before considering implementation complete.

### 12.1. Form Input Validation

- [ ] Form fields use `TextField`/`TextArea` from `@alo/ui`, NOT `Text`
- [ ] `value` prop used for controlled inputs (not `content`)
- [ ] `onChangeText` handler connected to state setter
- [ ] `state` prop derived from value (`value ? 'Filled' : 'Empty'`)
- [ ] Field can be fully cleared (empty state works)

### 12.2. Responsive Layout

- [ ] Width is responsive (`width: '100%'`), not fixed pixels
- [ ] Container padding uses tokens, not Figma artboard calculations
- [ ] Layout works on different screen sizes (test 375px and 414px minimum)

### 12.3. Platform Props

- [ ] `keyboardType` set appropriately for field type
- [ ] `autoCapitalize` configured (usually `'none'` for email/password)
- [ ] `textContentType` set for iOS autofill
- [ ] `autoComplete` set for Android autofill
- [ ] `secureTextEntry` used for password fields

### 12.4. Interactivity

- [ ] All clickable icons have `onIconPress` handlers
- [ ] Password visibility toggle implemented where applicable
- [ ] Toggle states work correctly (test multiple toggles)
- [ ] Disabled states prevent interaction

### 12.5. Screen Structure (for screens with forms)

- [ ] `KeyboardAvoidingView` wraps scrollable content
- [ ] `ScrollView` has `keyboardShouldPersistTaps="handled"`
- [ ] `StatusBar` configured with correct style
- [ ] Safe area insets applied (via Screen component or manual)

### 12.6. Testing Verification

- [ ] Can type and edit text in all fields
- [ ] Can delete all text (field shows empty state)
- [ ] Keyboard appears and dismisses correctly
- [ ] Autofill works (test with iOS/Android password managers)
- [ ] Form submission works with all fields filled
- [ ] Error states display correctly (if applicable)
