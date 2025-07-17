export function StatsSection() {
  const stats = [
    { value: "2,500+", label: "Students" },
    { value: "150+", label: "Faculty Members" },
    { value: "95%", label: "Pass Rate" },
    { value: "38", label: "Years of Excellence" },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
