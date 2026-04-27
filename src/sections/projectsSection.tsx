import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, CameraControls, Clouds, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { universeData, type TechGalaxy, type ProjectPlanet } from '../data/projectsList';

// --- CUSTOM GLSL SHADERS FOR CINEMATIC PLANET ATMOSPHERES ---
// Zjemněný Fresnel pro tenčí a elegantnější auru na okrajích
const atmosphericVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphericFragmentShader = `
  uniform vec3 glowColor;
  varying vec3 vNormal;
  void main() {
    // Zvýšena hodnota z 0.65 na 0.8 a mocnina na 4.0 pro tenčí okraj
    float intensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
    gl_FragColor = vec4(glowColor, 1.0) * intensity;
  }
`;

// --- SUB-COMPONENTS FOR 3D SCENE ---

// 1. Planet Component (Systematizované dráhy a čistší materiály)
const Planet = ({ planet, index }: { planet: ProjectPlanet, index: number }) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  const baseColor = useMemo(() => new THREE.Color(planet.baseColor), [planet.baseColor]);

  // VÝPOČET SYSTEMATICKÉ ORBITY: Každá planeta je o 4 jednotky dál
  const dynamicRadius = 4 + index * 4;
  // Čím dál planeta je, tím pomaleji obíhá
  const dynamicSpeed = 0.05 * (1 / (index + 1));

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * dynamicSpeed;
    ref.current.position.x = Math.cos(t) * dynamicRadius;
    ref.current.position.z = Math.sin(t) * dynamicRadius;
    ref.current.rotation.y += 0.005;
    ref.current.rotation.x += 0.002;
  });

  return (
    <group ref={ref}>
      <group>
        {/* Plynní obři - čistý standard materiál */}
        {planet.textureType === 'gasGiant' && (
          <mesh>
            <sphereGeometry args={[planet.size, 64, 64]} />
            <meshStandardMaterial color={baseColor} roughness={0.4} metalness={0.1} />
          </mesh>
        )}
        
        {/* Zemské planety - Jádro + hladká průhledná atmosféra (už žádné stínové artefakty) */}
        {planet.textureType === 'terrestrial' && (
          <>
            <mesh>
              <sphereGeometry args={[planet.size, 32, 32]} />
              <meshStandardMaterial color={baseColor} roughness={0.7} metalness={0.2} />
            </mesh>
            <mesh>
              <sphereGeometry args={[planet.size * 1.05, 32, 32]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.15} roughness={1} />
            </mesh>
          </>
        )}

        {/* Krystalické planety - ostré hrany */}
        {planet.textureType === 'crystalline' && (
          <mesh>
            <icosahedronGeometry args={[planet.size, 1]} />
            <meshStandardMaterial color={baseColor} roughness={0.2} metalness={0.8} flatShading />
          </mesh>
        )}

        {/* Cyber planety - Tmavé jádro chránící před prosvítáním zadních čar + Wireframe */}
        {planet.textureType === 'cyber' && (
          <>
            <mesh>
              <sphereGeometry args={[planet.size * 0.95, 32, 32]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[planet.size, 2]} />
              <meshBasicMaterial color={baseColor} wireframe transparent opacity={0.8} />
            </mesh>
          </>
        )}
      </group>

      {/* Tenký Fresnel atmosférický štít */}
      <mesh>
        <sphereGeometry args={[planet.size * 1.3, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphericVertexShader}
          fragmentShader={atmosphericFragmentShader}
          uniforms={{ glowColor: { value: baseColor } }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh
        onClick={(e) => e.stopPropagation()} 
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
      >
        <sphereGeometry args={[planet.size * 1.5, 16, 16]} />
        <meshBasicMaterial visible={false} color="red" /> 
      </mesh>

      {/* Čistá, systematická vodící čára orbity pro každou planetu */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} // Vynulováno, orbita se kreslí kolem středu (0,0,0) její lokální grupy, která rotuje
      >
        {/* Prstenec je v rootu planety chování. Musíme ho přesunout ven. */}
      </mesh>

      {hovered && (
        <Html
          distanceFactor={15}
          position={[0, planet.size * 1.8, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div 
            style={{ pointerEvents: 'none', transform: 'translateY(-20px)' }}
            className="animate-tooltip-in opacity-0"
          >
            <div className="bg-slate-950/80 backdrop-blur-lg text-white p-6 rounded-2xl border border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.3)] w-80 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-1.5 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                {planet.title}
              </h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">{planet.fullDescription}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {planet.technologies.map(t => (
                  <span key={t} className="text-[10px] uppercase font-bold bg-violet-900/50 text-violet-200 px-2.5 py-1 rounded-md border border-violet-700/50 tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
              {planet.link && (
                <div className="text-xs font-semibold text-emerald-400 animate-pulse font-mono">
                  [ ZABEZPEČENÝ PŘENOS PŘIPRAVEN ]
                </div>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Vykreslení orbitálních prstenců odděleně od rotujících planet
const OrbitRing = ({ radius, color }: { radius: number, color: string }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
};

// 2. Galaxy Component
const GalaxySystem = ({ galaxy, isSelected, onClick }: { galaxy: TechGalaxy, isSelected: boolean, onClick: () => void }) => {
  const coreRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (coreRef.current) coreRef.current.rotation.y += 0.001;
    
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        hovered ? 100 : 25, 
        delta * 5
      );
    }
  });

  const staticClouds = useMemo(() => (
    <Clouds material={THREE.MeshLambertMaterial}>
      <Cloud segments={50} bounds={[20, 10, 20]} volume={15} color={galaxy.particleColor} opacity={0.5} speed={0.2} />
      <Cloud segments={40} bounds={[12, 12, 12]} volume={10} color={galaxy.coreColor} opacity={0.6} speed={0.4} />
    </Clouds>
  ), [galaxy.particleColor, galaxy.coreColor]);

  return (
    <group position={galaxy.position}>
      
      {!isSelected && (
        <mesh
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
          onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
        >
          <sphereGeometry args={[18, 16, 16]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      )}

      <group ref={coreRef}>
        {isSelected && (
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color={galaxy.coreColor} transparent opacity={0.8} wireframe />
          </mesh>
        )}

        {!isSelected && (
          <pointLight ref={lightRef} color={galaxy.coreColor} distance={80} decay={1.5} intensity={25} />
        )}

        {!isSelected && staticClouds}
      </group>

      {!isSelected && (
        <Html center distanceFactor={25} style={{ pointerEvents: 'none' }}>
          <div 
            className="text-white text-center transition-all duration-500" 
            style={{ opacity: hovered ? 1 : 0.4, transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
          >
            <h2 className="text-2xl sm:text-3xl font-black tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] whitespace-nowrap">
              {galaxy.name}
            </h2>
            <div className={`mt-2 text-sm text-violet-300 font-mono transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
              [ KLIKNI DO MLHOVINY PRO VSTUP ]
            </div>
          </div>
        </Html>
      )}

      {/* PLANETY A JEJICH ORBITY */}
      {isSelected && galaxy.planets.map((planet, index) => {
        const dynamicRadius = 4 + index * 4;
        return (
          <React.Fragment key={planet.id}>
            <OrbitRing radius={dynamicRadius} color={planet.baseColor} />
            <Planet planet={planet} index={index} />
          </React.Fragment>
        );
      })}
    </group>
  );
};

// 3. Main Scene Controller
const UniverseScene = ({ selectedGalaxyId, onSelectGalaxy }: { selectedGalaxyId: string | null, onSelectGalaxy: (id: string) => void }) => {
  const controlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    if (selectedGalaxyId) {
      const selected = universeData.find(g => g.id === selectedGalaxyId);
      if (selected) {
        controlsRef.current.setLookAt(
          selected.position[0], selected.position[1] + 12, selected.position[2] + 25,
          selected.position[0], selected.position[1], selected.position[2],
          true
        );
      }
    } else {
      controlsRef.current.setLookAt(0, 30, 70, 0, 0, 0, true);
    }
  }, [selectedGalaxyId]);

  return (
    <>
      <CameraControls ref={controlsRef} makeDefault />
      <ambientLight intensity={0.1} />
      <directionalLight position={[30, 40, 20]} intensity={2.5} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#c084fc" />

      {universeData.map(galaxy => (
        <GalaxySystem key={galaxy.id} galaxy={galaxy} isSelected={selectedGalaxyId === galaxy.id} onClick={() => onSelectGalaxy(galaxy.id)} />
      ))}
    </>
  );
};

// --- MAIN EXPORTED SECTION ---
export const ProjectsSection: React.FC = () => {
  const [selectedGalaxyId, setSelectedGalaxyId] = useState<string | null>(null);
  const selectedGalaxy = universeData.find(g => g.id === selectedGalaxyId) || null;

  return (
    <section id="projects" className="relative w-full h-[100vh] min-h-[800px] bg-[#020617] overflow-hidden">
      
      <div className="absolute top-24 left-6 sm:left-12 z-10 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-tight drop-shadow-lg mb-2">
          Sektor Projektů
        </h2>
        <p className="text-lg text-slate-400 max-w-xl border-l-2 border-violet-500 pl-4 py-1 bg-slate-900/30 backdrop-blur-sm rounded-r-lg">
          {selectedGalaxy 
            ? `Aktuální lokace: ${selectedGalaxy.name}. Prozkoumej jednotlivé projekty v této soustavě.` 
            : "Nacházíš se v hlavním Voidu. Procházej vesmír pomocí myši a klikni do libovolné mlhoviny pro vstup."}
        </p>
        <div className="mt-8 h-12">
          {selectedGalaxy && (
            <button 
              onClick={() => setSelectedGalaxyId(null)}
              className="pointer-events-auto px-6 py-3 rounded-xl bg-slate-800/80 text-white font-bold text-sm uppercase tracking-widest border border-slate-600 hover:bg-violet-600 hover:border-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 backdrop-blur-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Návrat do Voidu
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 backdrop-blur-sm rounded-full border border-slate-800 text-slate-400 text-xs font-mono tracking-wider shadow-xl">
          <span className="flex items-center justify-center w-5 h-5 rounded bg-slate-800 border border-slate-700">👆</span> Tažení = Rotace
          <span className="flex items-center justify-center w-5 h-5 rounded bg-slate-800 border border-slate-700 ml-2">🖱️</span> Kolečko = Zoom
        </div>
      </div>

      <div className="absolute inset-0 z-0 cursor-crosshair">
        <Canvas camera={{ position: [0, 30, 70], fov: 50 }}>
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 30, 150]} />
          <Stars radius={150} depth={50} count={9000} factor={6} saturation={0.8} fade speed={1.5} />
          <UniverseScene selectedGalaxyId={selectedGalaxyId} onSelectGalaxy={setSelectedGalaxyId} />
        </Canvas>
      </div>

      <style>{`
        @keyframes tooltip-fade-in {
          0% { opacity: 0; transform: translateY(-10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(-20px) scale(1); }
        }
        .animate-tooltip-in {
          animation: tooltip-fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};