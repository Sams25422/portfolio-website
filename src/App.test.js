import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PortfolioRoutes } from "./Portfolio";
import { projects, experience } from "./content/projects";
beforeAll(() => {
  window.scrollTo = jest.fn();
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: true,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
});
afterEach(cleanup);
const open = (url = "/") =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <PortfolioRoutes />
    </MemoryRouter>,
  );
test("home presents the engineering positioning and current role", () => {
  open();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /From circuit/,
  );
  expect(screen.getByText("Electrical Design Engineer")).toBeInTheDocument();
});
test("board control switches between actual design views", () => {
  open();
  const b = screen.getByRole("button", { name: "PCB layout" });
  fireEvent.click(b);
  expect(b).toHaveAttribute("aria-pressed", "true");
  expect(
    screen.getByAltText(
      "Original routed PCB layout of my audio-interface project",
    ),
  ).toBeInTheDocument();
});
test("all documented projects appear in index", () => {
  open("/projects");
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
    projects.length,
  );
});
test("discipline filter updates actual projects", () => {
  open("/projects");
  fireEvent.click(screen.getByRole("button", { name: "PCB & wireless" }));
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  expect(
    screen.getByRole("button", { name: "PCB & wireless" }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("component planning is not presented as a completed wearable", () => {
  open("/projects/wearable-sensors");
  expect(
    screen.getByText("Component selection & prototype planning", {
      selector: "strong",
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/not a completed wearable/)).toBeInTheDocument();
});
test("battery case distinguishes bench work from validated performance", () => {
  open("/projects/battery-management");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Battery-current measurement",
  );
  expect(screen.getByText(/Compared sensor readings/)).toBeInTheDocument();
});
test("unknown project provides useful recovery", () => {
  open("/projects/not-real");
  expect(screen.getByRole("link", { name: /Browse projects/ })).toHaveAttribute(
    "href",
    "/projects",
  );
});
test("contact is a real mailto link rather than a fake form", () => {
  open("/contact");
  expect(screen.getByRole("link", { name: /Let’s talk/ })).toHaveAttribute(
    "href",
    "mailto:simkinsamuel@gmail.com",
  );
  expect(document.querySelector("form")).toBeNull();
});
test("resume links point to the local PDF", () => {
  open();
  for (const a of document.querySelectorAll("a[download]"))
    expect(a).toHaveAttribute("href", "/Samuel-Simkin-Resume.pdf");
});
test("mobile menu can be opened and closed", () => {
  open();
  fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
  expect(
    screen.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  fireEvent.keyDown(window, { key: "Escape" });
  expect(
    screen.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test.each(["/", "/work"])(
  "job actions use past tense on %s without ending the current role",
  (route) => {
    const { container } = open(route);
    const bullets = Array.from(
      container.querySelectorAll(".experience-description li"),
    ).map((node) => node.textContent);
    expect(bullets).toHaveLength(
      experience.reduce((count, job) => count + job.details.length, 0),
    );
    expect(bullets).toContain(
      "Designed and revised wiring harnesses and electrical documentation.",
    );
    expect(bullets).toContain(
      "Created circuit diagrams, harness drawings, and 3D harness models in SOLIDWORKS.",
    );
    expect(bullets).toContain(
      "Collaborated across engineering teams through design revisions and vehicle builds.",
    );
    for (const bullet of bullets) {
      expect(bullet).toMatch(
        /^(Designed|Created|Collaborated|Used|Worked|Coordinated|Trained|Oversaw)\b/,
      );
      expect(bullet).not.toMatch(
        /\b(Design and revise|Create circuit|Collaborate across)\b/,
      );
    }
    expect(screen.getByText("Jan 2026 — Present")).toBeInTheDocument();
    expect(screen.getByText("Current role")).toBeInTheDocument();
  },
);
