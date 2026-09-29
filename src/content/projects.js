// Public portfolio content. Current engineering details are grounded in the
// September 2026 resume; archive media is explicitly identified below.
export const projects = [
  {
    id: "aux-bluetooth",
    number: "01",
    title: "Audio-interface PCB",
    shortTitle: "A circuit. A layout. A physical design.",
    category: "PCB & wireless",
    filter: "PCB & wireless",
    status: "Schematic & PCB design",
    scope: "Independent project · portfolio archive",
    image: "/media/audio-render.webp",
    layout: "/media/audio-layout.webp",
    imageType: "board",
    summary:
      "An independent auxiliary-audio / Bluetooth interface study, taken from schematic through PCB layout and a 3D board view.",
    overview:
      "An earlier exploration of wireless audio hardware. The original project archive documents the schematic, routed board, and component placement in a 3D view.",
    contributions: [
      "Developed the schematic and PCB layout for an audio-interface concept.",
      "Worked through component placement, audio-signal routing, and power circuitry.",
      "Reviewed the physical board design using a 3D PCB view.",
    ],
    verification:
      "The images are original design artifacts from my earlier portfolio. They document design work, not a fabricated or performance-validated product. This is separate from the nRF5340 audio project listed in my current resume.",
    tools: ["PCB layout", "Schematic design", "Audio interfaces", "Bluetooth"],
    gallery: [
      {
        src: "/media/audio-render.webp",
        alt: "Original 3D view of the audio-interface PCB",
        caption: "3D board view · original design artifact",
        type: "image",
      },
      {
        src: "/media/audio-layout.webp",
        alt: "Routed audio-interface PCB layout",
        caption: "PCB layout · original design artifact",
        type: "image",
      },
      {
        src: "/media/audio-schematic.webp",
        alt: "Audio-interface circuit schematic",
        caption: "Circuit schematic · original design artifact",
        type: "image",
      },
    ],
  },
  {
    id: "smart-bartender",
    number: "02",
    title: "Smart Bartender",
    shortTitle: "Hardware meets a usable interface.",
    category: "Embedded & control",
    filter: "Embedded & control",
    status: "Prototype & integration",
    scope: "Independent project",
    image: "/media/bartender.webp",
    imageType: "photo",
    summary:
      "Raspberry Pi-based dispensing control, bringing together a custom PCB, pump electronics, and a Python interface.",
    overview:
      "A hands-on fluid-control project connecting the electrical design to the software a person actually uses. The work spans pump-control electronics, power circuitry, and application integration on Raspberry Pi.",
    contributions: [
      "Designed custom-PCB fluid-control electronics with MOSFET-switched pumps and protected 12 V power circuitry.",
      "Developed PWM pump-control logic and a Python / Flask interface for dispensing control.",
      "Debugged Flask and SQLite integration on Raspberry Pi.",
    ],
    verification:
      "The project includes prototype hardware and integration work. The photographs and demonstration footage below are from the earlier project archive; they are not presented as a finished commercial product.",
    tools: [
      "Raspberry Pi",
      "Python / Flask",
      "PWM control",
      "PCB design",
      "SQLite",
    ],
    gallery: [
      {
        src: "/media/bartender.webp",
        alt: "Smart Bartender prototype with fluid tubing, pumps and control electronics",
        caption: "Early prototype · hardware integration",
        type: "image",
      },
      {
        src: "/media/bartender-interface.webp",
        alt: "Original Smart Bartender recipe selection interface",
        caption: "Earlier interface exploration · recipe selection",
        type: "image",
      },
      {
        src: "/media/bartender-demo.mp4",
        poster: "/media/bartender.webp",
        alt: "Original Smart Bartender prototype demonstration",
        caption: "Original prototype demonstration · archive footage",
        type: "video",
      },
    ],
  },
  {
    id: "battery-management",
    number: "03",
    title: "Battery-current measurement",
    shortTitle: "Make the invisible measurable.",
    category: "Sensing & measurement",
    filter: "Sensing & measurement",
    status: "PCB fabrication & bench troubleshooting",
    scope: "Independent project",
    imageType: "measurement",
    summary:
      "An INA260-based current-logging PCB for observing automotive battery current after shutdown, with Raspberry Pi data acquisition.",
    overview:
      "A measurement-focused project built around post-shutdown battery current. The work connects a fabricated sensor PCB, current-path control, and software logging with practical bench troubleshooting.",
    contributions: [
      "Designed and fabricated an INA260-based current-logging PCB interfacing with a Raspberry Pi.",
      "Implemented relay-based current-path control using an IRLZ44N MOSFET driver and a separate USB-C supply for the relay and Raspberry Pi.",
      "Developed GPIO control logic with software debouncing for switching and data acquisition.",
    ],
    verification:
      "Compared sensor readings with digital-multimeter measurements. Investigated current-path wiring discrepancies and intermittent I²C communication. No accuracy, power-consumption, or product-readiness claim is made beyond this bench work.",
    tools: ["INA260", "Raspberry Pi", "GPIO", "I²C", "Current measurement"],
    gallery: [],
    focus: ["Measure current", "Log observations", "Investigate discrepancies"],
  },
  {
    id: "bluetooth-audio",
    number: "04",
    title: "Bluetooth audio device",
    category: "PCB & wireless",
    filter: "PCB & wireless",
    status: "PCB & RF design",
    scope: "Independent project",
    imageType: "wireless",
    summary:
      "An nRF5340-based audio PCB exploring RF layout, audio routing, power management, and external amplification.",
    overview:
      "A Bluetooth audio design in Altium Designer, with attention to the relationship between RF circuitry, audio-signal routing, and power management.",
    contributions: [
      "Designed an nRF5340-based Bluetooth audio PCB in Altium Designer.",
      "Addressed RF layout, audio-signal routing, power management, and external amplification.",
      "Configured Bluetooth profiles for device pairing and LE Audio support, with low-power operation as a design objective.",
    ],
    verification:
      "This entry describes design and configuration work. Low-power operation is an objective, not a measured result. No finished-device photographs or validated audio-performance figures are claimed.",
    tools: ["nRF5340", "Altium Designer", "RF layout", "LE Audio"],
    gallery: [],
    focus: ["RF layout", "Audio-signal routing", "Power management"],
  },
  {
    id: "tracking-system",
    number: "05",
    title: "Bluetooth tracking hardware",
    category: "PCB & wireless",
    filter: "PCB & wireless",
    status: "PCB & RF design",
    scope: "Independent project",
    imageType: "wireless",
    summary:
      "Nordic-based, low-power tracking PCB designs with RF matching, antenna interfaces, and multilayer routing.",
    overview:
      "An independent hardware-design exploration of compact Bluetooth tracking devices. The emphasis is on the supporting RF, clocking, and battery circuitry rather than a claimed production tracking network.",
    contributions: [
      "Designed Nordic-based tracking PCBs in Altium Designer and EasyEDA.",
      "Worked on RF matching networks, antenna interfaces, and multilayer routing.",
      "Incorporated crystal oscillators and battery-management circuitry into schematic and design-rule-compliant layouts.",
    ],
    verification:
      "The documented work is PCB and RF design. This is not a claim of Apple Find My certification, production readiness, verified battery life, or a completed location-tracking service.",
    tools: ["Nordic SoCs", "Altium Designer", "EasyEDA", "RF matching"],
    gallery: [],
    focus: ["Antenna interfaces", "RF matching", "Multilayer routing"],
  },
  {
    id: "wearable-sensors",
    number: "06",
    title: "Wearable sensor platform",
    category: "Sensing & measurement",
    filter: "Sensing & measurement",
    status: "Component selection & prototype planning",
    scope: "Independent concept",
    imageType: "sensors",
    summary:
      "A wearable-sensing concept connecting motion, optical, and temperature sensing with battery monitoring and haptics.",
    overview:
      "An early-stage platform concept built around selecting components and planning independent module tests before attempting custom-PCB integration.",
    contributions: [
      "Selected nRF52840-DK, BMA400, MAX30101 / MAX32664, and TMP117 components.",
      "Included battery monitoring and haptics in the platform concept.",
      "Planned module-by-module testing ahead of custom-PCB integration.",
    ],
    verification:
      "This project is in component-selection and prototype-planning scope. It is not a completed wearable, a tested health-monitoring product, or a medical device.",
    tools: ["nRF52840", "BMA400", "Optical sensing", "TMP117"],
    gallery: [],
    focus: ["Motion", "Optical sensing", "Temperature"],
  },
  {
    id: "electric-gokart",
    number: "07",
    title: "Electric go-kart",
    category: "Power & analog",
    filter: "Power & analog",
    status: "Power-system configuration & checks",
    scope: "Academic project · Aug 2021–May 2022",
    image: "/media/gokart.webp",
    imageType: "photo",
    summary:
      "A six-battery series/parallel supply for a DC motor, with battery-condition and electrical-output checks.",
    overview:
      "A practical electric-vehicle project focused on configuring the battery supply and checking electrical behavior with a digital multimeter.",
    contributions: [
      "Configured a six-battery series/parallel supply for a DC motor.",
      "Used a digital multimeter to check battery condition and electrical output.",
    ],
    verification:
      "The documented contribution is the battery-supply configuration and electrical checks. The archive photographs show the physical project; they do not establish a certified vehicle design or measured performance specification.",
    tools: ["Battery configuration", "DC motor", "Digital multimeter"],
    gallery: [
      {
        src: "/media/gokart.webp",
        alt: "Electric go-kart project with battery supply and exposed chassis",
        caption: "Electric go-kart · project archive",
        type: "image",
      },
      {
        src: "/media/gokart-detail.webp",
        alt: "Second view of the electric go-kart project",
        caption: "Project detail · original photograph",
        type: "image",
      },
      {
        src: "/media/gokart-demo.mp4",
        poster: "/media/gokart.webp",
        alt: "Original electric go-kart demonstration",
        caption: "Project demonstration · original archive footage",
        type: "video",
      },
    ],
  },
  {
    id: "karaoke-machine",
    number: "08",
    title: "Analog audio circuit",
    category: "Power & analog",
    filter: "Power & analog",
    status: "Circuit design & build",
    scope: "Academic project · Aug–Dec 2020",
    image: "/media/analog-audio.webp",
    imageType: "photo",
    summary:
      "An LF412CN op-amp audio circuit with tone and volume controls, from input through output-driver stages.",
    overview:
      "A hands-on analog-audio build exploring input, attenuation, tone control, volume control, and output-driver circuitry.",
    contributions: [
      "Designed and built an LF412CN op-amp audio circuit.",
      "Integrated tone and volume controls with input, attenuation, and output-driver stages.",
    ],
    verification:
      "The project documents a circuit design and physical build. No measured distortion, frequency-response, or audio-quality specification is asserted.",
    tools: [
      "Analog electronics",
      "LF412CN",
      "Audio-signal routing",
      "Circuit assembly",
    ],
    gallery: [
      {
        src: "/media/analog-audio.webp",
        alt: "Physical analog audio circuit build",
        caption: "Analog audio circuit · original project photograph",
        type: "image",
      },
      {
        src: "/media/analog-board.webp",
        alt: "Close-up of the analog audio circuit board",
        caption: "Circuit-board detail · original project photograph",
        type: "image",
      },
    ],
  },
];
export const filters = [
  "All work",
  "PCB & wireless",
  "Embedded & control",
  "Sensing & measurement",
  "Power & analog",
];
export const experience = [
  {
    company: "Avride",
    role: "Electrical Design Engineer",
    period: "Jan 2026 — Present",
    current: true,
    description:
      "Electrical design for autonomous-vehicle builds, from evolving system requirements to coordinated vehicle integration.",
    details: [
      "Designed and revised wiring harnesses and electrical documentation.",
      "Created circuit diagrams, harness drawings, and 3D harness models in SOLIDWORKS.",
      "Collaborated across engineering teams through design revisions and vehicle builds.",
    ],
  },
  {
    company: "Honda",
    fullCompany: "American Honda Motor Company",
    role: "Electrical Engineer",
    period: "Jun 2022 — Jan 2026",
    description:
      "Vehicle electrical troubleshooting, software integration, and cross-functional validation at American Honda Motor Company in Marysville, Ohio.",
    details: [
      "Used data acquisition, logging, and diagnostic tools for root-cause analysis.",
      "Worked across CAN, Ethernet, SPI, and UART interfaces with engineering teams.",
      "Coordinated supplier integration and supported software updates across thousands of vehicles.",
      "Trained engineers and technicians on update validation and test documentation.",
    ],
  },
  {
    company: "Generator Supercenter",
    role: "Field Project Supervisor / Engineering Consultant Intern",
    period: "Jul — Aug 2021",
    description:
      "Field coordination for generator installations in Hollywood, Florida.",
    details: [
      "Coordinated schedules, resources, and installation-team performance.",
      "Oversaw utility-cable rerouting through automatic transfer switch systems.",
    ],
  },
];
