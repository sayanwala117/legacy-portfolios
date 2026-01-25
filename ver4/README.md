
![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fjaspreetj117.github.io)
# JaspreetJ117.github.io

# To-Do
- Make SLM using GPT and all and deployb on website
- Tailscale deployment github thing

This is my personal portfolio website, built to showcase my projects, resume, and skills.

## Features
- Responsive design
- Project gallery
- Resume download
- Contact information

## Structure
- `index.html` — Main landing page
- `assets/CSS/` — Stylesheets
- `assets/JS/` — JavaScript files
- `images/` — Project and profile images
- `assets/Resume/Resume.pdf` — Downloadable resume

## Usage
Open `index.html` in your browser to view the site locally.

## License
See [LICENSE](LICENSE) for details.



| **Distribution**                  | **PDF  (f (x))**                                                        | **CDF  (F (x)) / Probability Formulas**                                                                                                                                                               | **Mean (μ)**           | **Variance (σ²)**        | **Std Dev (σ)**            | **Extra / Special Formulas + Hints**                                                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Uniform [a,b]**                 | ( f(x)=\dfrac{1}{b-a},;a\le x\le b )                                    | ( F(x)=\dfrac{x-a}{b-a},;a\le x\le b )<br> ( P(x_1\le X\le x_2)=\dfrac{x_2-x_1}{b-a} )                                                                                                                | ( \dfrac{a+b}{2} )     | ( \dfrac{(b-a)^2}{12} )  | ( \dfrac{b-a}{\sqrt{12}} ) | Area = width × height → use for equal-chance ranges.                                                                                                               |
| **Exponential (λ)**               | ( f(x)=\lambda e^{-\lambda x},;x\ge0 )                                  | ( F(x)=1-e^{-\lambda x} )<br> ( P(X>x)=e^{-\lambda x} )<br> ( P(x_1\le X\le x_2)=e^{-\lambda x_1}-e^{-\lambda x_2} )                                                                                  | ( \dfrac{1}{\lambda} ) | ( \dfrac{1}{\lambda^2} ) | ( \dfrac{1}{\lambda} )     | **Memoryless:** (P(X>s+t\mid X>s)=P(X>t))<br>Used for time-between-events; right-skewed.                                                                           |
| **Normal (μ, σ)**                 | ( f(x)=\dfrac{1}{\sigma\sqrt{2\pi}};e^{-\dfrac{(x-\mu)^2}{2\sigma^2}} ) | Probabilities require **standardization**:<br> ( z=\dfrac{x-\mu}{\sigma} )<br> Then use z-table to find area.<br> Examples:<br> ( P(X\le x)=P(Z\le z) )<br> ( P(x_1\le X\le x_2)=P(z_1\le Z\le z_2) ) | μ                      | σ²                       | σ                          | **Empirical Rule:** 68 % (±1σ), 95 % (±2σ), 99.7 % (±3σ).<br>**Reverse conversion:** ( x=\mu+z\sigma ).<br>**Continuity correction for binomial:** ± 0.5 before z. |
| **Standard Normal (Z ~ N(0, 1))** | ( f(z)=\dfrac{1}{\sqrt{2\pi}};e^{-\dfrac{z^2}{2}} )                     | **Use z-table (Φ)** for cumulative area:<br> ( P(Z\le z)=Φ(z) )<br> ( P(Z\ge z)=1-Φ(z) )<br> ( P(-z\le Z\le z)=2Φ(z)-1 )<br> ( P(z_1\le Z\le z_2)=Φ(z_2)-Φ(z_1) )                                     | 0                      | 1                        | 1                          | **Hint:** Use z-table for all area look-ups.<br>For given p, find z from inverse table (z=Φ^{-1}(p)).                                                              |

