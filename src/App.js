import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck, 
  X, 
  Crosshair, 
  Maximize2, 
  FileText,
  Activity,
  Aperture,
  Wifi,
  Battery,
  Target,
  Cpu,
  Scan,
  Database,
  BarChart3
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const DATA = {
  name: "ATHARVA NAYAK",
  title: "M.S. ROBOTICS | PROTOCOL: GRAD_STUDENT",
  tagline: "SPECIALIZING IN SLAM, PATH PLANNING, AND EMBEDDED SYSTEMS.",
  about: "M.S. ROBOTICS STUDENT AT NORTHEASTERN UNIVERSITY SPECIALIZING IN SLAM, SENSOR FUSION, AND AUTONOMOUS SYSTEMS. I ENGINEER ROBUST REAL-TIME PERCEPTION PIPELINES AND DEPLOY THEM ON COMPLEX HARDWARE, RANGING FROM THE BOSTON DYNAMICS SPOT TO CUSTOM EMBEDDED CONTROLLERS.",
  email: "nayak.at@northeastern.edu",
  github: "https://github.com/atharvanayak25",
  linkedin: "https://linkedin.com/in/nayakatharva25",
  resume: "public/assets/AtharvaNayak_Resume_111025.pdf",
  
  // Your Profile Image
  heroImage: "public/assets/profile_photo.jpeg", 
  
  skills: [
    { 
      category: "LANGUAGES", 
      items: ["PYTHON", "C++", "C", "MATLAB", "VERILOG", "CUDA", "BASH"] 
    },
    { 
      category: "ROBOTICS & AI", 
      items: ["ROS", "ROS 2", "GAZEBO", "ISAAC SIM", "OPENCV", "PYTORCH", "TENSORFLOW", "NUMPY", "SCIPY", "MOVEIT", "NAV2"] 
    },
    { 
      category: "EMBEDDED & HARDWARE", 
      items: ["RASPBERRY PI", "JETSON NANO", "FPGA (SPARTAN-6)", "VIVADO", "ARDUINO", "I2C / SPI / UART", "TCP/IP"] 
    },
    { 
      category: "TOOLS & PLATFORMS", 
      items: ["LINUX", "GIT", "DOCKER", "SOLIDWORKS", "RVIZ", "CMAKE", "SIMULINK"] 
    }
  ],
  
  projects: [
    {
      id: 1,
      category: "project",
      title: "OUTPUT SAMPLED MPPI",
      type: "SYSTEM: CONTROL",
      description: "STANDARD MODEL PREDICTIVE CONTROL METHODS OFTEN SUFFER FROM HIGH COMPUTATIONAL COSTS, LIMITING REAL-TIME PERFORMANCE ON EMBEDDED ROBOTICS HARDWARE. THIS PROJECT ADDRESSED THE LATENCY BOTTLENECK IN AUTONOMOUS VEHICLE NAVIGATION.",
      details: "I engineered an optimized Model Predictive Path Integral (o-MPPI) controller that leverages inverse dynamics modeling and output-space sampling to drastically reduce sampling complexity. By shifting the sampling distribution to the output space, I achieved a 12x reduction in computation time (from 98ms to 8ms), enabling high-frequency real-time control. The algorithm was rigorously validated in Gazebo simulations and physically deployed on a TurtleBot 3, demonstrating stable path tracking across 15+ diverse track configurations under varying dynamic conditions.",
      stack: ["ROS 2", "PYTHON", "GAZEBO", "CONTROL THEORY"],
      image: "/public/assets/MPPI_Img.png",
      github: "https://github.com/atharvanayak25",
      demo: "#"
    },
    {
      id: 2,
      category: "project",
      title: "POINT-LIO SLAM",
      type: "SYSTEM: PERCEPTION",
      description: "TRADITIONAL LIDAR SLAM METHODS STRUGGLE WITH HIGH-SPEED MOTION AND FEATURE-POOR ENVIRONMENTS, OFTEN LEADING TO DRIFT OR TRACKING FAILURE. THIS PROJECT AIMED TO DEPLOY A ROBUST STATE ESTIMATION SYSTEM CAPABLE OF HANDLING AGGRESSIVE MANEUVERS ON LEGGED ROBOTS.",
      details: "I integrated the Point-LIO (LiDAR Inertial Odometry) framework onto a Boston Dynamics Spot robot to enable drift-free localization in challenging indoor environments. The system tightly couples high-frequency IMU data with LiDAR point clouds using an Extended Kalman Filter (EKF), allowing it to process 10,000+ points per frame at 10Hz. I benchmarked the system against LIO-SAM and FAST-LIO2, demonstrating superior performance in long corridor environments and maintaining sub-2cm accuracy during high-speed motion up to 75 rad/s.",
      stack: ["LIDAR", "IMU", "EKF", "C++"],
      image: "public/assets/Point-LIO_img.jpg",
      github: "https://github.com/atharvanayak25",
      demo: "#"
    },
    {
      id: 3,
      category: "project",
      title: "FIREARM DETECTION",
      type: "SYSTEM: VISION",
      description: "ACTIVE SHOOTER INCIDENTS REQUIRE IMMEDIATE RESPONSE, YET HUMAN MONITORING OF SURVEILLANCE FEEDS IS PRONE TO FATIGUE AND DELAY. THIS PROJECT DEVELOPED AN AUTOMATED, REAL-TIME THREAT DETECTION SYSTEM TO REDUCE RESPONSE TIMES IN CRITICAL SECURITY SCENARIOS.",
      details: "I engineered a high-performance real-time object detection system by fine-tuning the YOLOv8 deep neural network on a dataset of 2,376 training images, achieving 87% mAP@0.5 with high precision (100%) and recall (92%). The model was optimized for edge deployment using TensorRT on a Jetson Nano, enabling inference at 15+ FPS on live video feeds. To ensure rapid incident response, I architected an automated alerting pipeline that integrates with the Twilio API to instantly send SMS and voice notifications with intelligent frame capture (pre/post-detection context) to security personnel within seconds of a threat being identified.",
      stack: ["YOLOV8", "TWILIO", "PYTORCH", "CV"],
      image: "public/assets/CV_img.png",
      github: "https://github.com/atharvanayak25",
      demo: "#"
    },
    {
      id: 4,
      category: "project",
      title: "AUTONOMOUS DRONE RACING",
      type: "SYSTEM: PLANNING",
      description: "RAW PATH PLANNING ALGORITHMS LIKE RRT PRODUCE JAGGED, INEFFICIENT TRAJECTORIES THAT ARE UNFLYABLE AT HIGH SPEEDS. THIS PROJECT FOCUSED ON GENERATING SMOOTH, DYNAMICALLY FEASIBLE FLIGHT PATHS THROUGH COMPLEX OBSTACLE COURSES.",
      details: "I developed a hierarchical motion planning framework for high-speed drone racing. First, I implemented a 3D RRT algorithm to find an initial collision-free topology through aerial hoops and obstacles. To ensure dynamic feasibility, I formulated a Direct Transcription trajectory optimization problem, solving it using the SLSQP algorithm via SciPy. This optimization enforced physics-based constraints (terminal velocity model), boundary conditions, and obstacle avoidance while minimizing control jerk and energy usage. The final pipeline reduced path length by 68.6% compared to raw RRT, generating smooth, flyable trajectories that strictly adhere to actuator limits.",
      stack: ["PYTHON", "SCIPY", "GTSAM", "NUMPY"],
      image: "public/assets/Drone_img.png",
      github: "https://github.com/atharvanayak25",
      demo: "#"
    },
    {
      id: 5,
      category: "project",
      title: "MULTI-SENSOR DEAD RECKONING",
      type: "SYSTEM: NAVIGATION",
      description: "RELIABLE NAVIGATION IN GPS-DENIED ENVIRONMENTS IS CRITICAL FOR AUTONOMOUS SYSTEMS, YET STANDARD SENSORS SUFFER FROM DRIFT OVER TIME. THIS PROJECT ENGINEERED A DEAD-RECKONING SOLUTION TO MAINTAIN HIGH-ACCURACY LOCALIZATION DURING SATELLITE SIGNAL OUTAGES.",
      details: "I developed a modular sensor fusion framework integrating custom drivers for GPS and IMU data at 100 Hz. By implementing an advanced dead reckoning pipeline with adaptive low-pass filtering and Zero-Velocity Updates (ZUPT), I achieved a 60% reduction in heading drift. The system demonstrated robust performance in field tests, maintaining 2-meter positioning accuracy over 50-meter GPS-denied segments with a 95% correlation to ground truth trajectories.",
      stack: ["PYTHON", "C++", "ROS 2", "SENSOR FUSION"],
      image: "public/assets/DR_img.png",
      github: "https://github.com/atharvanayak25",
      demo: "#"
    }
  ],
  experience: [
    {
      id: 101,
      category: "experience",
      title: "RESEARCH INTERN",
      company: "VIVEKANAND EDUCATION SOCIETY'S INSTITUTE OF TECHNOLOGY",
      period: "JUN 2023 - DEC 2023",
      location: "MUMBAI, INDIA",
      description: "ELECTRONIC SPEED CONTROLLER (ESC) DEVELOPMENT ON FPGA ARCHITECTURE FOR HIGH-PRECISION AUTONOMOUS DRONE PROPULSION.",
      details: "Collaborating within a multidisciplinary research team, I engineered a custom FPGA-based motor control solution to replace off-the-shelf ESCs. My primary contribution was implementing an 8-bit, 25kHz PWM generator in Verilog and coupling it with real-time commutation logic on a MicroBlaze soft processor, achieving a resource footprint of just 4,500 LUTs. I worked closely with hardware engineers to integrate this logic with a custom PCB featuring three-phase MOSFET drivers, successfully validating stable operation of 12V BLDC motors under varying aerodynamic loads.",
      stack: ["VERILOG", "FPGA", "PCB DESIGN", "XILINX"],
      image: "public/assets/vesit_logo.png"
    },
    {
      id: 102,
      category: "experience",
      title: "FPGA RESEARCH INTERN",
      company: "TATA INSTITUTE OF FUNDAMENTAL RESEARCH",
      period: "SEP 2022 - APR 2023",
      location: "MUMBAI, INDIA",
      description: "DEVELOPED A HIGH-SPEED COMMUNICATION INTERFACE BETWEEN SPARTAN-6 FPGA AND WIZFI360 MODULE FOR WIRELESS DATA TRANSFER.",
      details: "I engineered a custom 8-bit SPI communication protocol operating at 100 MHz to facilitate high-speed, reliable bidirectional data transfer between a WizFi360 Wi-Fi module and a Xilinx Spartan-6 FPGA. This implementation achieved a 35% throughput improvement with sub-2ms latency. Furthermore, I developed an embedded web server on the WizFi360 to enable remote bitstream configuration and real-time system monitoring over Wi-Fi, realizing a 98% connection stability rate and significantly reducing experimental setup time.",
      stack: ["SPI", "EMBEDDED C", "WIFI", "IOT"],
      image: "public/assets/tifr_logo.png"
    }
  ]
};

