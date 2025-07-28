export function StatsSection() {
  const stats = [
    { value: '2,500+', label: 'Students' },
    { value: '150+', label: 'Faculty Members' },
    { value: '95%', label: 'Pass Rate' },
    { value: '38', label: 'Years of Excellence' },
  ];

  return (
    <section className='bg-muted/30 py-16'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className='flex flex-col items-center space-y-2 text-center'
            >
              <div className='text-primary text-3xl font-bold md:text-4xl'>
                {stat.value}
              </div>
              <div className='text-muted-foreground text-sm font-medium md:text-base'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
