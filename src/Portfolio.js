import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
} from "react-router-dom";
import Icon from "./components/portfolio/Icons";
import { projects, filters, experience } from "./content/projects";
import "./portfolio.css";

const email = "simkinsamuel@gmail.com";
const resume = "/Samuel-Simkin-Resume.pdf";
function ResumeLink({ className = "text-link", children = "Download résumé" }) {
  return (
    <a className={className} href={resume} download="Samuel-Simkin-Resume.pdf">
      {children}
      <Icon name="download" size={17} />
    </a>
  );
}
function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}
function ScrollAndMetadata() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const project = projects.find((p) => pathname === `/projects/${p.id}`);
    const title = project
      ? `${project.title} | Samuel Simkin`
      : pathname === "/projects"
        ? "Selected work | Samuel Simkin"
        : pathname === "/work"
          ? "Experience | Samuel Simkin"
          : pathname === "/contact"
            ? "Contact | Samuel Simkin"
            : "Samuel Simkin | Electrical Engineer";
    document.title = title;
    const description =
      project?.summary ||
      "Samuel Simkin is an electrical engineer in Austin, working across electrical design, custom PCBs, embedded control, and system troubleshooting.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    if (hash) {
      const t = setTimeout(
        () =>
          document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            }),
        70,
      );
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    if (!open) return;
    function key(e) {
      if (e.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Samuel Simkin, home">
          <span className="brand-mark" aria-hidden="true">
            s<span>.</span>
          </span>
          <span>
            Samuel Simkin<span className="brand-role">Electrical engineer</span>
          </span>
        </Link>
        <nav
          className={open ? "main-nav is-open" : "main-nav"}
          id="main-navigation"
          aria-label="Main navigation"
        >
          <NavLink to="/projects">Work</NavLink>
          <Link to="/#experience">Experience</Link>
          <Link to="/#about">About</Link>
          <Link to="/contact">Contact</Link>
          <ResumeLink className="header-resume">Résumé</ResumeLink>
        </nav>
        <button
          className="menu-button"
          ref={menuRef}
          aria-controls="main-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
function BoardViewer() {
  const [view, setView] = useState("3d");
  const board = projects[0];
  return (
    <div className="board-viewer">
      <div className="board-topline">
        <span>Audio-interface study</span>
        <span>Independent work</span>
      </div>
      <div className={"board-canvas view-" + view}>
        <div className="board-cross cross-one" />
        <div className="board-cross cross-two" />
        <img
          src={view === "3d" ? board.image : board.layout}
          width="929"
          height="629"
          alt={
            view === "3d"
              ? "Original 3D design view of my audio-interface PCB"
              : "Original routed PCB layout of my audio-interface project"
          }
          fetchPriority="high"
        />
        <span className="board-caption">
          {view === "3d"
            ? "Component placement & physical layout"
            : "Routing & board layout"}
        </span>
      </div>
      <div className="board-bottomline">
        <div className="view-switch" aria-label="Board view">
          <button
            type="button"
            aria-pressed={view === "3d"}
            onClick={() => setView("3d")}
          >
            3D view
          </button>
          <button
            type="button"
            aria-pressed={view === "layout"}
            onClick={() => setView("layout")}
          >
            PCB layout
          </button>
        </div>
        <Link
          to="/projects/aux-bluetooth"
          aria-label="Read the audio-interface PCB case study"
        >
          <Icon name="diagonal" />
        </Link>
      </div>
    </div>
  );
}
function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <h1>
          From circuit
          <br />
          <em>to system.</em>
        </h1>
        <p className="hero-intro">
          I’m Samuel, an electrical engineer connecting hardware design,
          embedded control, and real-world systems.
        </p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/projects">
            Explore my work
            <Icon name="diagonal" size={18} />
          </Link>
          <ResumeLink />
        </div>
        <div className="hero-context">
          <div>
            <span className="context-dot" />
            Based in Austin, TX
          </div>
          <p>
            Currently designing electrical systems at <strong>Avride.</strong>
          </p>
        </div>
      </div>
      <div className="hero-visual">
        <BoardViewer />
        <p className="hero-visual-note">
          <span>01 / A closer look</span>
          <span>Original design from the project archive.</span>
        </p>
      </div>
    </section>
  );
}
function Disciplines() {
  return (
    <div className="discipline-band">
      <div className="container discipline-inner">
        {[
          "Electrical design",
          "PCB & embedded systems",
          "Sensing & measurement",
          "Hardware + software",
        ].map((label, i) => (
          <span key={label}>
            <span className="discipline-number">0{i + 1}</span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
function FocusVisual({ project, compact = false }) {
  const battery = project.imageType === "measurement";
  return (
    <div
      className={
        "focus-visual " + project.imageType + (compact ? " compact" : "")
      }
    >
      <div className="focus-topline">
        <span>{battery ? "A measurement chain" : "Design focus"}</span>
        <span>{project.number}</span>
      </div>
      {battery ? (
        <>
          <div className="measurement-chain">
            <div>
              <small>Observe</small>
              <strong>
                Battery
                <br />
                current
              </strong>
            </div>
            <span className="chain-link" />
            <div>
              <small>Measure</small>
              <strong>INA260</strong>
            </div>
            <span className="chain-link" />
            <div>
              <small>Record</small>
              <strong>
                Raspberry
                <br />
                Pi
              </strong>
            </div>
          </div>
          <div className="measurement-rule">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p>Functional overview · not a wiring diagram</p>
        </>
      ) : (
        <>
          <div className="focus-title">
            {project.imageType === "wireless"
              ? "Wireless.\nBy design."
              : "Sense.\nThen understand."}
          </div>
          <div className="focus-topics">
            {project.focus.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <p>{project.status}</p>
        </>
      )}
    </div>
  );
}
function ProjectMedia({ project, className = "" }) {
  return project.image ? (
    <div className={"project-media " + project.imageType + " " + className}>
      <img
        src={project.image}
        width={project.imageType === "board" ? 929 : 1200}
        height={project.imageType === "board" ? 629 : 900}
        alt={
          project.imageType === "board"
            ? "Original audio-interface board design"
            : project.title + " — original project photograph"
        }
        loading="lazy"
        decoding="async"
      />
    </div>
  ) : (
    <FocusVisual project={project} compact />
  );
}
function ProjectCard({ project, offset = false }) {
  return (
    <article className={"project-card" + (offset ? " offset-card" : "")}>
      <Link to={"/projects/" + project.id} className="project-card-link">
        <div className="card-media-wrap">
          <ProjectMedia project={project} />
          <span className="project-open" aria-hidden="true">
            <Icon name="diagonal" size={23} />
          </span>
        </div>
        <div className="project-card-meta">
          <span>{project.category}</span>
          <span>{project.number}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <span className="project-status">{project.status}</span>
      </Link>
    </article>
  );
}
function SelectedWork() {
  return (
    <section className="section selected-work container" id="selected-work">
      <SectionLabel number="01">Selected work</SectionLabel>
      <div className="section-heading">
        <h2>
          Ideas, made
          <br />
          <em>tangible.</em>
        </h2>
        <div>
          <p>
            Independent projects at the intersection of circuits, control, and
            code. A look at the work, and how far it’s been taken.
          </p>
          <Link to="/projects" className="text-link">
            View all projects
            <Icon name="diagonal" size={17} />
          </Link>
        </div>
      </div>
      <div className="featured-grid">
        <ProjectCard project={projects[0]} />
        <ProjectCard project={projects[1]} offset />
      </div>
      <Link to="/projects/battery-management" className="measurement-feature">
        <div>
          <span className="project-card-meta">03 / Sensing & measurement</span>
          <h3>
            Make the invisible
            <br />
            measurable.
          </h3>
          <p>
            Battery-current measurement, from a custom sensor PCB to bench
            troubleshooting.
          </p>
          <span className="text-link">
            Inside the project
            <Icon name="diagonal" size={17} />
          </span>
        </div>
        <FocusVisual project={projects[2]} />
      </Link>
    </section>
  );
}
function Experience({ full = false }) {
  const Heading = full ? "h1" : "h2";
  return (
    <section
      className={"experience-section" + (full ? " full-experience" : "")}
      id="experience"
    >
      <div className="container">
        <SectionLabel number="02">Professional experience</SectionLabel>
        <div className="experience-heading">
          <Heading>
            Built around
            <br />
            <em>real-world systems.</em>
          </Heading>
          <p>
            Electrical design, integration, and troubleshooting across
            automotive and field engineering.
          </p>
        </div>
        <div className="experience-list">
          {experience.map((job, i) => (
            <article className="experience-row" key={job.company}>
              <div className="experience-date">
                {job.period}
                {job.current && (
                  <span className="current-label">Current role</span>
                )}
              </div>
              <div className="experience-company">
                <h3>{job.company}</h3>
                <p>{job.role}</p>
              </div>
              <div className="experience-description">
                <p>{job.description}</p>
                <details open={full || i === 0}>
                  <summary>
                    Responsibilities <span aria-hidden="true">+</span>
                  </summary>
                  <ul>
                    {job.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
        <div className="experience-footnote">
          <span>
            Employer work is described at a high level. No internal drawings or
            confidential project details are shared.
          </span>
          <ResumeLink className="text-link">Full résumé</ResumeLink>
        </div>
      </div>
    </section>
  );
}
function Expertise() {
  const groups = [
    {
      title: "Design & CAD",
      items: [
        "Electrical schematics & 3D harness design",
        "PCB layout & sensor interfaces",
        "Altium Designer · EasyEDA",
        "SOLIDWORKS · AutoCAD · Multisim",
      ],
    },
    {
      title: "Test & integration",
      items: [
        "Data acquisition & root-cause analysis",
        "Current measurement & power management",
        "Digital multimeters · NI myDAQ",
        "CAN · Ethernet · SPI · UART · I²C",
      ],
    },
    {
      title: "Embedded & software",
      items: [
        "Raspberry Pi & Nordic SoCs",
        "Python · LabVIEW",
        "MOSFET / relay control",
        "Hardware–software integration",
      ],
    },
  ];
  return (
    <section className="section expertise container" id="expertise">
      <SectionLabel number="03">The toolkit</SectionLabel>
      <div className="section-heading compact-heading">
        <h2>
          Across the
          <br />
          <em>engineering stack.</em>
        </h2>
        <p>
          A practical mix of electrical design, hands-on investigation, and
          software.
        </p>
      </div>
      <div className="expertise-grid">
        {groups.map((g, i) => (
          <div className="expertise-group" key={g.title}>
            <span className="expertise-index">0{i + 1}</span>
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
function About() {
  return (
    <section className="about-section container" id="about">
      <div className="about-photo">
        <img
          src="/media/samuel.webp"
          width="600"
          height="750"
          alt="Samuel Simkin"
          loading="lazy"
        />
        <span>Samuel Simkin / Austin, TX</span>
      </div>
      <div className="about-copy">
        <SectionLabel number="04">A little about me</SectionLabel>
        <h2>
          Curious by nature.
          <br />
          <em>Hands-on by habit.</em>
        </h2>
        <p>
          I’m an electrical engineer based in Austin. My work spans vehicle
          electrical systems, custom PCB designs, embedded control, and the
          troubleshooting that connects a design to a working system.
        </p>
        <p>
          Alongside my engineering roles, I explore independent hardware
          projects: from audio and wireless devices to sensing, measurement, and
          fluid-control electronics.
        </p>
        <div className="about-facts">
          <div>
            <span>Education</span>
            <strong>Penn State</strong>
            <p>B.S. Electrical Engineering · 2022</p>
          </div>
          <div>
            <span>Languages</span>
            <strong>English & Spanish</strong>
            <p>Fluent in both</p>
          </div>
        </div>
        <a
          className="text-link"
          href="https://github.com/Sams25422"
          target="_blank"
          rel="noreferrer"
        >
          More of what I’m building
          <Icon name="diagonal" size={17} />
        </a>
      </div>
    </section>
  );
}
function Contact({ page = false }) {
  const Heading = page ? "h1" : "h2";
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setFailed(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setFailed(true);
    }
  }
  return (
    <section
      className={"contact-section" + (page ? " contact-page" : "")}
      id="contact"
    >
      <div className="container">
        <SectionLabel number="05">Get in touch</SectionLabel>
        <div className="contact-heading">
          <Heading>
            Good engineering
            <br />
            starts with a<br />
            <em>conversation.</em>
          </Heading>
          <div>
            <p>
              Have an engineering opportunity, an interesting project, or a
              question about my work?
            </p>
            <a href={"mailto:" + email} className="button button-dark">
              Let’s talk
              <Icon name="diagonal" size={18} />
            </a>
          </div>
        </div>
        <div className="contact-email-row">
          <a className="contact-email" href={"mailto:" + email}>
            {email}
          </a>
          <button
            type="button"
            className="copy-button"
            onClick={copy}
            aria-label={copied ? "Email copied" : "Copy email address"}
          >
            <Icon name={copied ? "check" : "copy"} size={22} />
            <span>{copied ? "Copied" : "Copy email"}</span>
          </button>
        </div>
        <p className="copy-status" role="status">
          {copied
            ? "Email address copied."
            : failed
              ? "Select the email address above to copy it, or use the email link."
              : ""}
        </p>
        <div className="contact-links">
          <span>Austin, Texas</span>
          <a href="tel:+17868162220">
            (786) 816-2220
            <Icon name="diagonal" size={15} />
          </a>
          <a
            href="https://github.com/Sams25422"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <Icon name="diagonal" size={15} />
          </a>
          <ResumeLink />
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link to="/" className="footer-brand">
          Samuel Simkin<span>.</span>
        </Link>
        <span>Electrical design. Practical curiosity.</span>
        <span>© {new Date().getFullYear()} Samuel Simkin</span>
      </div>
    </footer>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <Disciplines />
      <SelectedWork />
      <Experience />
      <Expertise />
      <About />
      <Contact />
    </>
  );
}
function WorkIndex() {
  const [filter, setFilter] = useState("All work");
  const shown = projects.filter(
    (p) => filter === "All work" || p.filter === filter,
  );
  return (
    <>
      <section className="container work-index section">
        <SectionLabel number="01">Project index</SectionLabel>
        <div className="section-heading">
          <h1>
            Work in
            <br />
            <em>the details.</em>
          </h1>
          <p>
            Designs, prototypes, builds, and early explorations. Each project is
            labelled by the work actually documented, not a blanket “completed”
            status.
          </p>
        </div>
        <div className="filter-row" aria-label="Filter projects by discipline">
          {filters.map((f) => (
            <button
              type="button"
              aria-pressed={filter === f}
              key={f}
              onClick={() => setFilter(f)}
            >
              {f}
              {f === "All work" && <span>{projects.length}</span>}
            </button>
          ))}
        </div>
        <p className="results-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "project" : "projects"} /{" "}
          {filter}
        </p>
        <div className="project-grid">
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}
function Gallery({ items }) {
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  function show(item, event) {
    opener.current = event.currentTarget;
    setActive(item);
  }
  useEffect(() => {
    if (active && !dialog.current.open) dialog.current.showModal();
  }, [active]);
  function close() {
    dialog.current?.close();
    setActive(null);
    opener.current?.focus();
  }
  if (!items.length) return null;
  return (
    <section className="project-gallery" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading">From the project archive.</h2>
      <p>Original project media. Select an image for a closer look.</p>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <figure key={item.src} className={i === 0 ? "gallery-feature" : ""}>
            {item.type === "video" ? (
              <video
                controls
                playsInline
                preload="none"
                poster={item.poster}
                aria-label={item.alt}
              >
                <source src={item.src} type="video/mp4" />
                Your browser does not support this video.{" "}
                <a href={item.src}>Open the original demonstration.</a>
              </video>
            ) : (
              <button
                type="button"
                className="gallery-image"
                onClick={(e) => show(item, e)}
                aria-label={"Enlarge: " + item.alt}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span>
                  <Icon name="expand" />
                </span>
              </button>
            )}
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-label={active?.alt || "Project image"}
      >
        <div className="lightbox-inner">
          <button
            onClick={close}
            aria-label="Close enlarged image"
            className="lightbox-close"
          >
            <Icon name="close" />
          </button>
          {active && (
            <>
              <img src={active.src} alt={active.alt} />
              <p>{active.caption}</p>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <article className="project-detail container">
        <Link to="/projects" className="text-link back-link">
          <Icon
            name="arrow"
            style={{ transform: "rotate(180deg)" }}
            size={17}
          />
          All projects
        </Link>
        <div className="project-detail-heading">
          <div>
            <span className="detail-category">
              {project.number} / {project.category}
            </span>
            <h1>
              {project.title}
              <span>.</span>
            </h1>
          </div>
          <p>{project.summary}</p>
        </div>
        <div className="project-detail-meta">
          <div>
            <span>Scope</span>
            <strong>{project.scope}</strong>
          </div>
          <div>
            <span>Documented stage</span>
            <strong>{project.status}</strong>
          </div>
        </div>
        <div className="detail-hero-media">
          <ProjectMedia project={project} />
        </div>
        <div className="case-study-content">
          <aside>
            <span className="section-label">Tools & disciplines</span>
            <ul>
              {project.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a
              className="text-link"
              href={
                "mailto:" +
                email +
                "?subject=" +
                encodeURIComponent("Your " + project.title + " project")
              }
            >
              Ask about this project
              <Icon name="diagonal" size={16} />
            </a>
          </aside>
          <div className="case-study-body">
            <section>
              <h2>The idea.</h2>
              <p>{project.overview}</p>
            </section>
            <section>
              <h2>My contribution.</h2>
              <ul className="contribution-list">
                {project.contributions.map((c, i) => (
                  <li key={c}>
                    <span>0{i + 1}</span>
                    <p>{c}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section className="scope-note">
              <h2>Where the work stands.</h2>
              <p>{project.verification}</p>
            </section>
          </div>
        </div>
        <Gallery key={project.id} items={project.gallery} />
        <Link className="next-project" to={"/projects/" + next.id}>
          <div>
            <span>Next project</span>
            <h2>{next.title}</h2>
          </div>
          <Icon name="diagonal" size={32} />
        </Link>
      </article>
      <Contact />
    </>
  );
}
function NotFound() {
  return (
    <section className="container not-found">
      <span className="section-label">404 / Not in this collection</span>
      <h1>
        Let’s get back
        <br />
        <em>to the work.</em>
      </h1>
      <p>
        This page isn’t part of the current portfolio. Explore the project index
        instead.
      </p>
      <Link className="button button-dark" to="/projects">
        Browse projects
        <Icon name="arrow" />
      </Link>
    </section>
  );
}
export function PortfolioRoutes() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollAndMetadata />
      <Header />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<WorkIndex />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/work" element={<Experience full />} />
          <Route path="/contact" element={<Contact page />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default function Portfolio() {
  return (
    <BrowserRouter>
      <PortfolioRoutes />
    </BrowserRouter>
  );
}
