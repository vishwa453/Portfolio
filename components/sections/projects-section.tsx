"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { getProjects } from "@/lib/data-loader"

const projects = getProjects()

const activeProject = projects.find(p => p.status === "active")
const completedProjects = projects.filter(p => p.status === "completed")

export default function ProjectsSection({ sectionRef }: { sectionRef: (el: HTMLElement | null) => void }) {
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 sm:py-32 opacity-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>
          <div className="text-sm text-muted-foreground font-mono">Selected Builds</div>
        </div>

        {/* Currently Working On */}
        {activeProject && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">Currently Working On</div>
            <Card className="border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-500">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4 sm:gap-6">
                  <img
                    src={activeProject.imageUrl}
                    alt="Active project logo"
                    className="h-12 w-12 sm:h-16 sm:w-16 rounded-md border border-border"
                  />
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium">{activeProject.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{activeProject.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="px-2 py-1 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Project cards */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {completedProjects.map((project) => (
            <Card
              key={project.id}
              className="group border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-2 py-1 text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className={`flex items-center gap-3 ${project.liveUrl ? "justify-between" : "justify-end"}`}>
                {project.liveUrl && (
                  <Button asChild size="sm" variant="secondary" className="group">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live Demo
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild size="sm" variant="outline" className="group bg-transparent">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      Code
                      <Github className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
