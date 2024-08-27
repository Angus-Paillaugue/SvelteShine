---
lastModified: 08-25-2024
---

# Usage

To use math notation, you need to wrap the expressions in `$` signs. For inline math like $f(x) = x^2$ (inline), only one dollar sign is enough. For displaying an expression as a centered block you can wrap it with two `$`.

Under the hood, we use [katex](https://katex.org/). So if you need a list of symbols and supported functions, please refer to the katex [list of supported functions](https://katex.org/docs/supported.html)


# Exemples

## Inline maths

```markdown
$f(x) = x^2$
```
$f(x) = x^2$

---

## Math block

```markdown
$$
f(x) = x^2
$$
```
$$
f(x) = x^2
$$

---

## Notations in a sentence

```markdown
Lift($$L$$) can be determined by Lift Coefficient ($$C_L$$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$
```

Lift($$L$$) can be determined by Lift Coefficient ($$C_L$$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

---