// --- VISUAL COMPONENTS ---

// 1. Dynamic Canvas Background (Chaos to Order)
const DynamicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Particle Configuration
    const particles = [];
    const particleCount = 80;
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Target grid position (Order)
        this.baseX = Math.random() * width;
        this.baseY = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.offset = Math.random() * 100;
      }

      update(scrollY) {
        // Calculate chaos factor based on scroll (0 = chaos, 1 = order)
        // Adjust divider to control how fast order is restored
        const scrollPercent = Math.min(scrollY / (window.innerHeight * 2), 1);
        
        // Circular motion for chaos
        const chaosX = this.x + Math.sin(Date.now() * 0.001 + this.offset) * 2;
        const chaosY = this.y + Math.cos(Date.now() * 0.001 + this.offset) * 2;

        // Grid position for order (snap to nearest 50px grid)
        const gridX = Math.round(this.baseX / 50) * 50;
        const gridY = Math.round(this.baseY / 50) * 50;

        // Interpolate between chaos and order
        const currentX = chaosX * (1 - scrollPercent) + gridX * scrollPercent;
        const currentY = chaosY * (1 - scrollPercent) + gridY * scrollPercent;

        this.x = currentX;
        this.y = currentY;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.6)';
        ctx.fill();
      }
    }

    // Init Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const scrollY = window.scrollY;
      
      particles.forEach(particle => {
        particle.update(scrollY);
        particle.draw();
      });

      // Draw connections
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black">
      {/* Deep Space Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 z-0"></div>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60"></canvas>
      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10 pointer-events-none"></div>
    </div>
  );
};

// 2. Boot Sequence (Atharva System)
const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  
  const bootText = [
    "BOOT SEQUENCE INITIATED...",
    "LOADING ATHARVA.SYS KERNEL...",
    "RETRIEVING PROFILE DATA...",
    "BIOMETRICS VERIFIED...",
    "WELCOME, SIR."
  ];

  useEffect(() => {
    let delay = 0;
    bootText.forEach((text, index) => {
      delay += Math.random() * 400 + 300;
      setTimeout(() => {
        setLines(prev => [...prev, text]);
        if (index === bootText.length - 1) {
          setTimeout(onComplete, 1200);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-cyan-400 p-8">
      <div className="w-64 h-64 border-4 border-cyan-500/30 rounded-full flex items-center justify-center relative animate-pulse mb-8">
        <div className="w-48 h-48 border-2 border-cyan-400/50 rounded-full flex items-center justify-center border-dashed animate-spin-slow">
           <div className="w-32 h-32 border border-cyan-300 rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
      <div className="w-full max-w-lg text-center">
        {lines.map((line, i) => (
          <div key={i} className="mb-2 text-sm tracking-[0.2em] uppercase text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Tech-Frame Image Card (Hero Visual)
const TechImageCard = () => {
  return (
    <div className="relative w-80 h-96 flex flex-col items-center justify-center select-none">
      
      {/* Main Container with Tech Borders */}
      <div className="relative w-full h-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm p-2 group overflow-hidden">
        
        {/* Outer Corner Brackets */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>

        {/* Decorative Side Elements */}
        <div className="absolute top-1/2 -left-3 -translate-y-1/2 flex flex-col gap-1">
           {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-4 bg-cyan-500/30"></div>)}
        </div>
        <div className="absolute top-1/2 -right-3 -translate-y-1/2 flex flex-col gap-1">
           {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-4 bg-cyan-500/30"></div>)}
        </div>

        {/* Header Bar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-cyan-400 z-20">
           <div className="flex items-center gap-2">
             <Scan size={14} />
             <span>VIDEO NO. 2543</span>
           </div>
           <div className="flex flex-col items-end">
             <span>REC</span>
             <span className="text-cyan-600">1080p // 60FPS</span>
           </div>
        </div>

        {/* Inner Frame */}
        <div className="absolute inset-4 border border-cyan-500/20 rounded-sm overflow-hidden">
           {/* The Image */}
           <img 
             src={DATA.heroImage} 
             alt="Profile" 
             className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
           />
           
           {/* Face Tracking Recticle */}
           <div className="absolute top-[20%] left-[25%] w-[50%] h-[40%] border border-cyan-400/40 rounded-lg animate-pulse-slow">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-200"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-200"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-200"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-200"></div>
           </div>

           {/* Dynamic Overlay Grid (Reference Style) */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 mix-blend-overlay"></div>
        </div>

        {/* Footer Data */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
           <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className={`w-2 h-2 rounded-full ${i < 6 ? 'bg-cyan-500' : 'bg-cyan-900'}`}></div>
                 ))}
              </div>
              <span className="text-[8px] font-mono text-cyan-600">BUFFERING: 100%</span>
           </div>
           <div className="text-right text-[10px] font-mono text-cyan-400">
              ID: ATHARVA_N<br/>
              LOC: BOSTON_MA
           </div>
        </div>

        {/* Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/30 animate-scan z-10"></div>
      </div>
    </div>
  );
};

// 4. Generic Holographic Modal Component
const HoloModal = ({ item, onClose }) => {
  if (!item) return null;
  const isExperience = item.category === "experience";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full max-w-2xl bg-black/90 border-2 border-cyan-500/50 p-1 shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 z-10"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 z-10"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 z-10"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 z-10"></div>

        <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6 border-b-2 border-cyan-500/30 pb-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest mb-1">
                 <ShieldCheck size={14} />
                 {isExperience ? "PERSONNEL RECORD" : "SECURE FILE ACCESS"}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white font-mono uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                {item.title}
              </h2>
              {isExperience && (
                <div className="text-cyan-600 text-xs font-mono tracking-widest mt-1">
                  {item.company} // {item.location}
                </div>
              )}
            </div>
            <button onClick={onClose} className="text-cyan-500 hover:text-white hover:rotate-90 transition-all duration-300">
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow space-y-6 font-mono text-sm overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
            <div className="grid md:grid-cols-2 gap-6">
               <div className="relative h-48 border-2 border-cyan-500/30 rounded overflow-hidden group">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"></div>
               </div>
               
               <div className="space-y-4">
                  <div>
                    <h3 className="text-cyan-400 text-xs uppercase tracking-widest mb-2 border-l-4 border-cyan-500 pl-2">
                      {isExperience ? "Role Overview" : "Problem Statement"}
                    </h3>
                    <p className="text-cyan-100/80 leading-relaxed shadow-black drop-shadow-md">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-cyan-400 text-xs uppercase tracking-widest mb-2 border-l-4 border-cyan-500 pl-2">
                      {isExperience ? "Key Technologies" : "Tech Stack"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.stack.map(tech => (
                        <span key={tech} className="bg-cyan-950/80 text-cyan-300 px-2 py-1 text-[10px] border border-cyan-500/50 backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-500/30 p-4 rounded backdrop-blur-sm">
              <h3 className="text-cyan-400 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <Maximize2 size={12} />
                {isExperience ? "Operational Details" : "Technical Details"}
              </h3>
              <p className="text-cyan-100/70 leading-relaxed text-justify">
                {item.details || "Accessing restricted technical data... [REDACTED]"}
              </p>
            </div>
          </div>

          {!isExperience && (
            <div className="mt-8 flex gap-4 pt-4 border-t border-cyan-500/30">
              <a href={item.github} target="_blank" rel="noopener noreferrer" className="flex-1 bg-cyan-600/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 py-3 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase transition-all group hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                <Cpu size={14} className="group-hover:text-white" />
                Initialize Code
              </a>
              <a href={item.demo} className="flex-1 bg-transparent hover:bg-cyan-900/20 text-slate-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/50 py-3 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase transition-all">
                <ExternalLink size={14} />
                View Simulation
              </a>
            </div>
          )}

          {isExperience && (
            <div className="mt-8 pt-4 border-t border-cyan-500/30 text-right">
              <div className="inline-block px-4 py-2 bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-widest">
                TIMEFRAME: {item.period}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 5. Navbar
const Navbar = () => (
  <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-40 border border-cyan-500/30 bg-black/80 backdrop-blur-md rounded-full px-6 py-3 shadow-[0_0_20px_rgba(34,211,238,0.1)] flex justify-between items-center">
    <div className="flex items-center gap-4">
      <Aperture className="text-cyan-400 animate-spin-slow" size={24} />
      <div className="flex flex-col">
        <span className="font-mono font-bold text-cyan-400 tracking-[0.2em] text-sm drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">ATHARVA.SYS</span>
      </div>
    </div>

    <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-cyan-500">
      <a href="#about" className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all">DATA</a>
      <a href="#projects" className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all">PROJECTS</a>
      <a href="#experience" className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all">LOGS</a>
    </div>

    <div className="flex gap-3 text-cyan-600 border-l border-cyan-800 pl-4">
      <Wifi size={14} className="animate-pulse" />
      <Battery size={14} />
    </div>
  </nav>
);

// 6. Holographic Card
const HoloCard = ({ title, children, type = "module" }) => (
  <div className="relative group bg-slate-900/20 border border-cyan-500/30 p-6 backdrop-blur-sm overflow-hidden hover:bg-cyan-900/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4 border-b border-cyan-900/50 pb-2">
        <h3 className="text-cyan-400 font-mono tracking-widest text-sm font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{title}</h3>
        <span className="text-[10px] text-cyan-700 uppercase">{type}</span>
      </div>
      {children}
    </div>
  </div>
);

// 7. Section Header
const SectionHeader = ({ title, sub }) => (
  <div className="flex items-center gap-4 mb-12">
    <Target className="text-cyan-500 animate-spin-slow" size={20} />
    <div className="flex flex-col">
      <h2 className="text-2xl font-mono text-cyan-300 tracking-[0.2em] uppercase shadow-cyan-500/50 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">{title}</h2>
      <span className="text-[10px] text-cyan-600 tracking-widest uppercase">{sub}</span>
    </div>
    <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
  </div>
);

// 8. Interactive Card Component
const InteractiveCard = ({ item, onSelect }) => (
  <div 
    onClick={() => onSelect(item)}
    className="group relative border border-cyan-500/30 bg-black/40 backdrop-blur-sm overflow-hidden cursor-pointer hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] flex flex-col h-full"
  >
    <div className="h-48 relative overflow-hidden flex-shrink-0 border-b border-cyan-500/20">
      <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay z-10"></div>
      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-110" />
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Crosshair size={48} className="text-cyan-400 animate-[spin_4s_linear_infinite]" />
      </div>
    </div>

    <div className="p-6 relative flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-cyan-100 mb-2 font-mono uppercase tracking-wider group-hover:text-cyan-400 transition-colors line-clamp-2 drop-shadow-md">
        {item.title}
      </h3>
      
      {item.company && (
         <div className="text-[10px] text-cyan-600 mb-2 font-mono uppercase tracking-wide line-clamp-1">
           {item.company}
         </div>
      )}

      {item.type && (
         <div className="text-[10px] text-cyan-500 mb-4 font-mono">{item.type}</div>
      )}
      
      <p className="text-slate-400 text-xs font-mono mb-4 leading-relaxed border-l-2 border-cyan-900 pl-3 group-hover:border-cyan-400 transition-colors line-clamp-3 flex-grow">
        {item.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {item.stack.slice(0, 3).map((tech) => (
          <span key={tech} className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-1 border border-cyan-900">
            {tech}
          </span>
        ))}
        {item.stack.length > 3 && (
          <span className="text-[10px] font-mono text-cyan-600 px-1">+ {item.stack.length - 3}</span>
        )}
      </div>

      <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 group-hover:text-cyan-300 transition-colors uppercase tracking-widest mt-auto">
        <Maximize2 size={12} />
        Expand Data
      </div>
    </div>
  </div>
);

// 9. Project Carousel
const ProjectCarousel = ({ projects, onSelect }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-black/50 border border-cyan-500/50 p-2 rounded-full text-cyan-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-cyan-900/50 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]">
        <ChevronLeft size={24} />
      </button>
      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-black/50 border border-cyan-500/50 p-2 rounded-full text-cyan-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-cyan-900/50 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]">
        <ChevronRight size={24} />
      </button>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 custom-scrollbar hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {projects.map((project) => (
          <div key={project.id} className="min-w-[300px] md:min-w-[380px] snap-center h-full">
             <InteractiveCard item={project} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [booted, setBooted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
    <div className="min-h-screen bg-black text-cyan-100 font-sans selection:bg-cyan-500/30 selection:text-white overflow-x-hidden relative">
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scan { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes pulse-fast { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes spin-fast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-scan { animation: scan 3s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-pulse-fast { animation: pulse-fast 1s ease-in-out infinite; }
        .animate-progress { animation: progress 4s ease-out forwards; }
        .animate-spin-fast { animation: spin-fast 2s linear infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .clip-path-trapezoid { clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%); }
        .perspective-500 { perspective: 500px; }
        .rotateX-30 { transform: rotateX(30deg); }
        
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; background: rgba(8, 145, 178, 0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.5); border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34, 211, 238, 0.8); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* BACKGROUND LAYERS */}
      <DynamicBackground />

      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center pt-32 pb-20 relative z-10 px-4">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
            
            <div className="flex items-center gap-2 mb-4 text-cyan-500 font-mono text-xs tracking-widest animate-pulse">
              <ShieldCheck size={14} />
              <span>SYSTEM SECURE</span>
              <span className="w-px h-3 bg-cyan-800 mx-2"></span>
              <span>MARK IX INTERFACE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-300 mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
              {DATA.name}
            </h1>
            
            <div className="inline-block border-l-4 border-cyan-500 bg-cyan-900/20 px-6 py-2 mb-8 backdrop-blur-md">
              <p className="font-mono text-cyan-300 tracking-widest text-sm typing-effect">
                {DATA.title}
              </p>
            </div>

            <p className="text-cyan-100/80 mb-8 max-w-lg leading-relaxed font-mono text-sm border-l border-cyan-900 pl-4 shadow-black drop-shadow-sm">
              {DATA.tagline}
            </p>

            <div className="flex gap-4">
              <a href={DATA.resume} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-cyan-500/10 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-mono tracking-widest text-xs transition-all uppercase flex items-center gap-2 group shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                <FileText size={14} className="group-hover:text-yellow-300 transition-colors" />
                Resume
              </a>
              <a href={DATA.github} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-transparent hover:bg-cyan-900/20 text-slate-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/50 font-mono tracking-widest text-xs transition-all uppercase flex items-center gap-2">
                <Github size={14} />
                Github
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center relative">
            <TechImageCard />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Bio-Data" sub="Subject Profile" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <HoloCard title="SUMMARY" type="TEXT_LOG">
                <p className="text-cyan-100/80 font-mono text-sm leading-7 tracking-wide text-justify shadow-black drop-shadow-md">
                  {DATA.about}
                </p>
              </HoloCard>
            </div>
            
            <div className="space-y-4">
              <HoloCard title="STATS" type="METRICS">
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-cyan-900/50 pb-2">
                    <span className="text-slate-500">DEGREE</span>
                    <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">MASTERS (M.S.)</span>
                  </div>
                  <div className="flex justify-between border-b border-cyan-900/50 pb-2">
                    <span className="text-slate-500">MAJOR</span>
                    <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">ROBOTICS</span>
                  </div>
                  <div className="flex justify-between border-b border-cyan-900/50 pb-2">
                    <span className="text-slate-500">LOCATION</span>
                    <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">BOSTON, MA</span>
                  </div>
                  <div className="flex justify-between border-b border-cyan-900/50 pb-2">
                    <span className="text-slate-500">INTERNSHIP</span>
                    <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">SUMMER 2025</span>
                  </div>
                  <div className="flex justify-between border-b border-cyan-900/50 pb-2">
                    <span className="text-slate-500">GRADUATION</span>
                    <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">MAY 2026</span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-cyan-700">CONTACT</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
                        <span className="text-green-400 text-[10px]">OPEN TO WORK</span>
                      </div>
                    </div>
                    <div className="mt-2 text-cyan-400 text-xs tracking-wider border border-cyan-500/30 bg-cyan-900/20 p-2 text-center rounded">
                      {DATA.email}
                    </div>
                  </div>
                </div>
              </HoloCard>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Technical Skills" sub="Capabilities" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA.skills.map((skillGroup, idx) => (
              <HoloCard key={idx} title={skillGroup.category} type={`MOD_${idx + 1}`}>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span key={item} className="px-2 py-1 bg-cyan-900/40 text-cyan-300 text-[10px] font-mono border border-cyan-500/30 tracking-wider hover:bg-cyan-500/20 transition-colors cursor-crosshair hover:shadow-[0_0_10px_rgba(34,211,238,0.4)] backdrop-blur-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </HoloCard>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS (CAROUSEL) */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Projects" sub="Operational History" />
          <ProjectCarousel projects={DATA.projects} onSelect={setSelectedItem} />
        </div>
      </section>

      {/* EXPERIENCE (GRID) */}
      <section id="experience" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Work Experience" sub="Engagements" />
          
          <div className="grid md:grid-cols-2 gap-8">
            {DATA.experience.map((exp) => (
              <div key={exp.id} className="h-full">
                <InteractiveCard item={exp} onSelect={setSelectedItem} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-cyan-900 bg-black/80 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 mb-8">
            <a href={`mailto:${DATA.email}`} className="text-cyan-700 hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"><Mail size={20} /></a>
            <a href={DATA.linkedin} className="text-cyan-700 hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"><Linkedin size={20} /></a>
            <a href={DATA.github} className="text-cyan-700 hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"><Github size={20} /></a>
          </div>
          <p className="text-cyan-900 font-mono text-xs tracking-[0.3em]">
            ATHARVA NAYAK © 2025
          </p>
        </div>
      </footer>

      {/* Interactive Holographic Modal */}
      {selectedItem && (
        <HoloModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}