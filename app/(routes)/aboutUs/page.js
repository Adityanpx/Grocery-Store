import Footer from "../../_components/Footer"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Leaf, ShoppingBasket, Heart, Users } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="" style={{backgroundImage: '/fresh.jpeg'}}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Welcome to Green Grocer
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Your neighborhood source for fresh, quality produce and groceries since 1985.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-400">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Story</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Green Grocer started as a small family-owned store in 1985. Over the years, we've grown with our community, 
                  always maintaining our commitment to providing the freshest produce and highest quality groceries.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                  <Leaf className="h-12 w-12 text-green-500" />
                  <h3 className="text-2xl font-bold">Fresh & Organic</h3>
                  <p className="text-gray-500">We source the freshest, organic produce from local farms.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                  <ShoppingBasket className="h-12 w-12 text-green-500" />
                  <h3 className="text-2xl font-bold">Wide Selection</h3>
                  <p className="text-gray-500">From everyday essentials to gourmet specialties, we have it all.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                  <Heart className="h-12 w-12 text-green-500" />
                  <h3 className="text-2xl font-bold">Community First</h3>
                  <p className="text-gray-500">We're committed to serving and supporting our local community.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The friendly faces behind Green Grocer, dedicated to bringing you the best shopping experience.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <img
                    src={`/placeholder.svg?height=200&width=200&text=Team Member ${i}`}
                    alt={`Team Member ${i}`}
                    className="rounded-full"
                    width={100}
                    height={100}
                  />
                  <h3 className="font-semibold">Team Member {i}</h3>
                  <p className="text-sm text-gray-500">Position</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Visit Us Today</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience the Green Grocer difference. Fresh produce, friendly service, and a commitment to our community.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Find a Store</Button>
                <Button variant="outline">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 Green Grocer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
      <Footer/>
    </div>
    
  )
}