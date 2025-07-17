import { GraduationCap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-medium">K.K.P.B Secondary High School</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 K.K.P.B Secondary High School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
