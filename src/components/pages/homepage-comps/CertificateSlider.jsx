import { useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CertificateModal from "./CertificateModal";
import Reveal from "../../motion/Reveal";
import SectionLabel from "../../effects/SectionLabel";

const CertificateSlider = ({ certificates }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    draggable: true,
    arrows: false,
    rows: 2,
    responsive: [
      { breakpoint: 3000, settings: { slidesToShow: 3, infinite: true } },
      { breakpoint: 800, settings: { slidesToShow: 2, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 1, dots: true } },
      { breakpoint: 280, settings: "unslick" },
    ],
  };

  return (
    <section
      name="Education"
      id="Education"
      className="relative w-full py-24 md:py-32 text-white"
    >
      <div className="container-wide">
        <Reveal>
          <SectionLabel index={5}>Education</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-heading mt-3">
            Certifications &amp;{" "}
            <span className="text-gradient">credentials</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-xl text-fog-300">
            A snapshot of formal training I&rsquo;ve completed along the way.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <Slider {...settings} className="cert-slider -mx-2">
            {certificates.map((certificate, index) => (
              <div key={index} className="px-2 pb-3">
                <button
                  type="button"
                  onClick={() => setSelectedImage(certificate.image)}
                  className="group block w-full overflow-hidden rounded-xl border border-white/5 bg-ink-800/60 hover:border-accent-emerald/30 hover:shadow-card-hover transition-all duration-500 cursor-zoom-in"
                  aria-label="View certificate"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={certificate.image}
                      alt="Certificate"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </button>
              </div>
            ))}
          </Slider>
        </Reveal>
      </div>

      <CertificateModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      {/* Light styling overrides for slick dots */}
      <style>{`
        .cert-slider .slick-dots li button:before {
          color: #6B7785;
          opacity: 0.5;
          font-size: 8px;
        }
        .cert-slider .slick-dots li.slick-active button:before {
          color: #0DFC4B;
          opacity: 1;
        }
        .cert-slider .slick-dots { bottom: -28px; }
      `}</style>
    </section>
  );
};

CertificateSlider.propTypes = {
  certificates: PropTypes.arrayOf(
    PropTypes.shape({ image: PropTypes.string.isRequired })
  ).isRequired,
};

export default CertificateSlider;
