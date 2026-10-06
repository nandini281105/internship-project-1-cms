import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import BlogModal from './components/BlogModal';
import {
  fetchAbout,
  fetchSkills,
  fetchProjects,
  fetchServices,
  fetchExperiences,
  fetchTestimonials,
  fetchBlogs,
} from './lib/api/portfolioApi';

function App() {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [
          aboutRes,
          skillsRes,
          projectsRes,
          servicesRes,
          expRes,
          testimonialsRes,
          blogsRes,
        ] = await Promise.all([
          fetchAbout(),
          fetchSkills(),
          fetchProjects(),
          fetchServices(),
          fetchExperiences(),
          fetchTestimonials(),
          fetchBlogs(),
        ]);

        setAbout(aboutRes);
        setSkills(skillsRes);
        setProjects(projectsRes);
        setServices(servicesRes);
        setExperiences(expRes);
        setTestimonials(testimonialsRes);
        setBlogs(blogsRes);
      } catch (err) {
        console.error('Failed to load portfolio content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Navigation */}
      <Navbar about={about} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero about={about} />
        <About about={about} />
        <Services services={services} />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Projects projects={projects} onSelectProject={setSelectedProject} />
        <Testimonials testimonials={testimonials} />
        <Blogs blogs={blogs} onSelectBlog={setSelectedBlog} />
        <Contact about={about} />
      </main>

      {/* Footer */}
      <Footer about={about} />

      {/* Detail Modals */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </div>
  );
}

export default App;
