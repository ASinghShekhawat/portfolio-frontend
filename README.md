# Aditya Shekhawat — Portfolio

Personal portfolio for a full-stack engineer. Hero, About, Experience timeline, Projects with case-study modals, Tech toolbox, Certificates, and a Contact form.

## Stack

- React 18 + Vite
- Tailwind CSS (design tokens in `tailwind.config.js`)
- Framer Motion (scroll reveals, stagger, magnetic buttons)
- react-router-dom · react-icons · react-scroll · react-slick
- getform.io endpoint for the contact form
- sweetalert2 (lazy-loaded on submit)

## Scripts

```bash
npm install
npm run dev      # vite dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # eslint
```

## Project structure

```
src/
  components/
    AuroraBackground.jsx       # ambient gradient/grid/noise background
    ProjectCard.jsx             # tilt + hover card
    ModalInfo.jsx               # case-study modal
    SocialLinks.jsx             # desktop side rail
    GeneralFooter.jsx
    motion/
      Reveal.jsx                # in-view fade/translate wrapper
      Stagger.jsx               # parent + StaggerItem
      MagneticButton.jsx        # cursor-pull button
    pages/
      HomePage.jsx
      AboutPage.jsx             # /about-me
      homepage-comps/           # one file per section
  utils/
    constants.js                # project case studies
```

## Customising

- Design tokens: `tailwind.config.js` (palette `ink/fog/accent`, gradient, shadows, fonts)
- Global utility classes (`container-wide`, `text-gradient`, `section-heading`, `section-eyebrow`, `card-surface`): `src/index.css`
- Projects data: `src/utils/constants.js`
- Experience data: `src/components/pages/homepage-comps/Experience.jsx`

## Nice-to-haves

- `src/assets/java.png` is 730 KB — replace with an optimised PNG/SVG.
- The two featured project covers (`public/images/projectsImages/rag-platform.svg`, `rate-limiter.svg`) are gradient-based placeholders. Swap in real screenshots / architecture diagrams when you have them.
- Drop in an updated `public/FullStack_Developer_Aditya_Resume.pdf` when the resume changes.

## License

[MIT](https://choosealicense.com/licenses/mit/)
