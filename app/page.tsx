"use client";
import Image from "next/image";
import Navbar from "./component/Navbar";

// export default function Home() {
//   return (

//     <div className="min-h-screen bg-background">
//       <Navbar/>
//       <main>
//         <Hero />
//          <About />
//         <Skills />
//         <Experience />
//         <Projects />
//         <Contact /> 
//       </main>
//       <Footer />
// </div>
//   );
// }

import { useEffect } from "react";
// import Navbar from "@/components/Navbar";
import Footer from "./component/components/Footer";
import SectionHeader from "./component/components/SectionHeader";
import ProjectCard from "./component/components/ProjectCard";
import { Button } from "./component/components/ui/Button";
import { Input } from "./component/components/ui/Input";
import { Textarea } from "./component/components/ui/Textarea";
import { Card, CardContent, CardHeader } from "./component/components/ui/Card";
import { Badge } from "./component/components/ui/Badge";
// import { useSkills, useExperience, useProjects, useContactMutation } from "./hooks/use-portfolio";
import { useSkills, useExperience, useProjects } from "./hooks/use-portfolio";
import { ArrowRight, Download, Send, Terminal, Server, Database, Globe, Calendar, MapPin, Briefcase, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { insertMessageSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./component/components/ui/Form";
// import { useToast } from "@/hooks/use-toast";
import { useToast } from "./hooks/use-toast";

// === HERO SECTION ===
function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] -z-10 opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/30 text-primary mb-6 bg-primary/5">
                Available for new opportunities
              </Badge>
              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6">
                Building <span className="text-gradient-primary">Scalable</span> Digital Experiences
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mb-8">
                I'm Ubaid Ur Rehman, a Senior React Developer passionate about crafting performant, accessible, and beautiful web applications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-full text-base"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Let's Connect <ArrowRight className="ml-2 w-5 h-5" />
                </Button> */}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 hover:bg-white/5 h-14 rounded-full text-base"
                  onClick={() => window.open("/ubaid_ur_rehman_resume.pdf", "_blank")}
                >
                  Download CV <Download className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex-1 w-full max-w-md md:max-w-full relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-secondary/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0"></div>
              {/* Abstract Code visualization */}
              <div className="p-8 font-mono text-sm leading-loose z-10 relative">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = <span className="text-yellow-400">{"{"}</span></p>
                  <p className="pl-4">name: <span className="text-green-400">"Ubaid Ur Rehman"</span>,</p>
                  <p className="pl-4">role: <span className="text-green-400">"Frontend Engineer"</span>,</p>
                  <p className="pl-4">skills: <span className="text-yellow-400">["React", "Nextjs", "TypeScript", "Node.js"]</span>,</p>
                  <p className="pl-4">passion: <span className="text-green-400">"Building clean UI/UX"</span>,</p>
                  <p className="pl-4">status: <span className="text-green-400">"Ready to code"</span></p>
                  <p className="text-yellow-400">{"}"}</p>
                  <br />
                  <p><span className="text-purple-400">async function</span> <span className="text-blue-400">createMagic</span>() <span className="text-yellow-400">{"{"}</span></p>
                  <p className="pl-4"><span className="text-purple-400">await</span> developer.buildNextBigThing();</p>
                  <p className="text-yellow-400">{"}"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// === ABOUT SECTION ===
function About() {
  return (
    <section id="about" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          title="About Me" 
          subtitle="Passionate developer with over 3 years of experience in the JavaScript ecosystem." 
        />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert lg:prose-lg"
          >
            <p className="text-muted-foreground leading-relaxed">
              I am a results-driven React.js Developer with extensive experience in building high-performance web applications. My journey began with a curiosity for how things work on the web, which quickly evolved into a career building complex systems.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Currently, I specialize in the MERN stack (MongoDB, Express, React, Node.js), with a strong focus on Frontend architecture. I love solving difficult problems and optimizing user experiences to be as intuitive and accessible as possible.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source, or sharing knowledge with the developer community.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Experience", value: "3+ Years", icon: <Calendar className="w-5 h-5 text-primary" /> },
              { label: "Projects", value: "20+ Built", icon: <Terminal className="w-5 h-5 text-primary" /> },
              { label: "Clients", value: "Global", icon: <Globe className="w-5 h-5 text-primary" /> },
              { label: "Stack", value: "MERN", icon: <Database className="w-5 h-5 text-primary" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      {stat.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-2xl">{stat.value}</h4>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// === SKILLS SECTION ===
function Skills() {
  const {  skills, isLoading } = useSkills();
  console.log("skills :",skills)

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          title="Technical Skills" 
          subtitle="A comprehensive toolkit for building modern digital products." 
          align="center"
        />
        
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-secondary/30 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {skills?.map((skillGroup , idx) => (
              <motion.div
                key={skillGroup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full bg-card border-border/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {skillGroup.category === "Frontend" && <Globe className="w-5 h-5 text-primary" />}
                        {skillGroup.category === "Backend & APIs" && <Server className="w-5 h-5 text-primary" />}
                        {skillGroup.category === "Tools & Platforms" && <Terminal className="w-5 h-5 text-primary" />}
                      </div>
                      <h3 className="font-heading font-bold text-xl">{skillGroup.category}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items?.map((item ) => (
                        <Badge 
                          key={item} 
                          variant="secondary" 
                          className="px-3 py-1 text-sm bg-secondary hover:bg-secondary/80"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// === EXPERIENCE SECTION ===
function Experience() {
  const {  experiences, isLoading } = useExperience();
  console.log("experience: ",experiences)

  return (
    <section id="experience" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          title="Work Experience" 
          subtitle="My professional journey in the tech industry." 
        />
        
        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Timeline line */}
          <div className="absolute left-[28px] top-4 bottom-4 w-px bg-border md:left-1/2 md:-ml-[0.5px]"></div>
          
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading experience...</div>
          ) : (
            experiences?.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 relative ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[20px] top-6 w-4 h-4 rounded-full bg-primary border-4 border-background md:left-1/2 md:-ml-[8px] z-10"></div>
                
                <div className="flex-1 ml-16 md:ml-0">
                  <Card className="bg-card border-border/50 p-6 hover:border-primary/30 transition-colors">
                    <div className="flex flex-col gap-1 mb-4">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h3 className="font-heading font-bold text-xl text-primary">{job.role}</h3>
                        <Badge variant="outline" className="text-xs">{job.period}</Badge>
                      </div>
                      <h4 className="font-medium text-lg flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        {job.company}
                      </h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {job.description}
                    </p>
                  </Card>
                </div>
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

// === PROJECTS SECTION ===
function Projects() {
  const {  projects, isLoading } = useProjects();

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          title="Featured Projects" 
          subtitle="A showcase of my recent development work."
          align="center"
        />
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-secondary/30 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// === CONTACT SECTION ===
function Contact() {
  const { toast } = useToast();
  // const mutation = useContactMutation();
  
  // const form = useForm<z.infer<typeof insertMessageSchema>>({
  //   resolver: zodResolver(insertMessageSchema),
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     message: "",
  //   },
  // });


  // function onSubmit(values: z.infer<typeof insertMessageSchema>) {
  //   mutation.mutate(values, {
  //     onSuccess: () => {
  //       toast({
  //         title: "Message Sent!",
  //         description: "Thanks for reaching out. I'll get back to you soon.",
  //       });
  //       form.reset();
  //     },
  //     onError: (error) => {
  //       toast({
  //         title: "Error",
  //         description: error.message,
  //         variant: "destructive",
  //       });
  //     },
  //   });
  // }

  // return (
  //   <section id="contact" className="py-24 bg-secondary/20">
  //     <div className="container mx-auto px-4 md:px-6">
  //       <div className="max-w-4xl mx-auto">
  //         <SectionHeader 
  //           title="Get In Touch" 
  //           subtitle="Have a project in mind or want to say hi? I'd love to hear from you." 
  //           align="center"
  //         />
          
  //         <div className="grid md:grid-cols-2 gap-12 bg-card border border-border/50 rounded-2xl p-8 md:p-12 shadow-2xl">
  //           <div className="space-y-8">
  //             <div>
  //               <h3 className="text-2xl font-bold font-heading mb-4">Contact Information</h3>
  //               <p className="text-muted-foreground">
  //                 Feel free to reach out via email or connect with me on social media. I'm always open to discussing new projects, creative ideas, or opportunities.
  //               </p>
  //             </div>
              
  //             <div className="space-y-4">
  //               <div className="flex items-center gap-4">
  //                 <div className="p-3 bg-primary/10 rounded-full text-primary">
  //                   <Mail className="w-5 h-5" />
  //                 </div>
  //                 <div>
  //                   <p className="text-sm font-medium text-muted-foreground">Email</p>
  //                   <a href="mailto:ubaidrehmanse@gmail.com" className="text-lg font-medium hover:text-primary transition-colors">
  //                     ubaidrehmanse@gmail.com
  //                   </a>
  //                 </div>
  //               </div>
                
  //               <div className="flex items-center gap-4">
  //                 <div className="p-3 bg-primary/10 rounded-full text-primary">
  //                   <MapPin className="w-5 h-5" />
  //                 </div>
  //                 <div>
  //                   <p className="text-sm font-medium text-muted-foreground">Location</p>
  //                   <p className="text-lg font-medium">Remote / Pakistan</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
            
  //           <div className="bg-background/50 p-6 rounded-xl border border-border/50">
  //             {/* <Form {...form}> */}
  //             <Form>
  //               {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> */}
  //               <form className="space-y-6">
  //                 <FormField
  //                   // control={form.control}
  //                   name="name"
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Name</FormLabel>
  //                       <FormControl>
  //                         <Input placeholder="John Doe" {...field} className="bg-background" />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />
  //                 <FormField
  //                   // control={form.control}
  //                   name="email"
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Email</FormLabel>
  //                       <FormControl>
  //                         <Input placeholder="john@example.com" type="email" {...field} className="bg-background" />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />
  //                 <FormField
  //                   // control={form.control}
  //                   name="message"
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Message</FormLabel>
  //                       <FormControl>
  //                         <Textarea 
  //                           placeholder="Tell me about your project..." 
  //                           className="min-h-[120px] bg-background resize-none" 
  //                           {...field} 
  //                         />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />
  //                 <Button 
  //                   type="submit" 
  //                   className="w-full h-12 text-base font-medium"
  //                   // disabled={mutation.isPending}
  //                 >
  //                   {/* {mutation.isPending ? "Sending..." : "Send Message"}
  //                   {!mutation.isPending && <Send className="ml-2 w-4 h-4" />} */}
  //                   "Send Message"
  //                 </Button>
  //               </form>
  //             </Form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
}

