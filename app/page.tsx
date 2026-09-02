import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getGithubData } from "@/lib/github"

export const revalidate = 300

export default async function Home() {
  const data = await getGithubData()

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero profile={data.profile} />
        <Projects data={data} />
        <About skills={data.skills} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
